    'use strict';
app.controller('CanvasPublicCtrl', function($scope, $location, $route, $window, $interval, $cookies, $routeParams, user) {

    $scope.notFound = false;

    $scope.user = user;

    $scope.canvas = null;
    $scope.editable = false;


    user.getPublicCanvas($routeParams.public, function (data) {
        // $scope.$apply (function () {
        //
        // });
        if (data) {
            console.log(data.name);
            $scope.canvas = data;

        } else {
            $scope.$apply(function () {
                $scope.notFound = true;
            });
        }
    });

    $scope.closeCanvas = function () {
        window.location = '/';

    };

    $scope.hostname = window.location.host;

});
