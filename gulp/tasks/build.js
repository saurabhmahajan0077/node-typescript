"use strict"

const gulp = require("gulp")
const runSequence = require("run-sequence")

gulp.task("build", function(callback) {
  runSequence(
    "clean",
    "scripts",
    "sourcemaps",
    callback
  )
})
