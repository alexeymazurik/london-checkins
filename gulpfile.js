var gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    browserSync = require('browser-sync').create();
    vendor_css = [
      './bower_components/bootstrap/dist/css/bootstrap.css'
    ],
    vendor_js = [
      './bower_components/jquery/dist/jquery.js',
      './bower_components/bootstrap/dist/js/bootstrap.js',
    ],
    css_files = [
      './assets/css/*.css'
    ]
    font_files = [
      './bower_components/bootstrap/dist/fonts/*.*'
    ];

gulp.task('styles', function(){
  gulp.src(css_files)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('server', function(){
  browserSync.init({
    server: {
      baseDir: 'public',
      index: "index.html",
      directory: true
    }
  });

  gulp.watch("public/*.html").on('change', browserSync.reload);
  gulp.watch(css_files, ['styles']).on('change', browserSync.reload);
});

gulp.task('vendor-styles', function(){
  gulp.src(vendor_css)
    .pipe(gulp.dest('./public/css'));
});

gulp.task('vendor-scripts', function(){
  gulp.src(vendor_js)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('fonts', function(){
  gulp.src(font_files)
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('watch', function(){

});

gulp.task('clean', function(){
  return del([
    'public/js/**/*',
    'public/css/**/*',
    'public/fonts/**/*'
  ]);
});

gulp.task('default', ['clean', 'styles', 'vendor-styles', 'vendor-scripts', 'fonts']);
