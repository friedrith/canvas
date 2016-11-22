'use strict';
app.controller('ValuePropositionCanvasCtrl', function($scope, $location, $window, $interval, $cookies, canvas) {

    $scope.canvas = canvas;

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

    $scope.print = function () {
        window.open('#/canvas/value-proposition/print/'+encodeURI(JSON.stringify(canvas.serialize())), '_blank');
    };

    $scope.download = function () {
        var serialize = canvas.serialize();
        serialize.zoom = $scope.zoom;
        var data = new Blob([JSON.stringify(serialize)], {type: 'application/json;charset=UTF-8'});
        saveAs(data, 'value-proposition.canvas');
    };

    $scope.delete = function () {
        $scope.deletingCount = 4;
        //$scope.displayDeleting = true;
        $scope.deletingTimeout = $interval(function () {
            $scope.deletingCount = $scope.deletingCount - 1;
            if ($scope.deletingCount == 0) {
                $interval.cancel($scope.deletingTimeout);
                $scope.deletingTimeout = null;
                $scope.displayDeleting = false;
                canvas.init();
                $location.path('/welcome');
            }
        }, 1000);
    };

    $scope.cancelDeleting = function () {
        $interval.cancel($scope.deletingTimeout);
        $scope.deletingTimeout = null;
        $scope.displayDeleting = false;
    }

    $scope.zoomDefault();

    var cookies = $cookies.getAll();

    $scope.firstTime = true;

    if (cookies.notFirstTime) {
        $scope.firstTime = false;
    }

    $scope.showTutorial = $scope.firstTime && $scope.canvas.isEmpty();

    $scope.closeTutorial = function () {
        $scope.showTutorial = false;
    };

    $scope.stepTutorial = 'begin'; // 'begin';

    $scope.nextStepTutorial = function () {
        if ($scope.stepTutorial == 'begin') {
            $scope.stepTutorial = 'customer-segment';
        } else if ($scope.stepTutorial == 'customer-segment') {
            $scope.stepTutorial = 'value-proposition';
        } else if ($scope.stepTutorial == 'value-proposition') {
            $scope.stepTutorial = 'menu';
        }
    };

    $scope.finishTutorial = function () {
        $scope.showTutorial = false;
    };

});
