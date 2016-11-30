const gulp      = require("gulp");
const uglify    = require("gulp-uglify");
const rename    = require("gulp-rename");

gulp.task("minify", function() {
    return gulp.src("postfx.js")
        .pipe(uglify())
        .pipe(rename({ "suffix": ".min" }))
        .pipe(gulp.dest("."));
});