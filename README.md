# babel-plugin-transform-bower-module

Bower Module Path Resolver

## Example

project a structure, will be depended by other project

```
project-a
    |- src
        |- main.js
    |- bower.json
```

config project a export module with main file in bower.json

```json
{
    "name": "project-a",
    "main": "src/main.js"
}
```

use project-a in project-b

```
project-b
    |- src
        |- b.js
    |- .bowerrc
    |- bower.json
```

you can change bower module directory in .bowerrc file, default is "./bower_components/"

```json
{
    "directory": "./lib/"
}
```

config project b dependency in bower.json

```json
{
    "name": "project-b",
    "dependencies": {
        "project-a": "*"
    }
}
```

use project-a module in b.js for project-b

```javascript
import { ModuleA1, ModuleA2 } from "project-a";

// TODO something
```

## Installation

```
$ npm install babel-plugin-transform-bower-module
```

## Usage

### Via .babelrc (Recommended)

.babelrc

```
{
  "plugins": ["transform-bower-module"]
}
```

### Via CLI

```
$ babel --plugins transform-bower-module script.js
```

### Via Node API

```
require("babel-core").transform("code", {
    plugins: ["transform-bower-module"]
});
```