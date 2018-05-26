const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourceMaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const pify = require('pify');
const git = pify(require('gulp-git'));
const pkg = require('./package.json');

gulp.task('lib:clean', () => {
  return del('./dist/styles');
});

gulp.task('lib:sass', ['lib:clean'], () => {
  return gulp.src('./src/styles/sass/*.*')
    .pipe(gulp.dest('./dist/styles/sass'))
});

gulp.task('lib:css:compile', ['lib:clean'], () => {
  return gulp.src('./src/styles/sass/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('ng-shopping-cart.css'))
    .pipe(gulp.dest('./dist/styles/css'))
});

gulp.task('lib:css:min', ['lib:css:compile'], () => {
  return gulp.src('./dist/styles/css/ng-shopping-cart.css')
    .pipe(rename('ng-shopping-cart.min.css'))
    .pipe(sourceMaps.init())
    .pipe(cleanCss({compatibility: 'ie10'}))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./dist/styles/css'))
});

gulp.task('lib:css', ['lib:css:min']);

gulp.task('docs:clean', ['docs:checkout'], () => {
  return del(['*.js', '*.css', '3rdpartylicenses.txt', '*.html', './assets/*']);
});

gulp.task('docs:checkout', () => {
  return git.checkout('gh-pages');
});

gulp.task('docs:update', ['docs:clean'], () => {
  return gulp.src('./docs-dist')
    .pipe(gulp.dest('./'));
});

gulp.task('docs:index', ['docs:update'], () => {
  return gulp.src('./index.html')
    .pipe(rename('404.html'))
    .pipe(gulp.dest('./'));
});

gulp.task('docs:commit', () => {
  return git.commit(`Updating docs version ${pkg.version} at ${new Date().toISOString()}`);
});


gulp.task('docs:finish', ['docs:commit'], () => {
  return git.checkout('develop');
});

gulp.task('docs', ['docs:finish']);

gulp.task('lib', ['lib:sass', 'lib:css']);

gulp.task('default', ['lib']);
