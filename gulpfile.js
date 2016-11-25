"use strict"

const fs = require("fs")
const gutil = require("gulp-util")

global.environment = gutil.env.environment || "development"
global.isProd = global.environment === "production"
global.isDebug = !!gutil.env.debug

fs.readdirSync("./gulp/tasks/").forEach(function(taskPath) {
  require("./gulp/tasks/" + taskPath)
})
