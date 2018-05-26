const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourceMaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const pify = require('pify');
const git = pify(require('gulp-git'));
const pkg = require('./package.json');
const {exec} = require('child_process');
const pump = require('pump');

gulp.task('lib:clean', () => {
  return del('./dist/styles');
});

gulp.task('lib:sass', ['lib:clean'], (cb) => {
  pump([
    gulp.src('./src/styles/sass/*.*'),
    gulp.dest('./dist/styles/sass'),
  ], cb);
});

gulp.task('lib:css:compile', ['lib:clean'], (cb) => {
  pump([
    gulp.src('./src/styles/sass/index.scss'),
    sass(),
    rename('ng-shopping-cart.css'),
    gulp.dest('./dist/styles/css'),
  ], cb);
});

gulp.task('lib:css:min', ['lib:css:compile'], (cb) => {
  pump([
    gulp.src('./dist/styles/css/ng-shopping-cart.css'),
    rename('ng-shopping-cart.min.css'),
    sourceMaps.init(),
    cleanCss({compatibility: 'ie10'}),
    sourceMaps.write('.'),
    gulp.dest('./dist/styles/css'),
  ], cb);
});

gulp.task('lib:css', ['lib:css:min']);

gulp.task('docs:generate', (cb) => {
  exec('npm run docs', {windowsHide: true}, cb);
});

gulp.task('docs:compile', ['docs:generate'], (cb) => {
  exec('npm run docs:build', {windowsHide: true}, cb);
});

gulp.task('docs:checkout', ['docs:compile'], () => {
  return git.checkout('gh-pages');
});

gulp.task('docs:clean', ['docs:checkout'], () => {
  return del(['*.js', '*.css', '*.html', './assets/*', '3rdpartylicenses.txt', '.nojekyll', 'favicon.ico']);
});

gulp.task('docs:update', ['docs:clean'], (cb) => {
  pump([
    gulp.src('./docs-dist/**/*'),
    gulp.dest('./')
  ], cb);
});

gulp.task('docs:index', ['docs:update'], (cb) => {
  pump([
    gulp.src('./index.html'),
    rename('404.html'),
    gulp.dest('./'),
  ], cb);
});

gulp.task('docs:commit', ['docs:index'], () => {
  const msg = `Updating docs version ${pkg.version}`;
  return git.exec({args: 'add ./* -A'})
    .then(() => git.exec({args: `commit -a --message="${msg}"`}))
});


gulp.task('docs:finish', ['docs:commit'], () => {
  return git.checkout('develop');
});

gulp.task('docs:cleanup', ['docs:finish'], () => {
  return del(['./docs-dist', './docs-build']);
});

gulp.task('docs', ['docs:cleanup']);

gulp.task('lib', ['lib:sass', 'lib:css']);

gulp.task('default', ['lib']);
