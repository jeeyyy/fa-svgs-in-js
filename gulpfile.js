const pkg = require('./package.json');
const fontBlast = require('font-blast');
const fs = require('fs');
const gulp = require('gulp');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const fc2json = require('gulp-file-contents-to-json');

runSequence.options.ignoreUndefinedTasks = true;

gulp.task('_clean', () => {
    return gulp.src('./dist', {
            read: false
        })
        .pipe(clean());
});

gulp.task('_font-blast', (cb) => {
    fontBlast(`./node_modules/font-awesome/fonts/fontawesome-webfont.svg`, `./src/fa-icons`);
    setTimeout(() => {
        cb();
    }, 5000);
});

gulp.task('_blob', () => {
    gulp.src('./src/fa-icons/svg/*.svg')
        .pipe(fc2json('fa-icons-svg.json'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('_module', () => {
    gulp.src('./src/index.js')
        .pipe(gulp.dest('./dist'));
})

gulp.task('default', runSequence(['_clean'], ['_font-blast'], ['_blob'], ['_module']));

gulp.task('build', ['default']);
