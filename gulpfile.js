const gulp = require('gulp');
const zip = require('gulp-zip');
const del = require('del');
const ts = require('gulp-typescript');

gulp.task('clean', function() {
	return del(['./dist/**', './github-stars.user.js']);
});


gulp.task('typescript', function() {
	return gulp.src('./src/github-stars.user.ts')
		.pipe(ts({
			target: 'ES2015',
			module: 'none',
			lib: ['ES2019', 'DOM'],
			removeComments: false
		}))
		.pipe(gulp.dest('./'));
});


gulp.task('copy', function() {
	return gulp.src(['./favicon.png', './manifest.json', 'github-stars.user.js'])
		.pipe(gulp.dest('./dist'));
});


gulp.task('zip', function() {
	return gulp.src('./dist/**')
		.pipe(zip('github-stars.zip'))
		.pipe(gulp.dest('./dist'));
});


gulp.task('watch', function() {
	return gulp.watch('src/**/*.ts', gulp.series('typescript'));
})


gulp.task('default', gulp.series('clean', 'typescript', 'copy', 'zip'));
