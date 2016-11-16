'use strict';
app.controller('ValuePropositionCanvasPrintCtrl', function($scope, $location, $timeout, $routeParams) {

    $scope.zoom = 85;

    $scope.target = $routeParams.target;

    $scope.segment = {
        name: 'Customer segment name',
        job: 'The job',
        gains: '',
        pains: ''
    };

    $scope.valueProposition = {
        product: '',
        gainCreators: '',
        painRelievers: ''
    };

    $timeout(function () {
        window.print();
    }, 2000);


});
