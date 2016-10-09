var should = require('should');
var less = require('../');
var gutil = require('gulp-util');
var fs = require('fs');
var pj = require('path').join;

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
      var lessFile = createVinyl('home.css');

      var stream = less();
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
      stream.write(lessFile);
      stream.end();
    });

  });
});
