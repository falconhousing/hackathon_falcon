var gulp 		= require('gulp')
var coffee 	= require('gulp-coffee');
var jade 		= require('gulp-jade');
var stylus 	= require('gulp-stylus');
var gutil   = require('gulp-util');
var nodemon = require('gulp-nodemon');

var wrap  = require('gulp-wrap-amd');

gulp.task('coffee', function() {
  gulp.src('./src/**/*.coffee')
    .pipe(coffee({bare: true})
    	.on('error', gutil.log))
    .pipe(gulp.dest('./public/'))
});

gulp.task('javascripts', function() {
  gulp.src('./src/**/*.js')
  .pipe(gulp.dest('./public/'))
});

gulp.task('font', function() {
  gulp.src('./src/**/*.woff2')
  .pipe(gulp.dest('./public/'))
});

gulp.task('png', function() {
  gulp.src('./src/**/*.png')
  .pipe(gulp.dest('./public/'))
});

gulp.task('jpg', function() {
  gulp.src('./src/**/*.jpg')
  .pipe(gulp.dest('./public/'))
});
gulp.task('ico', function() {
  gulp.src('./src/**/*.ico')
  .pipe(gulp.dest('./public/'))
});

gulp.task('html', function() {
  gulp.src('./src/**/*.html')
  .pipe(gulp.dest('./public/'))
});

gulp.task('jade', function() {
  gulp.src('./src/**/*.jade')
    .pipe(jade({
      client: true
    }))
    .pipe( wrap({deps: ['jade'], params: ['jade']}) )
    .pipe(gulp.dest('./public/'))
});

gulp.task('stylus', function(){
	gulp.src('./src/**/*.styl')
	.pipe(stylus())
		.on('error', gutil.log)
	.pipe(gulp.dest('./public/'))
});

gulp.task('start', function () {
  nodemon({
    script: 'app.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('watch', function(){
  gulp.watch('./src/**/*.coffee', ['coffee'])
  gulp.watch('./src/**/*.jade'  , ['jade'])
  gulp.watch('./src/**/*.styl', ['stylus'])
})

gulp.task('default', ['coffee', 'jade', 'stylus', 'watch', 'start', 'javascripts', 'html', 'png', 'font', 'jpg', 'ico'])