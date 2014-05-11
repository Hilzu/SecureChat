'use strict';

var gulp = require('gulp')
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
    .on('change', ['hint'])
    .on('restart', function () {
      console.log('Restared!');
    });
});

gulp.task('hint', function () {
  gulp.src(paths.projectScripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
