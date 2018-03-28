const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')
const concat = require('gulp-concat')
const del = require('del')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const nunjucks = require('gulp-nunjucks')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const runSequence = require('run-sequence')
const sass = require('gulp-sass')
const sassVars = require('gulp-sass-vars')
const sourcemaps = require('gulp-sourcemaps')
const surge = require('gulp-surge')
const uglify = require('gulp-uglify')

let cdn = null

gulp.task('browser-sync', () =>
  browserSync.init({
    server: {
      baseDir: 'dest',
      index: 'main.html'
    }
  })
)

gulp.task('build', callback =>
  runSequence('clean', 'source', 'public', callback)
)

gulp.task('clean', () =>
  del('dest')
)

gulp.task('default', callback =>
  runSequence('build', 'watch', callback)
)

gulp.task('images', () =>
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dest/images'))
    .on('end', browserSync.reload)
)

gulp.task('public', () =>
  gulp.src('public/**/*')
    .pipe(gulp.dest('dest'))
)

gulp.task('scripts', () =>
  gulp.src([
    'node_modules/what-input/dist/what-input.js',
    'src/scripts/*.js'
  ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dest'))
    .on('end', browserSync.reload)
)

gulp.task('source', ['images', 'scripts', 'stylesheets', 'templates'])

gulp.task('stage', callback =>
  runSequence('build', 'surge', callback)
)

gulp.task('stylesheets', () =>
  gulp.src('src/stylesheets/*.scss')
    .pipe(plumber())
    .pipe(sassVars({
      cdn: cdn
    }))
    .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'compressed',
        precision: 10
      }))
      .pipe(autoprefixer())
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dest'))
    .pipe(browserSync.stream({
      match: '**/*.css'
    }))
)

gulp.task('surge', () =>
  surge({
    project: 'dest',
    domain: 'industry-super-wage-gap-immersive.surge.sh'
  })
)

gulp.task('templates', () =>
  gulp.src('src/templates/*.njk')
    .pipe(plumber())
    .pipe(nunjucks.compile({
      cdn: cdn
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('dest'))
    .on('end', browserSync.reload)
)

gulp.task('watch', ['browser-sync'], () => {
  gulp.watch('src/images/*', ['images'])
  gulp.watch('src/scripts/**/*.js', ['scripts'])
  gulp.watch('src/stylesheets/**/*.scss', ['stylesheets'])
  gulp.watch('src/templates/**/*.njk', ['templates'])
})
