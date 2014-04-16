var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var http = require('http');
var ecstatic = require('ecstatic');
var exec = require('gulp-exec');

gulp.task('templates', function() {
  gulp.src('*.jade')
    .pipe(jade())
    .pipe(gulp.dest('.'));
});

var browserifyTaskDev = 'browserify index.js > index-dev.js --debug';

// Development ///////////////////////////////////////////////////////////
gulp.task('scripts', function() {
  gulp.src('index.js', { read: false })
    .pipe(exec(browserifyTaskDev));
});

gulp.task('sass', function () {
   gulp.src('index.scss')
    .pipe(sass({ includePaths: [
       'node_modules/reveal',
       'node_modules/reveal/theme',
       'node_modules/reveal/font',
       ]
     }))
    .pipe(gulp.dest('.'));
});

gulp.task('default',['templates','scripts','sass','serve']);

gulp.task('serve', function(){
  http.createServer(
      ecstatic({ root: __dirname })
    ).listen(8080);
});
