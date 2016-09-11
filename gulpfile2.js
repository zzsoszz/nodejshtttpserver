var gulp         = require('gulp');
var rev = require('gulp-rev');

gulp.task('css', function () {
    return gulp.src('src/css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/css' ) );
});

gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(rev())
        .pipe(gulp.dest('dist/js/**/*.js'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/js' ) );
});


var revCollector = require('gulp-rev-collector');
// var minifyHTML   = require('gulp-minify-html');

gulp.task('rev', function () {
    return gulp.src(['rev/**/*.json', 'templates/**/*.html'])
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': '/dist/css',
                '/js/': '/dist/js/'
            }
        }) )
        // .pipe( minifyHTML({
        //         empty:true,
        //         spare:true
        //     }) )
        .pipe( gulp.dest('dist') );
});

gulp.task('default', ['css','scripts','rev']);