# Bundling

Library from the npm are all being imported as modules that will not work on the browser, these resources need to be available directly within the code loaded in the web browser.

## Webpack 

Webpack is a tool to “bundle” all our compiled TypeScript files into a single output file that can be easily loaded in the browser. Webpack uses a file named webpack.config.js by default for configuration settings. 

```js
const path = require('path');
module.exports = {
    mode: 'none',
    entry: './src/index.ts',
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