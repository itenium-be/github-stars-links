const gulp = require('gulp');
const zip = require('gulp-zip');
const del = require('del');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

gulp.task('clean', function() {
	return del(['./dist/**']);
});


gulp.task('typescript', async function() {
	const { stdout, stderr } = await execAsync('npx rollup -c');
	if (stdout) console.log(stdout);
	if (stderr) console.error(stderr);
});


gulp.task('copy', function() {
	gulp.src(['./favicon.png', './manifest.json', 'background.js'])
		.pipe(gulp.dest('./dist'));

	gulp.src(['./src/options/options.html', './src/options/options.css'])
		.pipe(gulp.dest('./dist'));

	gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
		.pipe(gulp.dest('./dist'));

	return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
		.pipe(gulp.dest('./dist'));
});


gulp.task('zip', function() {
	return gulp.src('./dist/**')
		.pipe(zip('starify-links.zip'))
		.pipe(gulp.dest('./dist'));
});


gulp.task('watch', gulp.series('typescript', 'copy', function() {
	return gulp.watch('src/**/*.*', gulp.series('typescript', 'copy'));
}))


gulp.task('default', gulp.series('clean', 'typescript', 'copy', 'zip'));
