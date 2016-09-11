var gulp = require('gulp');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var gulpSequence = require('gulp-sequence')

gulp.task('task1', function () {
    return gulp.src(['assets/css/*.css', 'assets/js/**/*.js'], {base: 'assets'})
        .pipe(gulp.dest('dist'))  // copy original assets to build dir
        .pipe(rev())
        .pipe(gulp.dest('dist'))  // write rev'd assets to build dir
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist'))
        ; // write manifest to build dir
});
gulp.task('task2', function () {
    return 
         gulp.src(['dist/*.json','dist/*.html', {base: 'dist'}])
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': '/dist/css',
                '/js/': '/dist/js/',
                'cdn/': function(manifest_value) {
                	console.log(manifest_value);
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                }
            }
        }))
		.pipe( gulp.dest('dist') );
        ;
});
gulp.task('default', gulpSequence(['task2']));