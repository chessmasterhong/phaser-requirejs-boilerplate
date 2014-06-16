## Installation

### Prerequisites

* [Node.js](http://nodejs.org)

### Setup environment

#### Automated setup

Clone the repository and run either `build-dev.bat` or `build-dist.bat`.

#### Manual setup

Install [Bower](http://bower.io) and [Gulp.js](http://gulpjs.com) globally.

```
npm install -g bower gulp
```

Clone repository and install project dependencies.

```
git clone _____
cd /path/to/repo

npm install
bower install
```

*Either automated or manual setup will install the project dependencies (Node
and Bower packages to `node_modules/` and `bower_components/`, respectively) in
the project root directory.*
