// inspired by: http://viget.com/extend/gulp-browserify-starter-faq

var requireDir = require('require-dir');

// grab all tasks
requireDir('./tasks', { recurse: true });

// grab all runners
requireDir('./runners', { recurse: true });


