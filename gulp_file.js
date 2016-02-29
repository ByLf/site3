var gulp = require('gulp'),
    jade = require('gulp-jade'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    autoPref = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    NodeSass = require('node-sass'),
    unCss = require('gulp-uncss'),
    htmlmin = require('gulp-htmlmin'),
    polifill = require('gulp-autopolyfiller'),
    plumber = require('gulp-plumber'),
    compass = require('gulp-compass');

var link = {
    styleCss: './css',
    styleScss: './scss/*.scss',
    docHtml: './html_doc',
    docJade: './jade/*.jade',
    js: './js/*.js',
    dist: './production';
}

//включение слежки за событиями
function _start() {
    gulp.watch(link.styleScss);
    gulp.watch(link.docJade, _jade);
    gulp.src( link.styleCss + '/*.css' )
        .pipe( autoprefixer({
        browsers: [ ' last 4 versions ' ],
        cascade: false
    }))
        .pipe( gulp.dest( link.js ) );
}
function _jade() {
    gulp.src(link.docJade)
        .pipe(plumber())
        .pipe(jade({
            client: true
            }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(link.docHtml));
}
function _scss() {
    gulp.src(link.styleScss)
        .pipe( sass({outputStyle: ' compressed ' }) )
        .pipe(gulp.dest(link.styleCss));
}
//сжатие файлов
function _compress() {
    gulp.src( link.styleCss + '/*.css' )
        .pipe( concatCss( ' minStyle.css ' ) )
        .pipe( unCss({ html:[link.docHtml + '/*.html']}))
        .pipe( minifyCss() )
        .pipe( gulp.dest( link.dist + '/css' ) );
    gulp.src( link.js )
        .pipe( uglify() )
        .pipe(gulp.dest( link.dist + '/js' ));
    gulp.src( link.docHtml + '/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(link.dist + '/html'))
}

gulp.task('compass', function() {
  gulp.src(link.styleScss)
    .pipe(compass({
      config_file: './config.rb',
      css: 'stylesheets',
      sass: 'scss'
    }))
    .pipe(gulp.dest(link.styleCss));
});
gulp.task('polifill', function () {
    return gulp.src(link.js)
        .pipe(polyfill('result_polyfill.js'))
        .pipe(gulp.dest(link.js));
});
gulp.task('default', _start);
