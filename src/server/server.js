const express = require('express');
const app = express();
const server = require('http').Server(app);
const session = require('express-session');

const io = require('socket.io')(server);
const fs = require('fs-extra');
const path = require('path');
const randomstring = require("randomstring");
const passport = require('passport');
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');

const phantom = require('phantom');

const sequelize = require('./config/sequelize');
const ValuePropositionCanvas = require('./models/value-proposition-canvas');
const User = require('./models/user');

const passwordHelper = require('./helpers/password');


require('./config/setup-passport').init();

var folders = {
    public: path.join(__dirname, '../public'),
    node: path.join(__dirname, '../../node_modules'),
    data: path.join(__dirname, '../../data')
};

// const passport = require('passport');
// const LinkedInStrategy = require('passport-linkedin').Strategy;
// require('dotenv').config();


//const linkedinScraper = require('linkedin-scraper');

server.listen(8888);

var sessionOpts = {
    secret: 'secret',
    key: 'skey.sid',
    resave: false,
    saveUninitialized: false
  };


app.use(session(sessionOpts));


// Initialize Passport session
app.use(passport.initialize());
app.use(passport.session());

app
.use(express.static(folders.public));
// .use('/file', express.static(folders.public))
// .use('/file/node_modules', express.static(folders.node));

/*
io.use(passportSocketIo.authorize({
  key: 'skey.sid',
  secret: 'secret',
  passport: passport,
  cookieParser: cookieParser
}));
*/

io.on('connection', function (socket) {

    socket.on('/email/free', function (email) {
        console.log('/email/free');
        User.findOne({
            where: {
                email: email
            }
        }).then(function (err, user) {
            console.log('then');
            if (err) { socket.emit('/email/free/no'); }
            if (!user) {
                socket.emit('/email/free');
            } else {
                socket.emit('/email/free/no');
            }
        });
    });

    socket.on('/signup', function (data) {
        console.log('signup', data);
        if (data.email && data.password) {
            passwordHelper.hash(data.password, function (err, hash, salt) {
                User.create({
                    email: data.email,
                    password: hash,
                    salt: salt
                }).then(function (user) {
                    // console.log('then');
                    if (user) {
                        socket.emit('/signup/success');
                    } else {
                        socket.emit('/signup/fail');
                    }
                });
            });
        } else {
            socket.emit('/signup/fail');
        }
    });


    socket.on('/canvas/value-proposition/create', function () {
        var link = randomstring.generate(12);
        ValuePropositionCanvas.create({
            link: link
        }).then(function (canvas) {
            if (canvas) {
                socket.emit('/canvas/created', {
                    link: canvas.link,
                    name: canvas.name,
                    job: canvas.job,
                    pains: canvas.pains,
                    gains: canvas.gains,
                    painrelievers: canvas.painrelievers,
                    gaincreator: canvas.gaincreator,
                    product: canvas.product,
                    target: canvas.target,
                    zoom: canvas.zoom,
                    type: 'value-proposition'
                });
            }
        })
    });

    socket.on('/canvas/value-proposition/delete', function (link) {
        ValuePropositionCanvas.destroy({
            where: {
                link: link
            }
        }).then(function () {
            socket.emit('/canvas/deleted', link);
        })
    });

    socket.on('/canvas/value-proposition/update', function (canvas) {
        ValuePropositionCanvas.update({
                name: canvas.name,
                job: canvas.job,
                pains: canvas.pains,
                gains: canvas.gains,
                zoom: canvas.zoom,
                target: canvas.target,
                painrelievers: canvas.painrelievers,
                gaincreator: canvas.gaincreator,
                product: canvas.product
            },
            {
            where: {
                link: canvas.link
            }
        }).then(function () {
            socket.emit('/canvas/updated', canvas.link);
        })
    });

    socket.on('/canvas/value-proposition/get', function (link) {
        ValuePropositionCanvas.findOne({
            where: {
                link: link
            }
        }).then(function (canvas) {
            if (canvas) {
                socket.emit('/canvas', {
                    link: canvas.link,
                    name: canvas.name,
                    job: canvas.job,
                    pains: canvas.pains,
                    gains: canvas.gains,
                    painrelievers: canvas.painrelievers,
                    gaincreator: canvas.gaincreator,
                    product: canvas.product,
                    target: canvas.target,
                    zoom: canvas.zoom,
                    type: 'value-proposition'
                });
            } else {
                socket.emit('/canvas/found/not');
            }

        });
    });

    socket.on('/canvas/value-proposition/export', function (link) {
        var pInstance = null;
        var pPage = null;
        phantom
        .create()
        .then(function (instance) {
            pInstance = instance;
            return instance.createPage();
        })
        .then(function (page) {
            pPage = page;

            return page.property('paperSize', {
              width: '59.4cm',
              height: '42cm',
              orientation: 'landscape',
              border: '1cm'
           })
              return  page.property('viewportSize', {width: 1920, height: 1362}).then(function() {
          }).then(function () {
             pPage
             .open("http://localhost:8888/#/canvas/value-proposition/print/tLhTdx2Qvoid")
             .then(function () {
                 setTimeout(function () {
                     pPage.render("export.pdf");
                 }, 3000);
                 //pInstance.exit();
             });
          });
       });

    });

});
