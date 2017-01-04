'use strict';
app.controller('GalleryCtrl', function($scope, $location, user) {

    $scope.user = user;


    $scope.canvasList = [
        {
            name: "Value Proposition Canvas",
            url: "canvas/value-proposition"
        }
    ];

    $scope.chooseCanvas = function (canvas) {

        if (canvas.url == 'canvas/value-proposition') {
            $scope.user.createValuePropositionCanvas(function (data) {
                $location.path(canvas.url+'/'+data.link);
            });
        }

    };


});
