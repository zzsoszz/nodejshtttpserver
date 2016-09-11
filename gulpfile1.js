var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve',  function() {
    browserSync.init({
        server: "./webapps"
    });
    gulp.watch("webapps/**/*.css,webapps/**/*.html").on('change', reload);
});
gulp.task('default', ['serve']);