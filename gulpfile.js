const gulp = require('gulp');
const zip = require('gulp-zip');
const del = require('del');
const nodemon = require('gulp-nodemon');

gulp.task('clean', function() {
	return del(['./dist/**']);
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


gulp.task('watch', function(done) {
	nodemon({
		script: 'github-stars.user.js',
		ext: 'js json',
		env: { NODE_ENV: 'development' },
		tasks: ['default'],
		done
	})
  })


gulp.task('default', gulp.series('clean', 'copy', 'zip'));
