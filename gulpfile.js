const gulp = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  terser = require('gulp-terser'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload');

sass.compiler = require('node-sass');

function css() {
  return gulp
    .src('./css/**/style.sass')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./tm/css'))
    .pipe(livereload());
}

function js() {
  return gulp.src([
      './js/jquery.js',
      './js/owlcarousel.js',
      './js/magnificpopup.js',
      './js/maskedinput.js',
      './js/vendor/ui/jquery-ui.min.js',
      './js/init.js'

    ])
    .pipe(terser())
    .pipe(concat('script.js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./tm/js'))
    .pipe(livereload());
}

function watch() {
  livereload.listen();
  gulp.watch('./css/**/*.sass', css);
  gulp.watch('./js/*.js', js);
}

exports.css = css;
exports.js = js;
exports.watch = watch;
exports.default = gulp.series(css, js);