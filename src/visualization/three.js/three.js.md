# Three.js

The scene elements are created in the BasicScene class and the index.ts file simply renders updates in a loop. Elements included in the scene are as follows:

PerspectiveCamera – Handles FOV, zooming, and element visibility.
WebGLRenderer – Renders elements for WebGL-based viewing.
OrbitalControls – Allows basic scene movement via user interaction
GridHelper – Displays a grid on the ground plane
AxesHelper – Displays a colored gridline in each of the x, y, z axes.
Lights & LightHelers – Lights the scene and provides a visual locator.
Cube – A basic scene element.
Dat.GUI Debug Window – Debugging tool that adjusts scene parameters in real-time.
Window Resizing – Dynamically adjusts the scene size and aspect ratio on browser resizes.

## Include in typescript project 

```sh
npm init
npm install --save-dev ts-node ts-loader webpack webpack-cli @types/dat.gui @types/three
npm install three dat.gui
```
A usual layout looks like:

```
typescript-threejs/
    ├── src/
    │   └── index.ts
    ├── dist/
    └── package.json
```

Three, dat.GUI, and OrbitalControls are all being imported as modules that will not work — these resources need to be available directly within the code loaded in the web browser. For simplicity, we are going to use Webpack to “bundle” all our compiled TypeScript files into a single output file that can be easily loaded in the browser.

Webpack uses a file named webpack.config.js by default for configuration settings. Unfortunately, there is no auto-generation method for this file — which will make sense once we see the project-specific nature of these configurations. Create a webpack.config.js file in the project root with the following code:

```js
const path = require('path');

module.exports = {
    mode: 'none',
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
};
```
<strong> mode </strong> – controls the format of the emitted code. Options include production, development and none — the latter emitting a human-friendly format.
<strong> entry </strong> – the file from which Webpack’s dependency graph (tree) is constructed
<strong> output </strong> – Filepath of the single emitted bundled file — named main.js here.
<strong> resolve </strong> – File types resolvable by Webpack during bundling — the .js extensions are needed here to ensure a seamless import of the OrbitalControls module.
<strong> module </strong> – Configures Webpack to use the ts-loader package which allows the integration with TypeScript.

Then to execute the script:

```sh
npx webpack build
```