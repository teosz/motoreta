var fs = require('fs')
var gulp = require('gulp')
var gutil = require('gulp-util')
var Handlebars = require('handlebars')

var env = function(name, defaultValue) {
  var value = process.env[name]
  if(value) { return value }
  if(defaultValue !== undefined) { return defaultValue }
  throw(new Error("Missing " + name + " env variable"))
}

var serve = function() {
  var express = require('express')
  var app = express()
  app.use(express.static('www'))
  var server = app.listen(+(env('PORT', 3000)), function () {
    var addr = server.address()
    console.log('Listening at http://%s:%s', addr.address, addr.port)
  })
}

gulp.task('bundle', function(callback) {
  var webpack = require('webpack')
  var verbose = !! env('BUILD_VERBOSE', false)

  webpack({
    entry: './src/main.jsx',
    devtool: '#inline-source-map',
    output: {
      path: __dirname + '/www',
      filename: 'app.js',
    },
    module: {
      loaders: [
        {test: /\.jsx$/, loader: 'babel'},
        {test: /\.scss$/, loader: 'style!css!sass'},
      ],
    },
  }, webpackDone)

  function webpackDone(err, stats) {
    if(err) { throw new gutil.PluginError("webpack", err) }
    var errors = stats.compilation.errors.length > 0
    if(verbose || errors) { console.log(stats.toString({colors: true})) }
    callback()
  }
})

gulp.task('build', ['bundle'], function() {
  var template = function(name) {
    return Handlebars.compile(fs.readFileSync(name, {encoding: 'utf-8'}))
  }
  var index_html = template('src/index.html')({
    t: (new Date()).getTime(),
  })
  fs.writeFileSync('www/index.html', index_html)
})

gulp.task('devel', ['build'], function() {
  gulp.watch('src/*', ['build'])
  serve()
})
