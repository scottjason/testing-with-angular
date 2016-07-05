const fs = require('fs')
const gulp = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const nodemon = require('gulp-nodemon')
const stylus = require('gulp-stylus')
const rimraf = require('rimraf')
const runSequence = require('run-sequence')
const autoprefixer = require('gulp-autoprefixer')
const buildDir = './dist/'

require('colors')

// default task to run during development (npm start)
gulp.task('default', (cb) => {
  runSequence('delete', 'create', ['devJS', 'libJS', 'styles', 'views'], 'concat', 'server', cb)
})

// delete build dir
gulp.task('delete', (cb) => {
  console.log('Gulp Log, Delete'.magenta)
  rimraf(buildDir, () => cb())
})

// create build dir
gulp.task('create', (cb) => {
  console.log('Gulp Log, Create'.magenta)
  fs.mkdir(buildDir, () => cb())
})

// dev scripts
gulp.task('devJS', () => {
  console.log('Gulp Log, devJS'.magenta)
  return gulp.src(['src/scripts/app.js',
      'src/scripts/app.config.js',
      'src/scripts/controllers/*.js',
      'src/scripts/directives/*.js',
      '!src/scripts/directives/*.spec.js',
      'src/scripts/services/*.js'
    ])
    .pipe(concat('dev.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest(buildDir))
})

// lib scripts
gulp.task('libJS', () => {
  console.log('Gulp Log, libJS'.magenta)
  return gulp.src(['src/bower_components/angular/angular.js',
      'src/bower_components/angular-ui-router/release/angular-ui-router.js'
    ])
    .pipe(concat('lib.min.js'))
    .pipe(uglify({ mangle: true }))
    .pipe(gulp.dest(buildDir))
})

// contact dev & lib js scripts
gulp.task('concat', ['devJS'], function() {
  console.log('Gulp Log, Concat'.magenta)
  return gulp.src(['dist/lib.min.js', 'dist/dev.min.js'])
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(buildDir))
});


// styles
gulp.task('styles', function() {
  console.log('Gulp Log, Styles'.magenta)
  return gulp.src('./src/styles/main.styl')
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(buildDir));
})

// views
gulp.task('views', function() {
  console.log('Gulp Log, Views'.magenta)
  return gulp.src('src/views/**/*.html', { base: './src' })
    .pipe(gulp.dest(buildDir));
});

// watch files
function watch() {
  console.log('Gulp Log, Watch'.magenta)
  gulp.watch('src/scripts/**/*.js', ['devJS', 'concat'])
  gulp.watch('src/styles/**/*.styl', ['styles'])
  gulp.watch('src/views/**/*.html', ['views'])
}

// server
gulp.task('server', ['concat'], () => {
  nodemon({
      script: 'server/app',
      ext: 'js',
      ignore: ['node_modules/**/*', 'dist/**/*', 'src/**/*']
    })
    .on('start', () => {
      console.log('\nGulp Log, Starting Server'.green)
      watch()
    })
    .on('restart', () => {
      console.log('\nGulp Log, Restarting Server'.green)
    })
})
