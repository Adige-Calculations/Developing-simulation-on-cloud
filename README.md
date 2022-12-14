<div align="center">
  <p align="center">
    <a href="https://www.adigecalculations.com/">
    <img src="src/images/powered_by_adige.png" alt="MS handbook logo" >
  </p>
  <strong>This book describes the usual practices and tools I use to port my simulation workflows into the cloud. </strong>

  <h3>
    <a href="https://github.com/mSamiolo/MS-LearingBook.git">Contributing</a>
    <span> | </span>
    <a href="https://www.adigecalculations.com/contact">Chat</a>
  </h3>

  <sub>Explore open-source simualtions! 🌊 🌫 ♨️ </sub>
</div>

## About

This repo contains documentation on my learning path towords cloud implmentation of simulation workflow, an explanation 
of the tools I use and more as you dive deeper. It acts as a guide for doing some really neat things with pure math & 
cloud technology. However, keep in mind it should be seen as book to take inspiration, instead of a place to study on.

[Open issues for improving the hand-book.][book-issues]

[book-issues]: https://github.com/mSamiolo/MS-LearingBook.git/issues

## Building the Book

The book is made using [`mdbook`][mdbook]. To install it you'll need `cargo`
installed. If you don't have any Rust tooling installed, you'll need to install
[`rustup`][rustup] first. Follow the instructions on the site in order to get
setup.

Once you have that done then just do the following:

```bash
$ cargo install mdbook
```

Make sure the `cargo install` directory is in your `$PATH` so that you can run
the binary.

Now just run this command from this directory:

```bash
$ mdbook build
```
This will build the book and output files into a directory called `book`. From
there you can navigate to the `index.html` file to view it in your browser. You
could also run the following command to automatically generate changes if you
want to look at changes you might be making to it:

```bash
$ mdbook serve
```

This will automatically generate the files as you make changes and serves them
locally so you can view them easily without having to call `build` every time.

The files are all written in Markdown so if you don't want to generate the book
to read them then you can read them from the `src` directory.

[mdbook]: https://github.com/rust-lang-nursery/mdBook
[rustup]: https://github.com/rust-lang-nursery/rustup.rs/
