'use strict';
app.controller('ValuePropositionCanvasCtrl', function($scope, $location, $window, $interval, canvas) {

    $scope.displayDialog = false;
    $scope.openDialog = function () {
        $scope.displayDialog = true;
    };

    $scope.displayDeleting = false;
    $scope.deletingTimeout = null;
    $scope.deletingCount = 5;

    $scope.zoom = 100;

    $scope.segment = canvas.segment;

    $scope.valueProposition = canvas.valueProposition;

    $scope.zoomDefault = function () {
        $scope.zoom = 80;
    };

    $scope.zoomIn = function () {
        $scope.zoom = $scope.zoom + 10;
    }

    $scope.zoomOut = function () {
        if ($scope.zoom >= 10) {
            $scope.zoom = $scope.zoom - 10;
        }
    }

    $scope.print = function (value) {
        window.open('#/canvas/value-proposition/print/'+value, '_blank');
    };

    $scope.download = function () {
        var data = new Blob([JSON.stringify(canvas)], {type: 'application/json;charset=UTF-8'});
        saveAs(data, 'value-proposition-canvas.json');
    };

    $scope.delete = function () {
        $scope.deletingCount = 4;
        $scope.displayDeleting = true;
        $scope.deletingTimeout = $interval(function () {
            $scope.deletingCount = $scope.deletingCount - 1;
            if ($scope.deletingCount == 0) {
                canvas.init();
                $location.path('/welcome');
            }
        }, 1000);
    };

    $scope.cancelDeleting = function () {
        $interval.cancel($scope.deletingTimeout);
        $scope.displayDeleting = false;
    }

    $scope.zoomDefault();


});
