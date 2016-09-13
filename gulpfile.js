var gulp         = require('gulp');
var rev = require('gulp-rev');
var gulpSequence = require('gulp-sequence')
var revCollector = require('gulp-rev-collector');
var minifyHTML   = require('gulp-minify-html');


gulp.task('css', function () {
    return gulp.src(['src/css/*.css'])
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/css' ) );
});

gulp.task('scripts', function () {
    return gulp.src(['src/js/**/*.js','src/js/**/*.html','src/js/**/*.css'])
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/js' ) );
});


gulp.task('rev', function () {
    return gulp.src(['rev/**/*.json', 'src/*.html'])
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': '/dist/css/',
                'js/': '/dist/js/',
                'cdn/': function(manifest_value) {
                	console.log(manifest_value);
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                }
            }
        }) )
        // .pipe( minifyHTML({
        //         empty:true,
        //         spare:true
        //     }) )
        .pipe( gulp.dest('dist') );
});

gulp.task('rev2', function () {
    return gulp.src(['rev/**/*.json', 'dist/js/**/plugin*.js'])
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': 'css/',
                'js/bower_components': 'js/',
                'cdn/': function(manifest_value) {
                	console.log(manifest_value);
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                }
            }
        }) )
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', gulpSequence('css','scripts','rev','rev2'));