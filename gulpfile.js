const gulp = require('gulp');
const zip = require('gulp-zip');
const del = require('del');


gulp.task('clean', function() {
	return del(['./dist/**']);
});


gulp.task('copy', function() {
	return gulp.src(['./media/favicon.png', './manifest.json', 'github-stars.user.js'])
		.pipe(gulp.dest('./dist'));
});


gulp.task('zip', function () {
	return gulp.src('./dist/**')
		.pipe(zip('github-stars.zip'))
		.pipe(gulp.dest('./dist'));
});


gulp.task('default', gulp.series('clean', 'copy', 'zip'));
