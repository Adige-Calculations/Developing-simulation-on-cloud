# Handle complex data type

The final step we’ll take with this example is to look at how more complex, non-numeric data types are handled by WebAssembly.
Update main.c, adding a greet function that returns a string:

```c
WASM_EXPORT greet() {
 return "hello world";
}
```
And update the bootstrap code:

```js
WebAssembly.instantiateStreaming(fetch("../out/main.wasm"))
 .then(({ instance }) => {
   // invoke the exported function
   const result = instance.exports.greet();
   document.getElementById("container").textContent = result;
});
```

Build and execute - what do you expect to see as the output? Is it hello world?

The result is somewhat surprisingly 1024!

It might seem surprising at first, but the reason for this is really quite simple. As we discussed previously, WebAssembly only has native support for numeric types. Any other type must be stored in linear memory, with the module using appropriate encoding and decoding logic when performing operations of this data. In this example, the ‘hello world’ string is stored directly in linear memory, and the value returned by the greet function (1024) is the location where it is stored.

In order to read the string from the JavaScript host we need to use an appropriate decoder. Update main.js as follows:

```js
WebAssembly.instantiateStreaming(fetch("../out/main.wasm"))
.then(({ instance }) => {
  const result = instance.exports.greet();
  const memory = instance.exports.memory;
  const buffer = new Uint8Array(memory.buffer, result, 11);
  const str = new TextDecoder("utf8").decode(buffer);
  document.getElementById("container").textContent = str;
});
```

The wasm module also exports its linear memory as well as the greet function. This allows both the wasm module and the JavaScript host to read and write to linear memory. The above example constructs a buffer and text decoder in order to retrieve the ‘hello world’ message from linear memory, if you save and run this code you should see the expected result. A similar approach is used to support other complex types such as objects and arrays, with linear memory both acting as a ‘heap’ for storage of state, but also as a way to exchange data with the host.

This encoding/decoding logic is termed ‘glue code’ and is a necessary step. However, in practice you don’t have to write this code yourself. You’ll find language-specific tooling that generates the required glue for exchanging rich types between JavaScript and WebAssembly applications. As an example, Rust has a crate called wasm-bindgen that generates code that allows you to easily pass your own struct types across module boundaries. Also, there are a number of proposals on the WebAssembly roadmap that remove or at least reduce the need for glue code, for example the Interface Types proposal.