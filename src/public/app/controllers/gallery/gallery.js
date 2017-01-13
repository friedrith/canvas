'use strict';
app.controller('GalleryCtrl', function($scope, $location, $window, $route, user) {

    $scope.user = user;


    $scope.canvasList = [
        {
            name: "Value Proposition Canvas",
            type: "value-proposition",
            label: "No pain, no gain!",
            img: "canvas.png"
        },
        {
            name: "Business Model Canvas",
            type: "business-model",
            label: "Business is Business !",
            img: "business-model-canvas-3.png"
        }
    ];

    $scope.chooseCanvas = function (type) {
        $scope.user.createCanvas(type, function (data) {
            $location.path('/'+data.link);
        });
    };

    $scope.mailTo = function () {
        $window.open('mailto:tf@elqui.fr' + "?subject=new canvas please&body=I would like a new kind of canvas","_self");
    };

    $scope.gotoIndex = function () {
        window.location = '/';
    };

});
