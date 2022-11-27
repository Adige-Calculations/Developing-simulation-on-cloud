# Assembly analysis 

One wasm format is important at the lowest level: WAT. Which stands
for Web Assembly Text. A utility that converts .wasm to .wat is:

```console 
wasm2wat
```

A simple use case is:

```
wasm2wat pkg/my_package_bg.wasm -o my_package.wat
```

## Output example 

Compiled a function that retuns the power of an integer such as:

```rust
...

#[wasm_bindgen]
pub fn power(number: u32, pow: u32) -> u32 {
     number.pow(pow)
}
```

the corresponding .wat artifacts will look similar to this:
```wat
(module
  (type (;0;) (func (param i32 i32) (result i32)))
  (func (;0;) (type 0) (param i32 i32) (result i32)
    (local i32 i32)
    i32.const 1
    local.set 2
    block  ;; label = @1
      block  ;; label = @2
        block  ;; label = @3
          local.get 1
          br_table 2 (;@1;) 1 (;@2;) 0 (;@3;)
        end
        local.get 1
        local.set 2
        i32.const 1
        local.set 1
        loop  ;; label = @3
          local.get 0
          i32.const 1
          local.get 2
          i32.const 1
          i32.and
          select
          local.get 1
          i32.mul
          local.set 1
          local.get 2
          i32.const 3
          i32.gt_u
          local.get 0
          local.get 0
          i32.mul
          local.set 0
          local.get 2
          i32.const 1
          i32.shr_u
          local.set 2
          br_if 0 (;@3;)
        end
      end
      local.get 0
      local.get 1
      i32.mul
      local.set 2
    end
    local.get 2)
  (memory (;0;) 17)
  (export "memory" (memory 0))
  (export "power" (func 0)))
```
An interesting observation here is, the WebAssembly itself
doesn't have any built-in I/O functionality. WebAssembly cannot access the dom or the file
system or sockets. In order to do anything useful, it needs to interoperate with its host environment
in this case, JavaScript. And your browser now has effectively two virtual machines that work
in cooperation. You have your JavaScript virtual machine and your WebAssembly virtual machine,
that's in some ways tightly coupled to work together.
