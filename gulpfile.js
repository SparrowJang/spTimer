var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  pack = require('./package.json'),
  port = 9191;

gulp.task('server', [], function () {
  plugins.connect.server({
    root: ['bower_components', '.tmp', 'src'],
    port: port,
    livereload: true
  });
  plugins.bower()
         .on('end',function(){
           require('opn')('http://localhost:' + port + '/')
  });
});

gulp.task('build', function(){
  gulp.src('src/*.js')
    .pipe(plugins.uglify())
    .pipe(plugins.header('//author: <%= author %>\n//verion: <%= version %>\n',{author:pack.author,version:pack.version}))
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['build']);

