'use strict';
app.controller('WelcomeCtrl', function($scope, $location, $timeout, canvas) {

    $scope.showImport = window.File && window.FileReader && window.FileList && window.Blob;

    $scope.newValuePropositionCanvas = function () {
        canvas.init();
        $location.path('/canvas/value-proposition');
    };

    $scope.import = function () {
        $('.welcome-file').click();
    };

    $scope.file = '';

    $scope.$watch('file', function (newValue, oldValue) {
        console.log('file changed');

        try {
            console.log(newValue);
            var json = JSON.parse(newValue);
            canvas.set(json);
            $location.path('/canvas/value-proposition')
        } catch (e) {
            console.log(e);
        }

    });

});
