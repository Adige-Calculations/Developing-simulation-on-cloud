# Statements 

## if let 

Statement like this:
```rust 
if let Err(e) = my_result {
	println!("Waring: {}", e)
}
```
if your result is equal to an Err print this message, otherwise do nothing. 
