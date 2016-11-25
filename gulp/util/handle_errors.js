"use strict"

const notify = require("gulp-notify")
const gutil = require("gulp-util")

module.exports = function(error) {

  if (global.isProd) {
    gutil.log(error)
    process.exit(1)
    return
  }

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  })(error)

  // Keep gulp from hanging on this task
  this.emit("end")
}
