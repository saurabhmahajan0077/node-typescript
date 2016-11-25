"use strict"

const _ = require("lodash")
const config = require("../config")
const gulp = require("gulp")
const rename = require("gulp-rename")

gulp.task("ciscorConfig", function() {
  return gulp.src(config.config.root + "/" + _.snakeCase(global.environment) + ".ts")
    .pipe(rename("config.ts"))
    .pipe(gulp.dest(config.source.config))
})
