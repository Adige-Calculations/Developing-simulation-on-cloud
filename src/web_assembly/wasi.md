# Executable environemnt

The wasm runtime is really quite simple, lacking any built in I/O or APIs. As a result, in order to connect this runtime to its host environment, and ultimately the ‘real world’, you need to create your own interfaces and messaging standards. The WASI project (WebAssembly System Interface) is addressing this by developing a common system-level interface for WebAssembly, making it much easier to incorporate this runtime into a host environment and build a platform around it. 

## Creating a Rust WebAssembly Module 

The Rust compiler is extremely good at eliminating unused code. If you compiled this function without the no_mangle attribute:
```rust 
#[no_mangle]
extern fn add(x: i32, y: i32) -> i32 {
     x + y
}
```
then the resulting module would not include the add function. This is because it can’t find any consumers for the add functions, thinks it’s unnecessary, and so removes it from the compiler output. There are a few other ways to “trick” the compiler into leaving your extern functions intact, but we prefer the no_mangle attribute because it is explicit that you do not want the function signature tampered with, and it has the natural side effect of requiring that the function be included in compilation output.

```console 
wasmtime ./target/wasm32-unknown-unknown/release/my_library.wasm --invoke add 2 2
```

## Accessing the host

WASI is a group of logically related imports that provide secure and isolated access to a small subset of the system on which a host runtime executes. As with all things, it is entirely up to the host runtime whether your module will be allowed to use WASI, and even within the specification, which functions your module might be allowed to use.

For example, while the WASI specification allows for import functions that let WebAssembly modules read and write files through a file descriptor, the set of available descriptors is determined ahead of time by the runtime. The modules can’t simply read and write to arbitrary portions of the host file system.

Some languages that target WebAssembly are fully aware of the WASI specification, and will link your language-native calls to the file system as WASI imports rather than linking them to their raw kernel/system call counterparts. Rust is one of those languages.