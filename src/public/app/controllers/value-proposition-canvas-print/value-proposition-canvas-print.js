'use strict';
app.controller('ValuePropositionCanvasPrintCtrl', function($scope, $location, $timeout, $routeParams) {

    $scope.zoom = 85;

    $scope.target = $routeParams.target;

    $scope.canvas = JSON.parse($routeParams.canvas);

    $scope.segment = $scope.canvas.segment;
    $scope.valueProposition = $scope.canvas.valueProposition;


    $timeout(function () {
        window.print();
    }, 2000);


});
