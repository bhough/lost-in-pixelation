var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var newer = require('gulp-newer');
var del = require('del');
var replace = require('gulp-replace');
var watch = require('gulp-watch');

var config = {
    scssPath: './source/scss',
    imgPath: './source/img'
}

var onError = function (err) {  
  gutil.beep();
  console.log(err);
  this.emit('end');
};

var getStamp = function() {

    var myDate = new Date().getTime();
    return myDate;

};
 
gulp.task('csscompile', function() {
  return gulp.src(config.scssPath + '/main.scss')
  .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(compass({
      project: path.join(__dirname, '/'),
      css: 'public/css',
      sass: 'source/scss'
    }))
    .pipe(autoprefixer('> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'));
});
 
gulp.task('imagemin', function () {
    return gulp.src(config.imgPath + '/**/*')
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(newer('public/img'))
       .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('public/img'));
});

gulp.task('clean', function(cb) {
    del(['public/css/**/'], cb)
});

gulp.task('cachebust', function() {
    return gulp.src('./app/views/partials/header.handlebars')
        .pipe(plumber({
          errorHandler: onError
        }))
       .pipe(replace(/main\.?([0-9]*)\.css/g, 'main.' + getStamp() + '.css'))
        .pipe(gulp.dest('./app/views/partials/'))
});

gulp.task('watch', function () {
    watch(config.scssPath + '/**/*.scss', function () {
        gulp.start('clean','csscompile', 'cachebust')});
    watch(config.imgPath + '/**/*', function () {
        gulp.start('imagemin');
    });
});

gulp.task('default', function() {
    gulp.start('watch');
});
