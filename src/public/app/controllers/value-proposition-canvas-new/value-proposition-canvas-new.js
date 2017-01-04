    'use strict';
app.controller('ValuePropositionCanvasNewCtrl', function($scope, $location, $window, $interval, $cookies, $routeParams, user) {

    $scope.user = user;

    $scope.newCanvas = function () {
        $scope.user.createValuePropositionCanvas(function (data) {
            $location.path('/canvas/value-proposition/'+data.link);
        });
    };


});
