import gulp from 'gulp';
import startServer from './src';

gulp.task('default', console.log('hello!'));

gulp.task('server', () => {
    startServer().listen(process.env.PORT || 3000);
});
