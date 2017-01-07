'use strict';
app.controller('ListCtrl', function($scope, $location, user) {

    $scope.openCanvas = function (canvas) {
        $location.path('/canvas/'+canvas.link);
    }
});
