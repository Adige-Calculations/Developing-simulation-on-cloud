# Multiples threads

A code that resemble very well the scope of multithreading is:
```rust
use log::{error, info};
use std::{thread, time::Duration};

// Function implemented on to simulate a big load on the CPU
fn sleep(seconds: f32) {
    thread::sleep(Duration::from_secs_f32(seconds));
}

pub mod dad {
    use super::{info, sleep};

    pub fn cook_spaghetti() -> bool {
        info!("Cooking the spaghetti...");
        sleep(4.0);
        info!("Spaghetti is ready!");
        true
    }
}

pub mod mom {
    use super::{info, sleep};

    pub fn cook_sauce_and_set_table() {
        sleep(1.0);
        info!("Cooking the sauce...");
        sleep(2.0);
        info!("Sauce is ready! Setting the table...");
        sleep(2.0);
        info!("Table is set!");
    }
}

fn main() {
    env_logger::init();
    let handle = thread::spawn(|| dad::cook_spaghetti());

    mom::cook_sauce_and_set_table();

    if handle.join().unwrap_or(false) {
        info!("Spaghetti time! Yum!")
    } else {
        error!("Dad messed up the spaghetti. Order pizza instead?");
    }
}
```
if we run the code with:
```sh
RUST_LOG=info cargo run                                                                                                       127 ↵
```

the programme will log all your steps so you can trace how the code is operating, the code above will return this:
```sh
[2022-11-12T19:31:57Z INFO  kitchen::dad] Cooking the spaghetti...
[2022-11-12T19:31:58Z INFO  kitchen::mom] Cooking the sauce...
[2022-11-12T19:32:00Z INFO  kitchen::mom] Sauce is ready! Setting the table...
[2022-11-12T19:32:01Z INFO  kitchen::dad] Spaghetti is ready!
[2022-11-12T19:32:02Z INFO  kitchen::mom] Table is set!
[2022-11-12T19:32:02Z INFO  kitchen] Spaghetti time! Yum! 
```
## How to communicates between threads -> Channels

> Do not use the std library crate ```std::sync::mpsc``` because the rust core developers made bad choices during the design phase.

The best way to communicate between multiple threads in via:
- crossbeam::channel
always developed from the rust core dev, which is faster, more efficient and with more features.

To able to send a value across the threads it must satisfy the ```Send``` trait.

A simple implementation of multithreading is shown here but there is no exchange of data through a channel:
```rust
use crossbeam::channel;
use std::thread;
use std::time::Duration;

fn sleep_ms(ms: u64) {
    thread::sleep(Duration::from_millis(ms));
}

fn expensive_sum(v: Vec<i32>) -> i32 {
    // Pretend our fancy little filter-map-sum is expensive and takes 500ms
    sleep_ms(500);
    println!("Child thread: just about finished");
    v.iter().filter(|&x| x % 2 == 0).map(|x| x * x).sum()
}

fn main() {
    let my_vector = vec![2, 5, 1, 0, 4, 3];

    // Spawn a child thread to run `expensive_sum`. Store the returned
    // join handle in a variable called `handle`. 
    let handle = thread::spawn(|| expensive_sum(my_vector));

    // While the child thread is running, the main thread will also do some work
    for letter in vec!["a", "b", "c", "d", "e", "f"] {
        println!("Main thread: Processing the letter '{}'", letter);
        sleep_ms(200);
    }

    let result = handle.join();
    let sum = match result  {
        Ok(sum) => sum,
        Err(e) => panic!("No successful operation on the child thread"),
    };
    println!("The child thread's expensive sum is {}", sum);
	...
```

Following the above code, an implementation with exchanging data is:

```rust

    let (tx, rx) = channel::unbounded();

    // Cloning a channel makes another variable connected to that end of the channel so that you can
    // send it to another thread. We want another variable that can be used for sending...
    let tx2 = tx.clone();

    let handle_a = thread::spawn(move || {
        sleep_ms(350);
        tx2.send("Thread A: 1").unwrap();
        sleep_ms(200);
        tx2.send("Thread A: 2").unwrap();
    });

    sleep_ms(100); 

    let handle_b = thread::spawn(move || {
        sleep_ms(0);
        tx.send("Thread B: 1").unwrap();
        sleep_ms(200);
        tx.send("Thread B: 2").unwrap();
    });

    // Using a Receiver channel as an iterator is a convenient way to get values until the channel
    // gets closed. A Receiver channel is automatically closed once all Sender channels have been
    // closed. Both our threads automatically close their Sender channels when they exit and the
    // destructors for the channels get automatically called.
    for msg in rx {
        println!("Main thread: Received {}", msg);
    }

    // - Use the thread handles to join both threads without getting any compiler warnings.
    handle_a.join().unwrap();
    handle_b.join().unwrap();
    
    println!("Main thread: Exiting.")
}


```
