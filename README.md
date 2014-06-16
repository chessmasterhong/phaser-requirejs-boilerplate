## Installation

### Prerequisites

* [Node.js](http://nodejs.org)

### Setup environment

Clone the repository and navigate to the newly cloned repository root directory.

```
git clone _____
cd /path/to/repo
```

In the same directory, install project dependencies.

```
npm install && node node_modules/bower/bin/bower install
```

*Either automated or manual setup will install the necessary dependencies (Node
and Bower packages to `node_modules/` and `bower_components/`, respectively) in
the project root directory.*


## Project directory structure

After setting up the environment, you will see a similar directory structure to
the one below. If some directories does not exist yet, do not worry; they will
be automatically created when necessary (you can still create them yourself if
you want).

```
./
├── bower_components/  .....  Installed Bower packages
├── build/  ................  Minified build output files
├── docs/  .................  Documentations
│   ├── dev/  ..............  Developer documentations
│   └── user/  .............  User documentations
├── node_modules/  .........  Locally installed Node packages
├── notes/  ................  Project/Personal notes
│   └── resources.md  ......  Resources and links not worth cluttering the README
├── site/  .................  Site-specific contents
│   ├── scripts/  ..........  Site-specific scripts (non-project related)
│   ├── styles/  ...........  Style sheets
│   ├── index.html  ........  Main page for loading files from distribution build
│   └── index-dev.html  ....  Main page for loading files from development build
├── src/  ..................  Project source code; this is where most of the development occurs
│   ├── game/  .............  Project-specific code
│   ├── lib/  ..............  External JavaScript libraries and snippets
│   ├── _end.js  ...........  Append file contents to build layer
│   ├── _start.js  .........  Prepend file contents to build layer
│   └── game.js  ...........  Entry file that pulls all other modules
├── bower.json  ............  Project metadata (Bower) and project dependencies
├── build-dev.bat  .........  Script file (Windows) to build project for development
├── build-dist.bat  ........  Script file (Windows) to build project for distribution
├── gulpfile.js  ...........  Gulp tasks
├── package.json  ..........  Project metadata (npm) and build dependencies
└── README.md  .............  This file?
```


## Additional notes

[Resources](notes/resources.md)
