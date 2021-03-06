app.factory('user', function ($rootScope, $timeout, socket) {

    var allCanvas = [];

    var recentsCanvas = [];

    var login = 'Unknown';

    var logged = true;

    var waitingDownload = false;

    var canvasCreatedCallback = null;
    var canvasDeletedCallback = null;

    var currentCanvas = null;
    var canvasLocked = false;

    socket.emit('canvas/all/get');

    function addFunctions (canvas) {
        console.log(canvas.type);
        // canvas.save = function () {
        //   console.log('save');
        //     if (!canvasLocked) {
        //
        //     }
        // };

        canvas.delete = function (callback) {
            socket.emit('/canvas/delete', canvas.link);
            canvasDeletedCallback = callback;
        };

        canvas.export = function (callback) {
            socket.emit('/canvas/export', canvas.public);
            waitingDownload = true;
        };

    }

    socket.on('/canvas/created', function (data) {
        addFunctions(data);
        currentCanvas = data;
        // allCanvas.push(data);
        // recentsCanvas.push(data);
        canvasCreatedCallback && canvasCreatedCallback(data);
        canvasCreatedCallback = null;
    });

    socket.on('/canvas/updated', function (data) {
        console.log('updated');
        if (currentCanvas && currentCanvas.public === data.public) {
            canvasLocked = true;
            currentCanvas.content = data.content;
            currentCanvas.name = data.name;
            currentCanvas.target = data.target;
            currentCanvas.zoom = data.zoom;
            canvasLocked = false;
        }
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
        currentCanvas = null;
    });

    var canvasGetCallback = null;

    socket.on('/canvas/found', function (data) {
        console.log(data);
        addFunctions(data);
        // allCanvas.push(data);
        // recentsCanvas.push(data);
        currentCanvas = data;
        canvasGetCallback && canvasGetCallback(data);
        canvasGetCallback = null;
    });

    socket.on('/canvas/not/found', function (data) {
        canvasGetCallback && canvasGetCallback(data);
        canvasGetCallback = null;
    });

    var canvasGetPublicCallback = null;

    socket.on('/canvas/public/found', function (data) {
        currentCanvas = data;
        canvasGetPublicCallback && canvasGetPublicCallback(data);
        canvasGetPublicCallback = null;
    });

    socket.on('/canvas/public/not/found', function (data) {
        canvasGetPublicCallback && canvasGetPublicCallback(data);
        canvasGetPublicCallback = null;
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

    socket.on('/canvas/pdf', function (data) {
        console.log('/canvas/pdf');
        var byteString = atob(data.dataURI.split(',')[1]);

          // separate out the mime component
          var mimeString = data.dataURI.split(',')[0].split(':')[1].split(';')[0]

          // write the bytes of the string to an ArrayBuffer
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);
          for (var i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
          }

          // write the ArrayBuffer to a blob, and you're done
          var blob = new Blob([ab], {type: mimeString});

          saveAs(blob, data.name);
          waitingDownload = false;
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
        createCanvas: function (type, callback) {
          console.log('createCanvas');
            socket.emit('/canvas/create', type);
            canvasCreatedCallback = callback;
        },
        canvasLocked: function () {
            return canvasLocked;
        },
        saveCanvas: function () {
          // console.log('saveCanvas');
            if (currentCanvas) {
              console.log('saveCanvas', currentCanvas.content);
              socket.emit('/canvas/update', {
                  link: currentCanvas.link,
                  type: currentCanvas.type,
                  name: currentCanvas.name,
                  target: currentCanvas.target,
                  zoom: currentCanvas.zoom,
                  content : currentCanvas.content
              });
            }
        },
        getCanvas: function (link, callback) {
            var found = false;
            for (var i = 0 ; i < allCanvas.length ; i++) {
                if (allCanvas[i].link == link) {
                    found = true;
                    callback && callback(allCanvas[i]);
                }
            }
            if (!found) {
                canvasGetCallback = callback;
                socket.emit('/canvas', link);
            }

        },
        getPublicCanvas: function (link, callback) {

            canvasGetPublicCallback = callback;
            socket.emit('/canvas/public', link);
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
        },
        waitingDownload: function () {
            return waitingDownload;
        }
    }
});
