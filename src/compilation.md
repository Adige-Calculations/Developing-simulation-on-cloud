# Compilation
This cargo package will create the artifacts you need from you rust library.

```sh
wasm-pack build --target web
```
The target flag will customize the JS that is emitted and how the WebAssembly files are instantiated and loaded.

<table><thead><tr><th> Option    </th><th> Usage </th><th> Description                                                                                                     </th></tr></thead><tbody>
<tr><td> <em>not specified</em> or <code class="hljs">bundler</code> </td><td> <a href="https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html#bundlers">Bundler</a> </td><td> Outputs JS that is suitable for interoperation with a Bundler like Webpack. You'll <code class="hljs">import</code> the JS and the <code class="hljs">module</code> key is specified in <code class="hljs">package.json</code>. <code class="hljs">sideEffects: false</code> is by default. </td></tr>
<tr><td> <code class="hljs">nodejs</code>  </td><td> <a href="https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html#nodejs">Node.js</a> </td><td> Outputs JS that uses CommonJS modules, for use with a <code class="hljs">require</code> statement. <code class="hljs">main</code> key in <code class="hljs">package.json</code>. </td></tr>
<tr><td> <code class="hljs">web</code> </td><td> <a href="https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html#without-a-bundler">Native in browser</a> </td><td> Outputs JS that can be natively imported as an ES module in a browser, but the WebAssembly must be manually instantiated and loaded. </td></tr>
<tr><td> <code class="hljs">no-modules</code> </td><td> <a href="https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html#without-a-bundler">Native in browser</a> </td><td> Same as <code class="hljs">web</code>, except the JS is included on a page and modifies global state, and doesn't support as many <code class="hljs">wasm-bindgen</code> features as <code class="hljs">web</code> </td></tr>
</tbody></table>