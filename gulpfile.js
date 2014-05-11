'use strict';

var gulp = require('gulp')
  , jscs = require('gulp-jscs')
  , jshint = require('gulp-jshint')
  , nodemon = require('gulp-nodemon')
  , paths
  ;

paths = {
  projectScripts: ['./bin/www', '**/*.js', '!node_modules/**', '!public/**']
};

gulp.task('default', ['develop'], function () {
});

gulp.task('develop', function () {
  nodemon({ script: 'bin/www', ext: 'js' })
    .on('change', ['hint', 'jscs'])
    .on('restart', function () {
      console.log('Restarted!');
    });
});

gulp.task('hint', function () {
  gulp.src(paths.projectScripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function () {
  gulp.src(paths.projectScripts)
    .pipe(jscs())
    .on('error', function (err) {
      console.log('gulp-jscs found problems.');
      console.log(err.message);
    });
});
