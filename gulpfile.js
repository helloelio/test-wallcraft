const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const del = require('del');

const config = {
  port: 8080,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    css: './src/*.scss',
    js: './src/*.js',
    images: './src/images/*',
    dist: './dist',
  },
};

gulp.task('connect', () => {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true,
  });
});

gulp.task('open', gulp.series('connect'), () => {
  return gulp
    .src('dist/index.html')
    .pipe(open('', { url: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', () => {
  return gulp
    .src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('js', () => {
  return gulp
    .src(config.paths.js)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('css', () => {
  return gulp
    .src(config.paths.css)
    .pipe(sass())
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('images', () => {
  return gulp
    .src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch(config.paths.html, gulp.series('html'));
  gulp.watch(config.paths.css, gulp.series('css'));
  gulp.watch(config.paths.js, gulp.series('js'));
  gulp.watch(config.paths.images, gulp.series('images'));
});

gulp.task('dev', gulp.parallel('html', 'js', 'css', 'images', 'open', 'watch'));

gulp.task('build', gulp.series('html', 'css', 'js', 'images'));
