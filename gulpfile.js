// 引入 gulp及组件
var gulp = require('gulp'), //gulp基础库
  minifycss = require('gulp-minify-css'), //css压缩
  concat = require('gulp-concat'), //合并文件
  uglify = require('gulp-uglify'), //js压缩
  rename = require('gulp-rename'), //文件重命名
  notify = require('gulp-notify'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnext = require('cssnext'),
  precss = require('precss'),
  livereload = require('gulp-livereload'); //提示

var processors = [autoprefixer({
  remove: false, //对旧代码不删除prefixer（加快编译速度）
  browsers: ['> 1%', 'ie>=9', 'Firefox >= 20']
}), cssnext, precss];

gulp.task('default', function () {
  gulp.start('watch');
});

//css处理
//gulp.task('css', function () {
//  return gulp.src('./components/**/*.css') //设置css
//    .pipe(concat('themes.css')) //合并css文件到"order_query"
//    .pipe(gulp.dest('./assets')) //设置输出路径
//    .pipe(rename({
//      suffix: '.min'
//    })) //修改文件名
//    .pipe(minifycss()) //压缩文件
//    .pipe(gulp.dest('./assets')) //输出文件目录
//    .pipe(notify({
//      message: 'css task ok'
//    })) //提示成功
//    .pipe(livereload());
//});

//JS处理
//gulp.task('js', function () {
//  return gulp.src(['./components/**/*.js']) //选择合并的JS
//    .pipe(concat('themes.js')) //合并js
//    .pipe(gulp.dest('./assets')) //输出
//    .pipe(rename({
//      suffix: '.min'
//    })) //重命名
//    .pipe(uglify()) //压缩
//    .pipe(gulp.dest('./assets')) //输出 
//    .pipe(notify({
//      message: "js task ok"
//    })) //提示
//    .pipe(livereload());
//});

//sass处理
gulp.task('sass', function () {
  return gulp.src('./components/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(concat('theme.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets'))
    .pipe(rename({
      suffix: '.min'
    })) //修改文件名
    .pipe(minifycss()) //压缩文件
    .pipe(gulp.dest('./assets')) //输出文件目录
    .pipe(notify({
      message: 'sass task ok'
    })) //提示成功
    .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['components/**/*.scss'], ['sass']);
});
