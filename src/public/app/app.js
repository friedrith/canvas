'use strict';

var app = angular.module('value-proposition-canvas', ['ngRoute', 'ngCookies', 'ngSanitize', 'ngFitText']);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/canvas/value-proposition/new', {
        templateUrl: 'app/controllers/value-proposition-canvas-new/value-proposition-canvas-new.html',
        controller: 'ValuePropositionCanvasNewCtrl'
    })
    .when('/canvas/value-proposition/:link', {
        templateUrl: 'app/controllers/value-proposition-canvas/value-proposition-canvas.html',
        controller: 'ValuePropositionCanvasCtrl'
    })
    .when('/canvas/value-proposition/print/:link', {
        templateUrl: 'app/controllers/value-proposition-canvas-print/value-proposition-canvas-print.html',
        controller: 'ValuePropositionCanvasPrintCtrl'
    })
    .when('/welcome', {
        templateUrl: 'app/controllers/welcome/welcome.html',
        controller: 'WelcomeCtrl'
    })
    .when('/sign-up', {
        templateUrl: 'app/controllers/sign-up/sign-up.html',
        controller: 'SignUpCtrl'
    })
    .when('/sign-in', {
        templateUrl: 'app/controllers/sign/sign.html',
        controller: 'SignCtrl'
    })
    .when('/list', {
        templateUrl: 'app/controllers/list/list.html',
        controller: 'ListCtrl'
    })
    .when('/gallery', {
        templateUrl: 'app/controllers/gallery/gallery.html',
        controller: 'GalleryCtrl'
    })
    .otherwise({
        redirectTo: '/canvas/value-proposition/new'
    });
});
