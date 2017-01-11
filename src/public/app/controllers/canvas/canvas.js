    'use strict';
app.controller('CanvasCtrl', function($scope, $location, $window, $interval, $cookies, $routeParams, user) {

    // $scope.canvas = canvas;

    $scope.notFound = false;

    $scope.displayDeleting = false;
    $scope.deletingTimeout = null;
    $scope.deletingCount = 5;

    $scope.user = user;

    $scope.canvas = null;


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

            $scope.showWarning = false;

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
                    //if ($scope.user.allCanvas().length == 0) {
                        $location.path('/gallery');
                    /*
                    } else {
                        $location.path('/list');
                    }*/
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

    // console.log($cookies.get('notFirstTime'));

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


    $scope.displayMagicLink = function () {
        $scope.showWarning = true;
    };


    $scope.showLastChance = false;

    $scope.isEmpty = function (canvas) {
        if (canvas.name != 'Untitled') {
            return false;
        }

        for (var value in canvas.content) {
            if (canvas.content[value] != '' && canvas.content[value] != undefined) {
                return false;
            }
        }

        return true;
    }

    $scope.gotoGallery = function () {
        // console.log($scope.canvas.name+"/"+$scope.canvas.job+"/"+$scope.canvas.gains+"/"+$scope.canvas.pains+"/"+$scope.canvas.painrelievers+"/"+$scope.canvas.gaincreator+"/"+$scope.canvas.product);
        if (!$scope.isEmpty($scope.canvas)) {
            $scope.showLastChance = true;
        } else {
            $scope.closeCanvas();
        }
    };

    $scope.closeCanvas = function () {
        $location.path('/gallery');
    };

    $scope.hostname = window.location.host;

});
