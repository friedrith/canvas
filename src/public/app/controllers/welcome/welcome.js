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

    $scope.importFile = function (content) {
        try {
            console.log(content);
            var json = JSON.parse(content);
            canvas.set(json);
            $location.path('/canvas/value-proposition')
        } catch (e) {
            console.log(e);
        }
    }

    $scope.file = '';

    $scope.dragging = false;

    $scope.$watch('file', function (newValue, oldValue) {
        console.log('file changed');

        $scope.importFile(newValue);

    });



    $scope.count = 0;

    window.addEventListener('dragenter', function (event) {
        if ($scope.count == 0) {
            $timeout(function () {
                $scope.dragging = true;
            });
        }
        $timeout(function () {
            $scope.count = $scope.count + 1;
        });
        event.stopPropagation();
        event.preventDefault();
        return false;
    }, false);

    window.addEventListener('dragleave', function (event) {
        $timeout(function () {
            $scope.count = $scope.count - 1;
        });
        if ($scope.count == 0)  {
            $timeout(function () {
                $scope.dragging = false;
            });
        }
        event.stopPropagation();
        event.preventDefault();
        return false;
    }, false);

    window.addEventListener('dragover', function (event) {
        console.log('dragover');
        event.stopPropagation();
        event.preventDefault();
        return false;
    }, false);

    window.addEventListener('drop', function (event) {
        console.log('drop');
        $timeout(function () {
            $scope.dragging = false;

        });

        var reader = new FileReader();
        reader.onload = function (loadEvent) {
            $timeout(function () {
                $scope.importFile(loadEvent.target.result);
            });
        }
        reader.readAsText(event.dataTransfer.files[0]);
        event.preventDefault();
        event.stopPropagation();
        return false;
    }, false);

});
