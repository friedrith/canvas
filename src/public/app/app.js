'use strict';

var app = angular.module('value-proposition-canvas', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/canvas/value-proposition', {
        templateUrl: '/app/controllers/value-proposition-canvas/value-proposition-canvas.html',
        controller: 'ValuePropositionCanvasCtrl'
    })
    .when('/canvas/value-proposition/print/:target/:canvas', {
        templateUrl: '/app/controllers/value-proposition-canvas-print/value-proposition-canvas-print.html',
        controller: 'ValuePropositionCanvasPrintCtrl'
    })
    .when('/welcome', {
        templateUrl: '/app/controllers/welcome/welcome.html',
        controller: 'WelcomeCtrl'
    })
    .otherwise({
        redirectTo: '/welcome'
    });
});
