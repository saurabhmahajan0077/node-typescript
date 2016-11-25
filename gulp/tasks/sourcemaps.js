"use strict"

const config = require("../config");
const gulp = require("gulp");
const typescript = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");  //Prevent gulp task from crashing
const handleErrors = require("../util/handle_errors");
const gulpif = require("gulp-if");

gulp.task("sourcemaps", function() {
  return gulp.src([config.source.scripts])
   .pipe(plumber(handleErrors))
   .pipe(gulpif(!global.isProd, sourcemaps.init()))
   .pipe(typescript({}))
   .pipe(gulpif(!global.isProd, sourcemaps.write(".")))
   .pipe(gulp.dest(config.build.scripts))
})