const pkg = require('./package.json');
const fontBlast = require('font-blast');
const fs = require('fs');
const gulp = require('gulp');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const fc2json = require('gulp-file-contents-to-json');
const tmp = require('tmp');
const download = require("gulp-download");
const jsYaml = require('js-yaml');

const faVersion = "v4.7.0";

runSequence.options.ignoreUndefinedTasks = true;

gulp.task('_clean', () => {
    return gulp.src([
            './dist',
            './src/fa-icons'
        ], {
            read: false
        })
        .pipe(clean());
});

gulp.task('_yml', () => {

    return download('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/' + faVersion + '/src/icons.yml')
        .pipe(gulp.dest("./src/fa-icons/yml"));
});

gulp.task('_font-blast', (cb) => {
    // console.log(res);    
    const iconNamingConventions = jsYaml
        .safeLoad(fs.readFileSync('./src/fa-icons/yml/icons.yml', 'utf8'))
        .icons;
    let convertFilenames = {};
    iconNamingConventions.forEach(function (icon) {
        convertFilenames[icon.unicode] = icon.id;
    });
    tmp.tmpName((err, path) => {
        fontBlast(`./node_modules/font-awesome/fonts/fontawesome-webfont.svg`, `./src/fa-icons`, {
            filenames: convertFilenames,
        });
    });

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

gulp.task('default', runSequence(['_clean'], ['_yml'], ['_font-blast'], ['_blob'], ['_module']));

gulp.task('build', ['default']);
