'use strict';
app.controller('CanvasPrintCtrl', function($scope, $location, $timeout, $routeParams, user) {

    $scope.notFound = false;

    $scope.displayDeleting = false;
    $scope.deletingTimeout = null;
    $scope.deletingCount = 5;

    $scope.user = user;

    $scope.canvas = null;
    $scope.editable = false;

    user.getCanvas($routeParams.link, function (data) {
        // $scope.$apply (function () {
        //
        // });
        if (data) {
            console.log(data.name);
            $scope.canvas = data;

            $scope.$watch(function () {
                return $scope.canvas;
            }, function () {
                $scope.canvas.save();
            }, true);
        } else {
            $scope.$apply(function () {
                $scope.notFound = true;
            });
        }
    });

    $scope.hostname = 'canvas.techmind.io';

});
