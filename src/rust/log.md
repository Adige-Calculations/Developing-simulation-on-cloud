# Log files 

If you want to output info from your code, in what ever way, such are console, file, cloud providers...
You need to call the ```log``` capabilities. 

## In library

You have to mark the entity of your logs inside the code steps.
Possible log evaluation in rust are done by level and are enclosed in macro to be used easily:
- error!
- warn!
- info!
- debug!
- trace!

If error is encoutred, the descendant possibilities will not be passed.

### Example:

```rust
use log::{debug, info, error};

#[derive(Debug)]
pub struct Frog {
    energy: u8,
    sleeping: bool,
}

impl Frog {
    pub fn new() -> Self {
        debug!("A new frog has bee created");
        Default::default()
    }
    pub fn hop(&mut self) {
        self.energy -= 1;
        info!("This is how much energy is left: {}", self.energy);
        if self.energy == 0 {
            self.sleep();
        }
    }
    pub fn sleep(&mut self) {
        if self.sleeping {
            error!("the frog is already sleeping");
        } else {
            self.sleeping = true;
        }
    }
}

impl Default for Frog {
    fn default() -> Self {
        Frog {
            energy: 5,
            sleeping: false,
        }
    }
}
```

## In binary

You have to import a library that make use of loggers, and define in the binary a way to display them.
A simple solution is the ```env_logger``` package which display logs on console. The binary code linked to the library shown above is:
```rust
use frogger::Frog;
use env_logger;

fn main() {
    env_logger::init();
    let mut skippy = Frog::new();
    skippy.hop();
    skippy.hop();
    skippy.hop();
    skippy.hop();
    skippy.hop();
    skippy.sleep();
    skippy.sleep();
}
```
 

Runnning the code as:

```sh
RUST_LOG=debug cargo run
```

will return:
```console
[2022-11-12T17:15:33Z DEBUG frogger] A new frog has bee created
[2022-11-12T17:15:33Z INFO  frogger] This is how much energy is left: 4
[2022-11-12T17:15:33Z INFO  frogger] This is how much energy is left: 3
[2022-11-12T17:15:33Z INFO  frogger] This is how much energy is left: 2
[2022-11-12T17:15:33Z INFO  frogger] This is how much energy is left: 1
[2022-11-12T17:15:33Z INFO  frogger] This is how much energy is left: 0
[2022-11-12T17:15:33Z ERROR frogger] the frog is already sleeping
[2022-11-12T17:15:33Z ERROR frogger] the frog is already sleeping
```
