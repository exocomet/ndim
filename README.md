# ndim
Multidimensional matrix manipulation. Should it be called m3?


## Install

```
npm install git+https://github.com/exocomet/ndim.git
```

## Usage

```
import {Matrix} from "ndim";

let m = new Matrix(2, 5);
```

## Test

Test is done with jest.

```
# npm install -D @babel/preset-env ## fix SyntaxError: Cannot use import statement outside a module
npm run test
```

You can automate this during development with `nodemon`.

```
nodemon --exec "npm run test"
```
