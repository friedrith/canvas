'use strict';

var app = angular.module('value-proposition-canvas', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/canvas/value-proposition', {
        templateUrl: 'app/controllers/value-proposition-canvas/value-proposition-canvas.html',
        controller: 'ValuePropositionCanvasCtrl'
    })
    .when('/canvas/value-proposition/print/:canvas', {
        templateUrl: 'app/controllers/value-proposition-canvas-print/value-proposition-canvas-print.html',
        controller: 'ValuePropositionCanvasPrintCtrl'
    })
    .when('/welcome', {
        templateUrl: 'app/controllers/welcome/welcome.html',
        controller: 'WelcomeCtrl'
    })
    .when('/sign', {
        templateUrl: 'app/controllers/sign/sign.html',
        controller: 'SignCtrl'
    })
    .otherwise({
        redirectTo: '/welcome'
    });
});
