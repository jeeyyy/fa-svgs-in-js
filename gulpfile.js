const fontBlast = require('font-blast');
const fs = require('fs');
const gulp = require('gulp');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const directoryMap = require("gulp-directory-map");
const data = require('gulp-data');
const tap = require('gulp-tap');
const path = require('path');
const newfile = require('gulp-file');

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
});

gulp.task('icons-dir-map', () => {
    return gulp.src(`./dist/fa-icons/svg/*.svg`)
        .pipe(directoryMap({
            filename: 'fa-icons-list.json'
        }))
        .pipe(gulp.dest(`./dist/dir-map`));
});

gulp.task('gen', (cb) => {
    const iconList = require(`./dist/dir-map/fa-icons-list.json`);
    const iconKeys = Object.keys(iconList);
    if (iconKeys && iconKeys.length) {
        let o = {};
        iconKeys.forEach((key) => {
            const fileContent = require(`./dist/fa-icons/svg/${key}`);
            o[key] = `${fileContent}`
        })
        console.log(o);
    }


    // return gulp.src()
    //     .pipe(tap((file) => {
    //         var contents = 'hello!';
    //         return newfile('fa-svg-template-strings.js', contents)
    //             .pipe(gulp.dest('jey'));
    //     }));

    // let fileContent = fs.readFileSync(config.src.iconsList, "utf8");
    // return gulp.src(dirs.src + '/templates/*.html')
    //     .pipe()
    //     .pipe(gulp.dest('destination/path'));
});

gulp.task('default', runSequence(
    ['clean'], ['font-blast'], ['icons-dir-map'], ['gen']
));
