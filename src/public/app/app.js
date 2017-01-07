'use strict';

var app = angular.module('canvas', ['ngRoute', 'ngCookies', 'ngSanitize'/*, 'ngFitText'*/]);

app.config(function ($routeProvider) {
    $routeProvider
    /*
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
    })*/
    .when('/gallery', {
        templateUrl: 'app/controllers/gallery/gallery.html',
        controller: 'GalleryCtrl'
    })
    .when('/:link', {
        templateUrl: 'app/controllers/canvas/canvas.html',
        controller: 'CanvasCtrl'
    })
    .when('/print/:link', {
        templateUrl: 'app/controllers/canvas-print/canvas-print.html',
        controller: 'CanvasPrintCtrl'
    })
    .otherwise({
        redirectTo: '/gallery'
    });
});
