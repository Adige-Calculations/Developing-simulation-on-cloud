# Benchmarks

In your Cargo.toml:
```toml
[dev-dependencies]
criterion = { version = "0.3", features = ["html_reports"] }

# Challenge Help 2: Each benchmark needs a `[[bench]]` section with a name and disabling the harness.
# A name "somename" will correspond with a file "benches/somename.rs"

[[bench]]
name = "bench1"
harness = false
```

On your project root there must be a:

```sh
benches
└── bench1.rs
``` 
and inside this file a code similar to the following to run the benchmark is necessary

```rust
use criterion::{black_box, criterion_group, criterion_main, Criterion};
use hello::snuggle;  // your library

pub fn snuggle_benchmark(c: &mut Criterion) {
    c.bench_function("snuggle 2", |b| b.iter(|| snuggle(black_box(2))));
}

criterion_group!(benches, snuggle_benchmark);
criterion_main!(benches);
```
