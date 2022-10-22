const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"  //откуда будет запускаться browserSync, это автоматическое обновление index.html. В этой строке прописывается корневая папка, где файл будет находится
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html')); //следит за файлами html и как только он изменится, запускается фукция html
    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('scripts'));
    gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("src/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/img/**/*").on('all', gulp.parallel('image'));
});

gulp.task('html', function() {
    return gulp.src("src/*.html") //получает html файл который изменился из папки src 
        .pipe(htmlmin({ collapseWhitespace: true })) //минимизирует его, удаляя все пробелы
        .pipe(gulp.dest('dist/')); // готовый файл выкладывает в папку dist/
});

gulp.task('scripts', function() {
    return gulp.src("src/js/**/*.js") //получает все файлы из папки src js 
        .pipe(gulp.dest('dist/js')) // копирует эти файлы в папку dist/js
        .pipe(browserSync.stream()); //Перегружает страничку
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*.*") //получает все файлы из папки  src
        .pipe(gulp.dest('dist/fonts')) // копирует эти файлы в папку dist
        .pipe(browserSync.stream());
});

gulp.task('icons', function() {
    return gulp.src("src/icons/**/*.*") //получает все файлы из папки  src
        .pipe(gulp.dest('dist/icons')) // копирует эти файлы в папку dist
        .pipe(browserSync.stream());
});

gulp.task('image', function() {
    return gulp.src("src/img/**/*.*") //получает все файлы из папки  src
        .pipe(imagemin()) //сжимаем картинки
        .pipe(gulp.dest('dist/img')) // копирует эти файлы в папку dist
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'image', 'icons', 'fonts', 'scripts', 'html')); // прописываем, что при запуске gulp запускаются параллельные задачи