const gulp = require('gulp');
const zip = require('gulp-zip');
const del = require('del');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

gulp.task('clean', function() {
	return del(['./dist/**', './github-stars.user.js']);
});


gulp.task('typescript', async function() {
	const { stdout, stderr } = await execAsync('npx rollup -c');
	if (stdout) console.log(stdout);
	if (stderr) console.error(stderr);
});


gulp.task('copy', function() {
	return gulp.src(['./favicon.png', './manifest.json', 'github-stars.user.js', 'background.js'])
		.pipe(gulp.dest('./dist'));
});


gulp.task('zip', function() {
	return gulp.src('./dist/**')
		.pipe(zip('github-stars.zip'))
		.pipe(gulp.dest('./dist'));
});


gulp.task('watch', gulp.series('typescript', function() {
	return gulp.watch('src/**/*.ts', gulp.series('typescript'));
}))


gulp.task('default', gulp.series('clean', 'typescript', 'copy', 'zip'));
