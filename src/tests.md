# Unit test

A test is a function devoted to test a little piece of code.
The ideomatic way of defining a test is to insert a module
called test at the end the addressed file you want to test.

```rust
#[cfg(test)]
mod test {
	use super::*;  // ideomatic to use it, since you want all above this function in scope for the test

    #[test]
    fn snuggling_bunnies_multiply() {   // the func can be called as you want, can be private and must return nothing or a result
        assert_eq!(snuggle(2), 16);		
    }
}

```

Three assert macro exist and they should be run inside testing unit

- asserteq!
- assertnq!
- assert!

