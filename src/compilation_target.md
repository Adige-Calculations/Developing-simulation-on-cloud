# Compilation target

```sh
wasm-pack build --target web
```
The target flag will customize the JS that is emitted and how the WebAssembly files are instantiated and loaded. A table is presented to make it easier:

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

In short term, if you intend to use your WASM module in a plain HTML website, you'll need to tell ```wasm-pack``` to target the web.
Then using a similar pattern on the HTML file to use the module:

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

While if you want to include the wasm module in more complex framework compile it without target and use a
Javascript file to load it into a component such as:

```js
const init = await import('./pkg/glue_code.js');
init().then(() => console.log("WASM Loaded"));
```