const fontBlast = require('font-blast');
const fs = require('fs');
const gulp = require('gulp');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const directoryMap = require("gulp-directory-map");
const data = require('gulp-data');

runSequence.options.ignoreUndefinedTasks = true;

gulp.task('clean', () => {
    return gulp.src('./dist', {
            read: false
        })
        .pipe(clean());
});

gulp.task('font-blast', (cb) => {
    fontBlast(
        `./node_modules/font-awesome/fonts/fontawesome-webfont.svg`,
        `./dist/fa-icons`);
    setTimeout(() => {
        cb();
    }, 8000);
})

gulp.task('icons-dir-map', () => {
    return gulp.src(`./dist/fa-icons/svg/*.svg`)
        .pipe(directoryMap({
            filename: 'fa-icons-list.json'
        }))
        .pipe(gulp.dest(`./dist/dir-map`));
});

gulp.task('gen-template-string', (cb) => {
    return gulp.src(`./dist/dir-map/fa-icons-list.json`)
        .pipe(data(function (file) {
            return require('./examples/' + path.basename(file.path) + '.json');
        }))
        .pipe(swig())
        .pipe(gulp.dest('build'));

    // let fileContent = fs.readFileSync(config.src.iconsList, "utf8");
    // return gulp.src(dirs.src + '/templates/*.html')
    //     .pipe()
    //     .pipe(gulp.dest('destination/path'));
});

const testFn = () => {
    console.log('JEY');
}

gulp.task('default', runSequence(
    'clean',
    testFn,
    'font-blast',
    'icons-dir-map'
    // 'gen-template-string'
));
