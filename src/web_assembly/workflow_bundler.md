# Workflow to produce a WASM driven package 


WebAssembly modules cannot be loaded and executed by the browser directly (e.g. via script elements), they must be downloaded, compiled and instantiated via JavaScript. The WebAssembly specification defines the concept of a ‘host’, which in this case is the browser’s JavaScript engine. A module cannot perform any useful functions without interoperating with the host, most notably WebAssembly modules cannot directly perform any I/O (e.g. they cannot open sockets, access the DOM, write to filesystems, etc). Also, WebAssembly functions are invoked synchronously, the JavaScript host ‘yields’ to the module function, waiting until it returns before resuming.

This chapter introduce how a wasm module should be instanciated on the web using bundler such as Webpack.


## Cargo.toml

A basic config of your toml config file for rust will have this voices:

```toml
...
[features]
default = ["console_error_panic_hook"]

[dependencies]
## Interacting  with JS and the DOM
wasm-bindgen = "0.2"
wasm-bindgen-futures = "0.4.30"    # a bridge connecting JavaScript Promises and Rust Futures. It can convert in both directions and is useful when working with asynchronous tasks in Rust, and allows interacting with DOM events and I/O operations.
js-sys = "0.3.60"                   # Raw wasm-bindgen imports for all the Web's APIs, such as DOM manipulation, setTimeout, Web GL, Web Audio, etc.
web-sys = "0.3"                     # Provides bindings to various DOM APIs, setTimeout, Web GL, Web Audio, etc.

## Error reporting and logging 
console_error_panic_hook = { version = "0.1.1", optional = true }  # for logging panic messages to the developer console
console_log = "0.2.0"

## Dynamic allocation
wee_alloc = "0.4.5"  # The Wasm-Enabled, Elfin Allocator. A small (~1K uncompressed .wasm) allocator implementation for when code size is a greater concern than allocation performance.

[lib]
crate-type = ["cdylib", "rlib"]
```
Which tells the compiler to build library compatible with C/C++ and Rust.

## Library building

The ```wasm-pack``` uses the wasm-bindgen crate to build and generate JavaScript binding file.
Import the wasm-bindgen crate:

```rust
use wasm_bindgen::prelude::*;
```
The function wasm-pack requires "exported" functions must include #[wasm_bindgen] tag.

```rust
#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
  return a + b;
}
```

## Starting script

Use wasm-pack to build the library and deliver a pyhton server that serve the HTML output.
The wasm-pack tool has support for a lot of different output types, especially for bundlers
like Webpack or Rollup. But, since we want an ES6 module in our case, we use the web target below:

```sh
#!/bin/sh

build(){
    wasm-pack build --target web
}

pack(){
   rollup ./main.js --format iife --file ./pkg/bundle.js
}

run(){
    python -m "http.server" "8080" &
    PID=$!
    echo $PID > .serverpid
}

build
pack
run

```
## Stop script
This script will automate the closure of the previous actions:

```sh
#!/bin/sh

stop(){
    if [ -f .serverpid ]; then
        kill $(cat .serverpid)
        rm .serverpid
        echo Server stopped
    else
        echo Could not find the server PID. Is it running?
    fi
}

stop
```
## Adviced workflow structure

When you compile your your library, ```wasm-bindgen``` will create the glue code in javascript to be used, in case of using the flag ```--target webweb```
the artifacts will ready to be imported on the :
```sh
wasm-pack build --target web
```
It is adviced to use it as dependencies for the package you will use:

```sh
.
├── Cargo.toml
├── node_pkg		# npm generated 	    -->  call ./pkg here from the dependencies tab on node_pkg/packages.json 
├── pkg		        # wasm-pack generated 
├── src
└── target      	# cargo generated
```

To make ```pkg``` a valuable package for NPM you need to write the dictionary package.json, a simple way of doing it is:
```sh
npm init -y
```

# Sum case implementation

Writing a simple code as this in you ```src/lib.rs```:

```rust
#[wasm_bindgen]
pub fn add(x: i32, y: i32) -> i32 {
	x + y
}
```
Will generate in the ```pkg``` directory the file necessary to run the code on the brower with:
```sh
wasm-pack build --target web
```
Interesting code snippet to be concious of are in ```<\pkgName\>.js ``` which call the ```.wasm``` module and its public functions:
```js
async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('pkg_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
```

and the actual exportation of the function we are intered in: add, from .wasm to JS

```js
export function add(x, y) {
    const ret = wasm.add(x, y);
    return ret;
}
```

Once created a new package, tightly linked to the one genrated from Cargo [```pkg```]. Similarly to this way:
```sh
mkdir working-pkg/public -p && cd working-pkg && npm init -y
```
- package.json

```json
{
  "name": "www",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server",
    "build": "webpack build"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack-dev-server": "^4.11.1",
    "pkg": "file:../pkg"

  },
  "dependencies": {
    "copy-webpack-plugin": "^11.0.0",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0"
  }
}
```
The config file for webpack must be configured as:
- webpack.config.js
Which should contain a similar configuration as the follwing:

```js
const path = require("path");
const CopyWebPackPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "index.js"
    },
    mode: "development",
    plugins: [
        new CopyWebPackPlugin({
            patterns: [
                { from: "./index.html", to: "./"}
            ]
        })
    ]
}
```

Checking the ```index.html``` entry point:
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Adige handbook</title>
    </head>
    <body>
        <script src = "./index.js"></script>
        </script>
        <div></div>
        </div>
    </body>
</html>
```
Finally you need to call the package ```pkg``` in your lauch package in Js file ```index.json``` as:
```js
import init, {add} from "pkg";

async function start() {
  const wasm = await init();    // fetch the wasm module
  console.log(add(2, 3));
}

start();
```
Running the code with npm in developer mode:
```sh
npm run dev
```

Accessing the webpage, you should see 5 in the console. You can build the package running:
```sh
npm run build
```
## Bindings WASM and JS in another way

You can call the ```.js``` module in another ```.js``` module defining it as a dependencies
and then introduce it as:

```js
import init, {functionStructOrElementYouWantToImport} from "pkgName";

init().then(_ => {
  greet("Filip");
})
```

# Reduce the size of WASM module

The usage of a different allocator reduce drastically the size of the .wasm artifact.
In you ```src/lib.rs``` instanciate:

```rust
use wee_alloc;

// Use `wee_alloc` as the global allocator.
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
```

With the relative package dependencies instructions on ```Cargo.toml```


# Styling 
This html snippet code is provided to get the basics of stying:
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            .content-wrapper {
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
            }
        </style>
    </head>
    <body>
        <!-- <h1>Hello Worlds</h1> -->
        <div class="content-wrapper ">
            here is my canvas
            <canvas id="snakeGame-canvas"></canvas>
        </div>
        <script src = "./bootstrap.js"></script>
        </script>
        <div></div>
        </div>
    </body>
</html>
```

Where the "content-wrapper" div has been styled followig the style.content-wrapper guide at the beginnig of the file
