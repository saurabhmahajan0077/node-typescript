"use strict"

const config = require("../config")
const gulp = require("gulp")
const todo = require("gulp-todo")

gulp.task("todo", function() {

  return gulp.src([config.source.scripts])
    .pipe(todo({ verbose: true }))
})
