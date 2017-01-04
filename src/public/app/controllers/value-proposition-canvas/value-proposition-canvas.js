    'use strict';
app.controller('ValuePropositionCanvasCtrl', function($scope, $location, $window, $interval, $cookies, $routeParams, user) {

    // $scope.canvas = canvas;

    $scope.notFound = false;

    $scope.displayDeleting = false;
    $scope.deletingTimeout = null;
    $scope.deletingCount = 5;

    $scope.user = user;

    $scope.canvas = null;

    user.getValuePropositionCanvas($routeParams.link, function (data) {
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

    // $scope.canvas = user.getValuePropositionCanvas($routeParams.link);

    // $scope.segment = canvas.segment;

    // $scope.valueProposition = canvas.valueProposition;

    $scope.zoomDefault = function () {
        if ($scope.canvas) {
            $scope.canvas.zoom = 70;
        }
    };

    $scope.zoomIn = function () {
        if ($scope.canvas) {
            $scope.canvas.zoom = $scope.canvas.zoom + 10;
        }
    }

    $scope.zoomOut = function () {
        if ($scope.canvas && $scope.canvas.zoom >= 10) {
            $scope.canvas.zoom = $scope.canvas.zoom - 10;
        }
    }

    // $scope.print = function () {
    //     window.open('#/canvas/value-proposition/print/'+encodeURI(JSON.stringify(canvas.serialize())), '_blank');
    // };

    // $scope.download = function () {
    //     var serialize = canvas.serialize();
    //     serialize.zoom = $scope.zoom;
    //     var data = new Blob([JSON.stringify(serialize)], {type: 'application/json;charset=UTF-8'});
    //     saveAs(data, 'value-proposition.canvas');
    // };

    $scope.delete = function () {
        $scope.deletingCount = 4;
        //$scope.displayDeleting = true;
        $scope.deletingTimeout = $interval(function () {
            $scope.deletingCount = $scope.deletingCount - 1;
            if ($scope.deletingCount == 0) {
                $interval.cancel($scope.deletingTimeout);
                $scope.deletingTimeout = null;
                $scope.displayDeleting = false;
                $scope.canvas.delete(function () {
                    if ($scope.user.allCanvas().length == 0) {
                        $location.path('/gallery');
                    } else {
                        $location.path('/list');
                    }
                });
                // canvas.init();
            }
        }, 1000);
    };

    $scope.cancelDeleting = function () {
        $interval.cancel($scope.deletingTimeout);
        $scope.deletingTimeout = null;
        $scope.displayDeleting = false;
    }

    // $scope.zoomDefault();

    // $cookies.remove('notFirstTime');

    console.log($cookies.get('notFirstTime'));

    $scope.firstTime = true;

    if ($cookies.get('notFirstTime')) {
        $scope.firstTime = false;
    }

    $scope.showTutorial = false ; // $scope.firstTime && $scope.canvas.isEmpty();

    $scope.closeTutorial = function () {
        $scope.showTutorial = false;
        $cookies.put('notFirstTime', true, {'expires': new Date(new Date().setFullYear(new Date().getFullYear() + 1))}  );
        console.log($cookies.get('notFirstTime'));

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
        $cookies.put('notFirstTime', true, {'expires': new Date(new Date().setFullYear(new Date().getFullYear() + 1))}  );
    };

    $scope.keyPress = function (event) {
         if (event.keyCode == 13) {
             event.preventDefault();
             event.stopPropagation();
             return false;
         }
    };

});
