import gulp from 'gulp';
import startServer from './src';

gulp.task('default', console.log('hello!'));

gulp.task('server', async () => {
    const server = await startServer();
    server.listen(process.env.PORT || 3000);
});
