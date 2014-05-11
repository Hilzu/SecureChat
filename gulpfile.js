'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

var paths = {
  projectScripts: ['./bin/www', '**/*.js', '!node_modules/**', '!public/**']
};

gulp.task('default', ['lint', 'watch'], function() {
});

gulp.task('develop', function () {
  nodemon({ script: 'bin/www', ext: 'js' })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('Restared!');
    });
});

gulp.task('lint', function () {
  gulp.src(paths.projectScripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function () {
  gulp.watch(paths.projectScripts, ['lint']);
});
