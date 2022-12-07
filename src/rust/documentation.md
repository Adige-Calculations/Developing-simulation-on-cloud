O# Documentation

The introduction of the documentation must be written on this format:

```rust
//! # PUMKINS 
//! A pumpkin is a cultivar of winter squash that is round with smooth, slightly ribbed skin, and is most often deep yellow to orange in coloration.[1] The thick shell contains the edible seeds and pulp \n
//! ![pumkin](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/FrenchMarketPumpkinsB.jpg/700px-FrenchMarketPumpkinsB.jpg)

```
While above structs and methods you should use this notation:

```rust
/// Big orange thing
///
/// # Recepies
///
/// Recepies will most asuredly be coming very soon!
pub struct Pumpkin {
    /// Roundness is a percentage
    pub roundness: f32,
    /// orangeness is a number form 8 to 127
    pub orangeness: i32,
}

impl Pumpkin {
    /// If you smash the pumkin you cannot do anymore anyhting
    pub fn smash(self) {}
}
```

To visualize the produced docs run on terminal the following command:

```sh
cargo doc --no-deps --open
```

## Doc test

It is possible to insert code in the documentation, and then check if the code works via testing.
The following docs with check if the function will work:

```rust 
/// # Example
///```
/// # use hello::snuggle;            // the hash is necessary to make the code work but without displaing it 
/// let bunnies = snuggle(5);
/// assert_eq!(bunnies, 40)
///```

pub fn snuggle(bunnies: u128) -> u128 {
	bunnies * 8
}
```
You can run then to check if the function on your docs works:
``` sh
cargo test
```
