var should = require('chai').should(),
    importCss = require('../'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    pj = require('path').join;

function createVinyl(lessFileName, contents) {
  var base = pj(__dirname, 'fixtures');
  var filePath = pj(base, lessFileName);

  return new gutil.File({
    cwd: __dirname,
    base: base,
    path: filePath,
    contents: contents || fs.readFileSync(filePath)
  });
}

describe('gulp-import-css', function () {
  describe('imporCss()', function () {

    it('should compile single css file', function (done) {
      var destFile = createVinyl('home.css');

      var stream = importCss();
      stream.once('data', function (cssFile) {
        should.exist(cssFile);
        should.exist(cssFile.path);
        should.exist(cssFile.relative);
        should.exist(cssFile.contents);
        cssFile.path.should.equal(pj(__dirname, 'fixtures', 'home.css'));
        String(cssFile.contents).should.equal(
          fs.readFileSync(pj(__dirname, 'expect/home.css'), 'utf8'));
        done();
      });
      stream.write(destFile);
      stream.end();
    });

  });
});

/**
 * todo:
 * @import url("fineprint.css") print;
 * @import url("bluish.css") projection, tv;
 * @import 'custom.css';
 * @import url("chrome://communicator/skin/");
 * @import 'http://fonts.googleapis.com/css?family=Montserrat:400,900';
 * @import "common.css" screen, projection;
 * @import url('landscape.css') screen and (orientation:landscape);
**/
