This is my starter template for prototyping and static projects.

It includes:

- [Gulp](http://gulpjs.com/) | Build System
- [BrowserSync](http://www.browsersync.io/) | Development Server
- [Browserify](http://browserify.org/) | Javascript
- [Sass](http://sass-lang.com/) | CSS
- [Jade](http://jade-lang.com/) | HTML
- [Mocha](http://visionmedia.github.io/mocha/) | Testing

It also compresses images and builds custom icon-fonts.


### Installation

To install just clone the repo and run

```npm install && bower install```.

Afterwards you have a completely modular Gulp build system.


### Usage

There are several tasks you can run to manage your build.

To run all the tasks, watch files and start a server:

```gulp serve```

The other tasks are in gulp/runners, including:

```clean, test, default and deploy```


### Details


#### Browserify

Browserify is configured to run on ```index.js```.  I am debating whether to
modify the process to run on all top-level js files for multiple builds.

It also exposes a single global called **shared**.  You can easily remove this
in the browserifyOpts obj.  But I've found it handy.

It will compile a bundle.js and bundle.min.js file in your dist/js/ folders.

TODO:  Switch this to a node-env dependency instead.


#### Other JS

This build does a couple other things with javascript.

##### Modernizr

It includes a separate sub-task for modernizr so you can load it in the head,
from bower.  It will compress the file.  Feel free to replace this with a custom
build if you choose.

##### Vendor

It will compile a separate vendor folder from any files in the included
js/vendor/folder.

##### JS Hint

It will run all javascript through jshint.  It uses the pretty reporter.  And
will not break on fail.  All these are options in the **js:hint** task.


#### Testing

Testing includes 2 sub-tasks:  unit and functional.  Both are run by mocha
and chai.  Only one is in node and one is in the browser.  And are split in the
test folder respectively.

For sanity, both suites run on **gulp serve** and **gulp test**.  However, only
**test:unit** runs on watch.
