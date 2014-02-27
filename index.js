'use strict';
var gutil = require('gulp-util'),
  path = require('path'),
  fs = require('fs'),
  rework = require('rework'),
  reworkImporter = require('rework-importer'),
  through = require('through2');

// Consts
const PLUGIN_NAME = 'gulp-import-css';

module.exports = function() {
  
  return through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return cb();
    }


    try {
      var processedCss = rework(String(file.contents), 'utf-8')
        .use(reworkImporter({
          path: file.path,
          base: file.base
        }))
        .use(rework.url(function(url){
          if(isUrl(url)) {
            return url;
          }
          var resourceAbsUrl = path.relative(file.base, path.resolve(path.dirname(file.path), url));
          return path.relative(destDir, resourceAbsUrl);
        }))
        .toString();
    } catch(err) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
      return cb();
    }

    file.contents = new Buffer(processedCss);
    this.push(file);
    cb();
  });
};

function isUrl(url) {
  return (/^[\w]+:\/\/./).test(url);
}


