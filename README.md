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
├── bower_components/
├── build/
├── docs/
|   ├── dev/
|   └── user/
├── node_modules/
├── notes/
|   └── resources.md
├── site/
|   ├── scripts/
|   ├── styles/
|   ├── index.html
|   └── index-dev.html
├── src/
|   ├── game/
|   ├── lib/
|   ├── _end.js
|   ├── _start.js
|   └── game.js
├── bower.json
├── build-dev.bat
├── build-dist.bat
├── gulpfile.js
├── package.json
└── README.md
```


## Additional notes

[Resources](notes/resources.md)
