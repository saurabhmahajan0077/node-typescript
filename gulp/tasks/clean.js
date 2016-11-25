"use strict"

const config = require("../config")
const gulp = require("gulp")
const del = require("del")
const gutil = require("gulp-util")

gulp.task("clean", function(callback) {
  del([config.build.scripts, config.temp.root]).then(function(paths) {
    paths.forEach(function(path) {
      gutil.log("Deleted: " + path)
    })
    callback()
  })
})
