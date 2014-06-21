# Phaser + RequireJS Boilerplate

A boilerplate and build system for [Phaser](http://phaser.io).


## Installation

### Prerequisites

* [Node.js](http://nodejs.org) with npm
* An internet connection

### Setup environment

1. Clone/Download the repository.

2. Navigate into your local copy of the repository's root directory.

```
cd phaser-requirejs-boilerplate
```

3. Install the project dependencies.

```
npm install && node node_modules/bower/bin/bower install
```

4. Done!


## Usage

### Development

Project development takes place in the `src/` directory. Run `build-dev.bat` or
type the command `gulp` to start a web server, serve the contents in the `src/`
directory. Any modifications within the directory will refresh any browsers
currently viewing the web page.

### Build / Distribution

Building the project from source creates a new `build/` directory where the
output files are placed. This directory will be recreated for each new build, so
do not put anything you care about in there. Run `build-dist.bat` or type the
command `gulp build` to build the project from source.

For users running from the script files: If the build seems to freeze during the
`scripts` task, do not interrupt it; it is still performing its operations. Only
do so when you see `End of build.` printed.


## Workflow

```
                 ┌──> connect ──┐
gulp (default) ──┤              ├──> done
                 └──> watch ────┘
                       │ ^
                       │ └────────────────────────────────────────┐
                       │  ┌──> (scripts) ──> lint ──┐             │
                       │  │                         │             │
                       │  ├──> (media) ─────────────┤             │
                       └──┤                         ├──> reload ──┘
                          ├──> (html) ──────────────┤
                          │                         │
                          └──> (styles) ────────────┘
```

```
                       ┌──> (scripts) ──> lint ──> concat/minify/uglify ──> output ──┐
                       │                                                             │
                       │              ┌──> (images) ──> minify ──┐                   │
                       ├──> (media) ──┤                          ├──> output ────────┤
gulp build ──> clean ──┤              └──> (non─images) ─────────┘                   ├──> done
                       │                                                             │
                       ├──> (html) ──> process ──> output ───────────────────────────┤
                       │                                                             │
                       └──> (styles) ──> output ─────────────────────────────────────┘
```


## Project directory structure

After setting up the environment, you will see a similar directory structure to
the one below. If some directories does not exist yet, do not worry; they will
be automatically created when necessary (you can still create them yourself if
you want).

```
├── build/  ........................  Build output files
├── node_modules/  .................  Locally installed Node packages
├── src/  ..........................  Project source code
│   ├── media/  ....................  Media files (images, sound, etc.)
│   ├── scripts/  ..................  Scripts
│   │   ├── bower_components/  .....  Installed Bower packages
│   │   ├── game/  .................  Game-specific code
│   │   │   ├── levels/  ...........  Game levels
│   │   │   └── states/  ...........  Game states
│   │   └── main.js  ...............  Entry file that creates game instance and pulls all other modules
│   ├── styles/  ...................  Style sheets
│   └── index.html  ................  Web page that contains the game
├── tasks/  ........................  Additional task resources to use during build
│   ├── _end.js  ...................  Append file contents to build layer
│   └── _start.js  .................  Prepend file contents to build layer
├── .bowerrc  ......................  Bower configuration (tells Bower where to install Bower packages)
├── .jshintrc  .....................  JSHint configuration (linting configuration)
├── bower.json  ....................  Project metadata (Bower) and build dependencies
├── build-dev.bat  .................  Script file (Windows) for development
├── build-dist.bat  ................  Script file (Windows) to build project
├── gulpfile.js  ...................  Gulp tasks
├── package.json  ..................  Project metadata (npm) and development dependencies
└── README.md  .....................  This file
```


## Based on

* [Require.js Library Skeleton](https://github.com/sahat/requirejs-library)
* [Phaser-RequireJS](https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/RequireJS)
* [generator-phaser](https://github.com/julien/generator-phaser)
* [Phaser JS Boilerplate](https://github.com/luizbills/phaser-boilerplate)

