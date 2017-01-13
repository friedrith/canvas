const express = require('express');
const app = express();
const server = require('http').Server(app);
const session = require('express-session');
const cons = require('consolidate');

const io = require('socket.io')(server);
const fs = require('fs-extra');
const path = require('path');
const randomstring = require("randomstring");
const passport = require('passport');
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');

require('dotenv').config();


const sequelize = require('./config/sequelize');
const Canvas = require('./models/canvas');
const User = require('./models/user');

const passwordHelper = require('./helpers/password');
const exportHelper = require('./helpers/export');


require('./config/setup-passport').init();

var folders = {
    public: path.join(__dirname, '../public'),
    node: path.join(__dirname, '../../node_modules'),
    data: path.join(__dirname, '../../data')
};

const canvasTypes = [ 'value-proposition', 'business-model' ];

// const passport = require('passport');
// const LinkedInStrategy = require('passport-linkedin').Strategy;


//const linkedinScraper = require('linkedin-scraper');

server.listen(process.env.PORT, function () {
    console.log('listening on http://localhost:'+process.env.PORT);
});

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

// assign the swig engine to .html files
app.engine('html', cons.swig);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', path.join(folders.public, 'templates'));

app.get('/', function(req, res){
  res.render('index', {
    title: 'Consolidate.js'
  });
});

app
.use(express.static(folders.public))
.get('*', function (req, res) {
    res.render('app', {
      title: 'Consolidate.js'
    });
});
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

    var currentCanvas = null;


    function updateCurrentCanvas (link) {
        if (currentCanvas && link != currentCanvas) {
            socket.leave('canvas:'+currentCanvas);
        }
        currentCanvas = link;
        socket.join('canvas:'+link);
    }

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

    socket.on('/canvas/create', function (type) {
        if (canvasTypes.indexOf(type) < 0) {
            socket.emit('/canvas/created/error', 'bad type');
            return;
        }

        var link = randomstring.generate(12);
        var publicLink = randomstring.generate(12);

        console.log(type);
        var content = '{}';
        if (type == 'value-proposition') {
            content = JSON.stringify({job: '', pains: '', gains: '', painrelievers: '', gaincreator: '', product: ''});
        } else if (type == 'business-model') {
            content = JSON.stringify({segments: '', relationships: '', channels: '', revenues: '', valueproposition: '', activities: '', resources: '', partners: '', costs: ''});
        }
        Canvas.create({
            link: link,
            public: publicLink,
            type: type,
            content: content
        }).then(function (canvas) {
            if (canvas) {
                updateCurrentCanvas(canvas.link);
                socket.emit('/canvas/created', {
                    link: canvas.link,
                    name: canvas.name,
                    content: JSON.parse(canvas.content),
                    target: canvas.target,
                    zoom: canvas.zoom,
                    type: canvas.type
                });
            }
        })
    });

    socket.on('/canvas/delete', function (link) {
        Canvas.destroy({
            where: {
                link: link
            }
        }).then(function () {
            socket.emit('/canvas/deleted', link);
        })
    });

    socket.on('/canvas/update', function (canvas) {

        var content = {};

        if (canvas.type == 'value-proposition') {
            content = {
                job: canvas.content.job,
                pains: canvas.content.pains,
                gains: canvas.content.gains,
                painrelievers: canvas.content.painrelievers,
                gaincreator: canvas.content.gaincreator,
                product: canvas.content.product
            };
        } else if (canvas.type == 'business-model') {
            content = {
                segments: canvas.content.segments,
                relationships: canvas.content.relationships,
                channels: canvas.content.channels,
                valueproposition: canvas.content.valueproposition,
                revenues: canvas.content.revenues,
                activities: canvas.content.activities,
                resources: canvas.content.resources,
                partners: canvas.content.partners,
                costs: canvas.content.costs
            };
        }

        Canvas.update({
                name: canvas.name,
                content: JSON.stringify(content),
                zoom: canvas.zoom,
                target: canvas.target,
            },
            {
            where: {
                link: canvas.link
            }
        }).then(function () {
            // updateCurrentCanvas(canvas.link);

            Canvas.findOne({
                where: {
                    link: canvas.link
                }
            }).then(function (canvas) {
                if (canvas) {

                    var content = JSON.parse(canvas.content);
                    // updateCurrentCanvas('');
                    // socket.leave('canvas:'+canvas.link);
                    socket.broadcast.to('canvas:'+canvas.link).emit('/canvas/updated', {
                    // io.in('canvas:'+canvas.link).emit('/canvas/updated', {
                        public: canvas.public,
                        name: canvas.name,
                        content: content,
                        target: canvas.target,
                        zoom: canvas.zoom
                    });
                    updateCurrentCanvas(canvas.link);
                }

            });

            // socket.emit('/canvas/updated', canvas.link);
        })
    });

    socket.on('/canvas', function (link) {
        Canvas.findOne({
            where: {
                link: link
            }
        }).then(function (canvas) {
            if (canvas) {

                var content = JSON.parse(canvas.content);
                console.log(canvas.type);
                updateCurrentCanvas(canvas.link);

                socket.emit('/canvas/found', {
                    link: canvas.link,
                    public: canvas.public,
                    name: canvas.name,
                    content: content,
                    target: canvas.target,
                    zoom: canvas.zoom,
                    type: canvas.type
                });
            } else {
                socket.emit('/canvas/not/found');
            }

        });
    });

    socket.on('/canvas/public', function (link) {
        Canvas.findOne({
            where: {
                public: link
            }
        }).then(function (canvas) {
            console.log(canvas);
            if (canvas) {
                updateCurrentCanvas(canvas.link);

                var content = JSON.parse(canvas.content);
                socket.emit('/canvas/public/found', {
                    public: canvas.public,
                    name: canvas.name,
                    content: content,
                    target: canvas.target,
                    zoom: canvas.zoom,
                    type: canvas.type
                });
            } else {
                socket.emit('/canvas/public/not/found');
            }

        });
    });

    socket.on('/canvas/export', function (link) {
        exportHelper.valuePropositionCanvasToPdf(link, function (filename) {

            fs.readFile(filename, function (err, data) {
                console.log('fs.readfile');
                if (err) {
                    console.log(err);
                    return;
                }
                var base64 = data.toString('base64');

                Canvas.findOne({
                    where: {
                        link: link
                    }
                }).then(function (canvas) {
                    if (canvas) {
                        socket.emit('/canvas/pdf', { dataURI: 'data:application/pdf;base64,'+base64, name: canvas.name});
                        // fs.unlink(filename);
                    } else {
                        socket.emit('/canvas/not/found');
                    }

                });
            });
        });
    });

});
