# npm (Node Package Manager)
Node.js is the standard platform to run javascript on the server side

To upload a library on the js file you are supposed to use for the server purposes with node or with typescript. It is advised to import the libraries as bare imports such as:

```js
import * as THREE from 'three'
```
You can't use bare imports in websites, you need to bundle the code with it. I suggest you replace the import statement with a simialr inclusion.

## Initialization of a package

It will create a new package.json file where all dependencies will be recorded.

```sh
npm init
```
Then to import a package on your js/ts code, you have to first install the package locally as:

```
npm install gl-matrix 
```

On the code itself, you can then call the following module as:

```js
import { mat4 } from 'gl-matrix'

...
```

When installing a package that will be bundled into your production bundle, you should use npm install --save. If you're installing a package for development purposes (e.g. a linter, testing libraries, etc.) then you should use npm install --save-dev


