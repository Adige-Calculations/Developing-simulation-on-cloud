# Workflow to target the web directly 

This chapter introduce how a wasm module should be instanciated on the web without the usage of a 
bundler. As a side note, this is not how WASM is supposed to be used in production applications.

## Library composition

The ```wasm-pack``` uses the wasm-bindgen crate to build and generate JavaScript binding file.
Import the wasm-bindgen crate:

```rust
use wasm_bindgen::prelude::*;
```
The function wasm-pack requires "exported" functions must include #[wasm_bindgen] tag.

```rust
...

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
  return a + b;
}
```

## Building script

The wasm-pack tool has support for a lot of different output types, especially for bundlers
like Webpack or Rollup. But, since we want an ES6 module in our case, we use the web target below:

```sh
wasm-pack build --target web
```

When you compile your your library, ```wasm-bindgen``` will create the glue code in javascript to be used,
in case the compiler see the flag ```--target web``` the artifacts will ready to be imported as ES6 module:

# Sum case implementation

Following the code in "src/lib.rs". ```wasm-pack``` pill generate in the ```pkg``` directory the file necessary
to run the code on the browser:

```sh
wasm-pack build --target web
```

Interesting code snippet to be concious of, is in ```pkg/<pkgName>.js ``` which call the ```.wasm``` module and its public functions.
Before a WebAssembly module is executed it needs to be downloaded. In the above code you can see that the fetch API
is being used to load the wasm module, this function asynchronously returns a response object.

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
where the module is fetched, the imports constructed, and the module instantiated.
While the actual export of the functions we are interested in, from .wasm to JS is done through:

```js
// These are tags for the function below
/**
* @param {number} i
* @returns {number}
*/

export function add(x, y) {
    const ret = wasm.add(x, y);
    return ret;
}
```

### Differences between glue codes

The JS glue code when using a bundler option for the compiler (the default option) does not make use 
of the intialization function ```init```

## Serving the function

Writing the entrypoint  ```index.html``` :
```html
<!DOCTYPE html>
<html>
    <body>
        <h2>JavaScript async / await</h2>
        <script type="module" src="/index.js"> </script>
    </body>
</html>
```

### Bindings WASM and JS

Finally you need to call the package ```pkg``` as:

```js
import init, { add } from "./pkg/my_wasm_pkg.js";

async function start() {

  const wasm = await init();  // init is an async function
  console.log(add(2, 3));
}

start();
```
### Bindings WASM and JS in another way

You can call the ```.js``` module in another ```.js``` module defining it as a dependencies
and then introduce it as:

```js
import init, { add } from "./pkg/my_wasm_pkg.js"

init().then(_ => {
  console.log(add(2, 3));
})
```