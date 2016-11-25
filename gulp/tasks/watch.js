"use strict"

const gulp = require("gulp")
const config = require("../config")
const gulpif = require("gulp-if");
const nodemon = require("gulp-nodemon");

// Builds the app, runs a development server and watches the files for changes.
gulp.task("watch", ["build"], function() {
  // Watch the files for changes.
  gulp.watch(config.source.scripts, {}, ["scripts"])

  // Start up the node server
    nodemon({
      script: "build/app.js",
      ext: "js",
      env: { "NODE_ENV": "development" },
      verbose: false,
      watch: [config.build.scripts],
      nodeArgs: global.isDebug ? ["--debug"] : []
    })
    .on("restart", function () {
        console.log("restarted!")
    });
})
