var fs = require('fs-extra');
var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
// var webserver = require('gulp-webserver');
var connect = require('gulp-connect');
var open = require('gulp-open');

process.env.PORT = 8080;


//var electron = require('electron-connect').server.create();
var path = require('path');
// var findEvents = require('./utils/find-events');
// var uglify = require('gulp-uglify');
//var pump = require('pump');
// var install = require("gulp-install");
// var merge = require('merge-stream'); // several stream in the same tasks
/*var ngAnnotate = require('gulp-ng-annotate');
var htmlmin = require('gulp-htmlmin');
var jeditor = require("gulp-json-editor");*/
/*
var args = {};

for (var i = 3 ; i < process.argv.length ; i++) {
    if (process.argv[i] == '--version') {
        i++;
        args['version'] = process.argv[i];
    } else if (process.argv[i] == '--date') {
        i++;
        args['date'] = process.argv[i];
    } else if (process.argv[i] == '--stage') {
        i++;
        args['stage'] = process.argv[i];
    }
}*/

//nsole.log(process.argv);


// http://semantic-ui.com/introduction/build-tools.html
// http://semantic-ui.com/introduction/advanced-usage.html
// var watchSemantic = require('./node_modules/semantic-ui/tasks/watch');
// var buildSemantic = require('./node_modules/semantic-ui/tasks/build');
var package = require('./package.json');

//var gulpAsar = require('gulp-asar');

// *************************** DEV *******************************
/*
gulp.task('watch-semantic', watchSemantic);

gulp.task('watch-semantic-aux', buildSemantic);

gulp.task('build-semantic', function () {

    fs.copySync(path.join(__dirname, 'ui/theme.config'), 'node_modules/semantic-ui/src/theme.config');
    fs.copySync(path.join(__dirname, 'ui/site.variables'), 'node_modules/semantic-ui/src/themes/default/globals/site.variables');

    return gulp.start(['watch-semantic-aux']);


});*/

gulp.task('bower-install-dev', function () {
    // npm install
    return gulp.src('./ui/bower.json', {base:'./ui'})
    .pipe(gulp.dest('./ui'))
    .pipe(install({production: false}));
});

/*
gulp.task('watch', function () {
    gulp.start(['watch-less', 'watch-electron']);
});*/

gulp.task('watch-less',['less'], function() {
    gulp.watch('./src/public/styles/*.less', ['less']);  // Watch all the .less files, then run the less task
});

gulp.task('less', function () {
    return gulp.src('./src/public/styles/style.less')
    .pipe(less())
    .pipe(gulp.dest('./src/public/styles/'));
});

// https://github.com/schickling/gulp-webserver
/*
gulp.task('webserver', function() {
  return gulp.src('./src/public')
    .pipe(webserver({
      path: '/',
      livereload: true,
      directoryListing: true,
      open: 'http://localhost:8000/src/public/index.html#main',
      fallback: 'index.html'
    }));
});
*/


// https://github.com/avevlad/gulp-connect

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true,
    port: process.env.PORT
  });
});

gulp.task('html', function () {
  gulp.src('./src/public/**')
    .pipe(connect.reload());
});

gulp.task('watch-content', function () {
  gulp.watch(['./src/public/**'], ['html']);
});

gulp.task('open', function(){
  gulp.src('')
  .pipe(open({uri: 'http://localhost:8080'}));
});


gulp.task('default', ['connect', 'watch-content', 'watch-less'], function () {
    gulp.start('open');
});

/*
gulp.task('watch-electron', function () {
  // Start browser process
  electron.start();

  // Restart browser process
  gulp.watch('./main/**', electron.restart);

  // Reload renderer process
  gulp.watch('./ui/renderer/**', electron.reload); // seems to do not work
});

gulp.task('check-doc', function () {
    findEvents();
});


gulp.task('clean', function () {
    fs.removeSync(package.config.preferences);
    fs.removeSync(package.config.resources);

    fs.removeSync(path.join(__dirname, 'tmp'));
    fs.removeSync(path.join(__dirname, '../'+package.name+'.app'));
    fs.removeSync(path.join(__dirname, '../resources'));
    fs.removeSync(path.join(__dirname, '../preferences.json'));
    fs.removeSync(path.join(__dirname, '../logs'));

    return 0;
});

// *************************** DEPLOY *******************************

var appName = require('./package.json').name;
var appDir = path.join(__dirname, '../'+appName+'.app');

// see a good example : http://stackoverflow.com/questions/21969021/gulp-ngmin-uglify-not-working-properly
// https://github.com/olov/ng-annotate
// https://github.com/Kagami/gulp-ng-annotate

// good tutorial with a lot of gulp modules
// http://adamalbrecht.com/2014/06/20/building-your-angular-app-with-gulp-js/


gulp.task('copy-package', function () {
    // fs.emptyDirSync(appDir);
    return gulp.src("./package.json")
    .pipe(jeditor(function (json){
        json.scripts = {};
        json.devDependencies = {};
        json.config.preferences = './../preferences.json';
        json.config.resources = './../resources';
        json.config.logs = './../logs';
        json.config.shared = 'home';
        json.config.stage = 'prod';
        json.config.icon = './../../icon_elqui.ico';

        if (args.version) {
            json.version = args.version;
        }

        if (args.date) {
            json.config.date = args.date;
        }

        if (args.stage) {
            json.config.stage = args.stage;
        }

        return json;
    }))
    .pipe(gulp.dest(appDir));
});

gulp.task('npm-install', ['copy-package'], function () {
    // npm install
    return gulp.src(path.join(appDir, 'package.json'))
    .pipe(gulp.dest(appDir))
    .pipe(install({production: true}));
});

gulp.task('bower-install', ['copy-package'], function () {
    // npm install
    return gulp.src('./ui/bower.json', {base:'.'})
    .pipe(gulp.dest(appDir))
    .pipe(install({production: true}));
});
*/

//
// gulp.task('generate-app', ['npm-install', 'bower-install', 'build-semantic'], function () {
//
//     // transfer main process files
//     var main = gulp.src('main/**/*.js', {base:'.'})
//     .pipe(uglify())
//     .pipe(gulp.dest(appDir));
//
//     var uiJs = gulp.src(['./ui/common/**/*.js','./ui/browser/**/*.js', './ui/renderer/**/*.js', './ui/cna/**/*.js', ], {base: '.'})
//     .pipe(ngAnnotate())
//     .pipe(uglify({mangle: false}))
//     .pipe(gulp.dest(appDir));
//
//     var html = gulp.src(['./ui/common/**/*.html','./ui/browser/**/*.html', './ui/renderer/**/*.html', './ui/cna/**/*.html'], {base: '.'})
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest(appDir));
//
//     var css = gulp.src('./ui/common/styles/style.less', {base: '.'})
//     .pipe(less())
//     .pipe(gulp.dest(appDir));
//
//     var img = gulp.src(['./ui/common/**/*.png', './ui/common/**/*.ico'], {base: '.'})
//     .pipe(gulp.dest(appDir));
//
//     // var bower = gulp.src('./ui/bower_components/**/*', {base: '.'})
//     // .pipe(gulp.dest(appDir));
//
//     var libs = gulp.src(['./ui/libs/lodash.min.js', './ui/libs/semantic-ui/**/*','./ui/libs/material-design-iconic-font/**/*', './ui/libs/lato/**/*'], {base: '.'})
//     .pipe(gulp.dest(appDir));
//
//     return merge(main, uiJs, html, css, img, libs /*bower, package*/);
// });
