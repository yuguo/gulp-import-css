gulp-import-css
===============

Import several css files into a single file, one by one, rebasing urls and inlining @import

## Install

Install with [npm](https://npmjs.org/package/gulp-import-css).

```
npm install --save-dev gulp-import-css
```

## Examples

In case this is `assets/reset.css`:

```css
body {margin: 0};
```

And this is `assets/home.css`:

```css
@import url('reset.css');
/* Important: can't be @import 'reset.css' */
```

This is the `Gulpfile.js`:

```js
var gulp = require('gulp');
var importCss = require('gulp-import-css');

gulp.task('default', function () {
  gulp.src('assets/*.css')
    .pipe(importCss())
    .pipe(gulp.dest('dist/'));
});
```

Now, run the command `gulp` to get the combined css file.

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ yuguo

