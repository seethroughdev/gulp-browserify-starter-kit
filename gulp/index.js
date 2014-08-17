// inspired by: http://viget.com/extend/gulp-browserify-starter-faq
// if you haven't, you should go read up on it

var requireDir = require('require-dir');

// grab all tasks
requireDir('./tasks', { recurse: true });

// grab all runners
requireDir('./runners', { recurse: true });


