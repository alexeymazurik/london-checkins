var gulp = require('gulp'),
    css_files = [
      './bower_components/bootstrap/dist/css/bootstrap.min.css'
    ];

gulp.task('styles', function(){
  gulp.src(css_files)
    .pipe(gulp.dest('./public/css'));
});

gulp.task('default', ['styles']);
