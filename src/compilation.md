# Compiler 
The rust compiler is called ```rustc``` and it is chained with other programmes
to make the user exerience more consistent. ```rustup``` manages the updates,
the verison, and installation of the compilers. It makes
cross-compiling simpler with binary builds of the standard library
for common platforms. To see to which platform it can compile run:

```terminal
rustup target list
```
To make the compiler able to compile to web assembly you need to add the following
compiation target to ```rustc```:

```terminal 
rustup target add wasm32-unknown-unknown
```

# Compilation
The ```wasm-pack``` from the rust team provides a framework to port easily the
wasm artifact you will create from your rust library into the web gluing it with
some javascript. To install ```wasm-pack``` run:

```temrinal 
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

This cargo package will create the artifacts you need from you rust library.
```sh
wasm-pack build --target web
```
The target flag will customize the JS that is emitted and how the WebAssembly files are instantiated and loaded.

<table>
    <thead>
        <tr> 
            <th> Option </th>
            <th> Usage  </th>
            <th> Description                                                                                                     </th></tr></thead><tbody>
        <tr>
        <td> <em>not specified</em> or <code class="hljs">bundler</code> </td><td> <a href="https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html#bundlers">Bundler</a> </td><td> Outputs JS that is suitable for interoperation with a Bundler like Webpack. You'll <code class="hljs">import</code> the JS and the <code class="hljs">module</code> key is specified in <code class="hljs">package.json</code>. <code class="hljs">sideEffects: false</code> is by default. </td></tr>
<tr><td> <code class="hljs">nodejs</code>  </td><td> <a href="https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html#nodejs">Node.js</a> </td><td> Outputs JS that uses CommonJS modules, for use with a <code class="hljs">require</code> statement. <code class="hljs">main</code> key in <code class="hljs">package.json</code>. </td></tr>
<tr><td> <code class="hljs">web</code> </td><td> <a href="https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html#without-a-bundler">Native in browser</a> </td><td> Outputs JS that can be natively imported as an ES module in a browser, but the WebAssembly must be manually instantiated and loaded. </td></tr>
<tr><td> <code class="hljs">no-modules</code> </td><td> <a href="https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html#without-a-bundler">Native in browser</a> </td><td> Same as <code class="hljs">web</code>, except the JS is included on a page and modifies global state, and doesn't support as many <code class="hljs">wasm-bindgen</code> features as <code class="hljs">web</code> </td></tr>
</tbody></table>

In short term, if you intend to use your WASM module in a plain HTML website, you'll need to tell wasm-pack to target the web.
Then using a similar pattern to use the module:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learn WGPU</title>
    <style>
        canvas {
            background-color: black;
        }
    </style>
</head>

<body id="wasm-example">
  <script type="module">
      import init from "./pkg/glue_code.js";
      init().then(() => {
          console.log("WASM Loaded");
      });
  </script>
</body>

</html>
```

While if you want to include the wasm module in more complex framework comile it without target and use a
javascript file to load it into a component such as:
```js
const init = await import('./pkg/glue_code.js');
init().then(() => console.log("WASM Loaded"));

```


## Cargo.toml library output requirements 
The code must be compiled with this tag as compilation output to provide a wasm module 

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

These lines tell cargo that we want to allow our crate to build a native Rust static library (rlib) and a C/C++ compatible library (cdylib).
