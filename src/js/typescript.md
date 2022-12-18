# TypeScript

## Local install

To start using TypeScript the compiler has to be installed, on terminal:

```sh
sudo npm install -g typescript
tsc --version
```

The to start the config file for your scripts:

```sh
tsc --init
```
Which will automatically return a ```tsconfig.json``` file.

## Setting up webpack and TypeScript for packaging

Install TypeScript

```js
npm install --save-dev typescript
```

install webpack

```js
npm install --save-dev webpack webpack-cli webpack-dev-server
```
Install TypeScript loader with sourcemaps support

```js
npm install --save-dev awesome-typescript-loader source-map-loader
```
Create ```webpack.config.js``` configuration file for webpack.

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

## tsconfig.json

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

# Language features

## Type assertion

```js
const canvas = <HTMLCanvasElement>document.getElementById('canvas');
```
the TypeScript compiler treat the canvas object as HTMLCanvasElement type.