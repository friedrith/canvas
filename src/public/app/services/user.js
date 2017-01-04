app.factory('user', function ($rootScope, $timeout, socket) {

    var allCanvas = [];

    var recentsCanvas = [];

    var login = 'Unknown';

    var logged = true;

    var canvasCreatedCallback = null;
    var canvasDeletedCallback = null;

    socket.emit('canvas/all/get');

    function addFunctions (canvas) {
        canvas.save = function () {
            socket.emit('/canvas/'+canvas.type+'/update', {
                link: canvas.link,
                name: canvas.name,
                target: canvas.target,
                zoom: canvas.zoom,
                job: canvas.job,
                pains: canvas.pains,
                gains: canvas.gains,
                painrelievers: canvas.painrelievers,
                gaincreator: canvas.gaincreator,
                product: canvas.product
            });
        };

        canvas.delete = function (callback) {
            socket.emit('/canvas/'+canvas.type+'/delete', canvas.link);
            canvasDeletedCallback = callback;
        };

        canvas.export = function (callback) {
            socket.emit('/canvas/'+canvas.type+'/export', canvas.link);
        };
    }

    socket.on('/canvas/created', function (data) {
        addFunctions(data);
        allCanvas.push(data);
        recentsCanvas.push(data);
        canvasCreatedCallback && canvasCreatedCallback(data);
        canvasCreatedCallback = null;
    });

    socket.on('/canvas/deleted', function (link) {

        var found = null;
        for (var i = 0 ; i < allCanvas.length ; i++) {
            if (allCanvas[i].link == link) {
                found = allCanvas[i];
            }
        }
        if (found) {
            var indexOf = allCanvas.indexOf(found);
            allCanvas.splice(indexOf, 1);
            var index2 = recentsCanvas.indexOf(found);
            recentsCanvas.splice(index2, 1);
            canvasDeletedCallback && canvasDeletedCallback(link);
            canvasDeletedCallback = null;
        }
    });

    var canvasGetCallback = null;

    socket.on('/canvas', function (data) {
        addFunctions(data);
        allCanvas.push(data);
        recentsCanvas.push(data);
        canvasGetCallback && canvasGetCallback(data);
        canvasGetCallback = null;
    });

    socket.on('/canvas/found/not', function (data) {
        canvasGetCallback && canvasGetCallback(data);
        canvasGetCallback = null;
    });

    var signUpCallback = null;

    socket.on('/signup/success', function () {
        signUpCallback && signUpCallback(true);
        signUpCallback = null;
    });

    socket.on('/signup/fail', function () {
        signUpCallback && signUpCallback(false);
        signUpCallback = null;
    });

    var emailFreeCallback = null;
    socket.on('/email/free', function () {
        console.log('/email/free');
        emailFreeCallback && emailFreeCallback(true);
        emailFreeCallback = null;
    });

    socket.on('/email/free/no', function () {
        emailFreeCallback && emailFreeCallback(false);
        emailFreeCallback = null;
    });


    return {
        recentsCanvas: function () {
            return recentsCanvas;
        },
        allCanvas: function () {
            return allCanvas;
        },
        login: function () {
            return login
        },
        logged: function () {
            return logged;
        },
        createValuePropositionCanvas: function (callback) {
            socket.emit('/canvas/value-proposition/create');
            canvasCreatedCallback = callback;
        },
        getValuePropositionCanvas: function (link, callback) {
            var found = false;
            for (var i = 0 ; i < allCanvas.length ; i++) {
                if (allCanvas[i].link == link) {
                    found = true;
                    callback && callback(allCanvas[i]);
                }
            }
            if (!found) {
                canvasGetCallback = callback;
                socket.emit('/canvas/value-proposition/get', link);
            }

        },
        signUp: function (email, password, callback) {
            var data = { email: email, password: password };
            console.log(data);
            socket.emit('/signup', data);
            signUpCallback = callback;
        },
        checkEmail: function (email, callback) {
            socket.emit('/email/free', email);
            emailFreeCallback = callback;
        }
    }
});
