# TypeScript

TypeScript (TS) is a typed superset of JavaScript (JS) that provides features such as type checking and interfaces
to help developers build large-scale applications. 

## Local install

To use TypeScript, the compiler has to be installed, on terminal:

```sh
sudo npm install -g typescript
tsc --version
```

Then to how to transpile the code TS code base in JS, a ```tsconfg.json``` file has to be presented,
otgerwise default option will be applied:

```sh
tsc --init
```
Which will automatically return the ```tsconfig.json``` file on the root of your project.
Now you should have your project instanciated like:

```
.
├── src
│   └── index.ts
└── tsconfig.json
```
## tsconfig.json

The TS configuartion should be simualar the following to understand where the files are located and what to do with them:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2016",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true ,
    "sourceMap": true,           // Added
    "noImplicitAny": true,       // Added
    "moduleResolution": "node",  // Added
    "outDir": "dist",            // Added
  },
  "include": [ "src/**/*.ts" ],  // Added
  "exclude": [ "node_modules" ]  // Added
}
```

The include option tells the TypeScript compiler to target all files in all subdirectories within the src directory. The exclude option makes sure the TypeScript compiler doesn’t dive into any directories associated with project dependencies (i.e. things we are writing.) The outDir option instructs the TypeScript compiler to put all compiled files into the dist folder vs. alongside source files. With this setup, we’re ready to run the TypeScript compiler!

Note: We’re also removing the "strict" : true entry from the tsconfig.json file.

## Packaging a web app

Install TypeScript on the package build instructions:

```sh
npm install --save-dev ts-node ts-loader webpack webpack-cli @types/dat.gui @types/three
```
```@types/``` namespace on npm is used to distribute declaration files for popular JavaScript libraries that can be used with TypeScript.

Once the package is installed, you can use the Three.js library in your TypeScript code by importing the types from the ```@types/three``` module.
For example:

```js
import * as THREE from 'three';

const scene = new THREE.Scene();
```

Create ```webpack.config.js``` configuration file for webpack in which is told to compile TS to JS.

```js
const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
 },
 devServer: {
   contentBase: './dist'
 },
 resolve: {
   extensions: ['.ts', '.tsx', '.js', '.jsx']
 },
 devtool: 'source-map',
 module: {
   rules: [
     {
       test: /\.tsx?$/,
       loader: 'awesome-typescript-loader'
     }
   ]
 }
};
```
Start the webpack dev server

```js
npx webpack-dev-server
```



# Language features

## Type assertion

```js
const canvas = <HTMLCanvasElement>document.getElementById('canvas');
```
the TypeScript compiler treat the canvas object as HTMLCanvasElement type.