"use strict"

const config = require("../config");
const gulp = require("gulp");
const typescript = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");  //Prevent gulp task from crashing
const handleErrors = require("../util/handle_errors");
const gulpif = require("gulp-if");
const shell = require("gulp-shell");

var tsProject = typescript.createProject(config.root.root + "/tsconfig.json");

gulp.task("scripts", ["ciscorConfig"], function() {
  return gulp.src([config.source.scripts, config.temp.root])
   .pipe((gulpif(!global.isProd, gulp.dest(config.build.scripts))))
   .pipe(plumber(handleErrors))
   .pipe(tsProject())
   .pipe(gulp.dest(config.build.scripts))
})