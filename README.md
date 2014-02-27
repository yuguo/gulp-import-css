gulp-import-css
===============

Import several css files into a single file, one by one, rebasing urls and inlining @import

## Install

Install with [npm](https://npmjs.org/package/gulp-import-css).

```
npm install --save-dev gulp-import-css
```

## Examples

```js
var gulp = require('gulp');
var importCss = require('gulp-import-css');

gulp.task('default', function () {
  gulp.src('assets/**/*.css')
    .pipe(importCss())
    .pipe(gulp.dest('dist/'));
});
```

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ yuguo

