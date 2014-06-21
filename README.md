# Phaser + RequireJS Boilerplate

## Installation

### Prerequisites

* [Node.js](http://nodejs.org) with npm
* An internet connection

### Setup environment

Clone the repository and navigate to the newly cloned repository root directory.

```
git clone _____
cd phaser-requirejs-boilerplate
```

In the same directory, install the project dependencies.

```
npm install && node node_modules/bower/bin/bower install
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

