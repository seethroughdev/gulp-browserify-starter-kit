This is my starter template for prototyping and static projects.

It includes:

- [Gulp](http://gulpjs.com/) | Build System
- [BrowserSync](http://www.browsersync.io/) | Development Server
- [Browserify](http://browserify.org/) | Javascript
- [Sass](http://sass-lang.com/) | CSS
- [Jade](http://jade-lang.com/) | HTML
- [Mocha](http://mochajs.org/) | Testing

It also compresses images and builds custom icon-fonts.

Feel free to change, edit, remove or add to your build.  This is only a starting
point.  I tried to make it as modular and non-opionated as possible.  But I'm
sure there are places I could have done better.

***********************


## Installation

Assuming you already have [Node](http://nodejs.org/) and [Gulp](http://gulpjs.com/) installed.  Just clone the repo and run

```npm install && bower install```.

Afterwards you will have a completely modular Gulp build system.  This structure
was heavily inspired by: [this article](http://viget.com/extend/gulp-browserify-starter-faq).
I can't recommend it enough.


***********************


## Usage

There are several tasks you can run to manage your build.  To run all the tasks,
watch files and start a server:

```gulp serve```

The other tasks are in ```gulp/runners/```, including:


##### Default

- Runs all tasks but doesn't start local server

##### Clean

- Deletes the ```dist/``` folder.

##### Deploy

- Runs Clean and Default, then will push branch to gh-pages.

##### Test

- Runs all unit and functional tests in **tests/** folder.

##### Alt. Testing Setup

- If you prefer to have your tests running in a separate window, you can run
```gulp serve:notest``` in your main terminal window, and ```gulp test:watch``` 
in a separate window to get the same effect.


*********************


Here's some details about the build:


## Browserify

Browserify is configured to run on ```index.js```.

It also exposes a global called **shared** in standalone mode.  You can easily remove this
in the browserifyOpts obj.  But I've found it handy.  All configuration for this
task can be found in ```gulp/tasks/js.js```.

The task will compile a bundle.js and bundle.min.js file in your ```dist/js/``` folder.

- *TODO:  Consider switching compression to a node-env dependency instead.*
- *TODO:  Consider whether its better to open up src to multiple browserify builds.*


## Other JS

This build does a couple other things with javascript.

##### Modernizr

Includes a separate sub-task for modernizr so you can load it in the head,
from bower.  It will compress the file.  Feel free to replace this with a custom
build if you choose.

##### Vendor

Will compile a separate vendor folder from any files in the included
js/vendor/folder.

##### JS Hint

Will run all javascript through jshint.  It uses the pretty reporter.  And
will not break on fail.  All these are options in the **js:hint** task.

*TODO: Considering switching to my preferred linter: eslint.*

##### Uglify

All javascript is compressed with **Uglify**.  I am anticipating big improvements
for source maps with Gulp 4.x so I'm prepared for this step to change a bit.


## CSS

All CSS is run through the RubySass module.  If you're interested in my current
default CSS layout, check out [https://github.com/seethroughtrees/styles-seed](https://github.com/seethroughtrees/styles-seed).
You can pretty much copy it right in.

All CSS is compiled to ```dist/css/main.css```.  However, it will compile any top-level
scss file, so you can have several if you want.

##### Compression

Compression is handled by **gulp-csso**.  I love the way they approach compression.

##### Autoprefixer

Nothing better than [Autoprefixer](https://github.com/ai/autoprefixer).
I don't plan to ever write CSS without it again.


## HTML

All HTML is currently handled with *Jade*.  Another thing that should easy to switch
out, and depending if anyone uses this repo, something I might consider doing myself.

But I do find prototyping with Jade is the most pleasant experience of all of them.

This build uses a pretty common structure and something I've been using on all
of my prototyping projects.


## Images

Images are compressed with *imagemin* and put into their respective folders.

##### Icon-Font Generation

I have configured a scss file for icon-fonts.  To use it, just add any svg file
to the ```img/icons/``` folder and it will recompile the font to ```dist/fonts/```.

Font configuration is handled in the ```lib/_vars.scss``` file.

It uses a template in the ```app/scss/templates``` folder.  That file should only
be edited if you know exactly what you want from it.

That template generates an SCSS file ```app/scss/modules/_font-icons.scss```.  This
file is generated and should not be edited.


## Testing

Testing includes 2 sub-tasks:  unit and functional.  Both are run by *mocha*
and *chai*.  Only one is in node and one is in the browser.  They are split in the
test folder respectively.

For sanity, both suites run on ```gulp serve``` and ```gulp test```.  However, only
```test:unit``` runs on watch.

You can also run ```gulp test``` to run all tests.
