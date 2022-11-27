# Compiler 
The rust compiler is called ```rustc``` and it is chained with other programmes
to make the user exerience more consistent. ```rustup``` manages the updates,
the verison, and installation of the compilers. It makes
cross-compiling simpler with binary builds of the standard library
for common platforms. To see to which platform it can compile run:

```console
rustup target list
```
To make the compiler able to compile to web assembly you need to add the following
compiation target to ```rustc```:

```console 
rustup target add wasm32-unknown-unknown
```
The diciture says wasm32 becasue of the 32 bit nature of the web nowadays. 

## Compilation

To create a freestanding wasm module (the “purest” type of module,any host runtime that conforms
to the core specification will be able to interact with it ) you can pass the correct compilation target 
to cargo on a project that contain a compatile library.

```console
cargo build --target wasm32-unknown-unknown
```

The ```wasm-pack``` from the Rust team provides a framework to port easily the
wasm artifact you will create from your rust library into the web gluing it with
some javascript. To install ```wasm-pack``` run:

```temrinal 
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```
This cargo package will create the artifacts you need from your rust library. When you
compile the project without wanting to run it with a bundler, you have to run wasm-pack
build with a ```--target``` flag

```sh
wasm-pack build
```

The default output of ```wasm-bindgen```, or the bundler target, assumes a model where the wasm module itself is natively an ES module.
This model, however, is not natively implemented in any JS implementation at this time.
As a result, to consume the default output of wasm-bindgen you will need a bundler of some form.

## Cargo.toml library output requirements 
The code must be compiled with this tag as compilation output to provide a wasm module 

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```
These lines tell cargo that we want to allow our crate to build a native Rust static library (rlib) and a C/C++ compatible library (cdylib).


## Structure of WebAssembly Modules

WebAssembly has a very simple type system, with only 4 types, all of which are numeric - two integers (32 and 64 bit) and two floating points (again 32 and 64 bit). The 64 bit types are quite notable, JavaScript currently only has support for 32 bit numbers, which has limited its capabilities for certain mathematical tasks. In fact the usage of function that uses 64 bit entities will return ar error when evecuted in the JS environment:

```rust
// This function will work on the browser
#[wasm_bindgen]
pub fn power(number: u32, pow: u32) -> u32 {
     number.pow(pow)
}

// This function will NOT work on the browser
#[wasm_bindgen]
pub fn power_overfloating(number: u64, pow: u32) -> u64 {
     number.pow(pow)
} 
```
