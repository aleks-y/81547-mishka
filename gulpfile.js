"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var del = require("del");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var uglify = require('gulp-uglify');
var server = require("browser-sync").create();
var run = require("run-sequence");

gulp.task("clean", function() {
  return del("build");
});

gulp.task("clean-icons", function() {
  return del("build/img/icons");
});

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*{.woff,.woff2}",
    "img/**/*{.jpg,.png,.svg}",
    "js/**/*.js",
    "*.html"
    ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task("copyhtml", function() {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("style", function() {
  gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function() {
  return gulp.src("img/icons/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("serve", function() {
  server.init({
    server: "build",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("*.html", ["copyhtml"]);
  gulp.watch("build/*.html").on("change", server.reload);
});

gulp.task("build", function(fn) {
  run(
      "clean",
      "copy",
      "clean-icons",
      "style",
      "images",
      "symbols",
      fn
  );
});
