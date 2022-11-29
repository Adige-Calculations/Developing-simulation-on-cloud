# Javascript refresh

Javascript (JS) is an object oriented language. It is useful to think at JS as an interactive layer 
on top of the content, HTML and its presentation, CSS.
The most basic way to interact is to inject new HTML content into the document.

## Object
An object is instanciate in this way

```js 
const backpack = {        // object container
	name: "my backpack",  // properties
	strap_lenght: {
		left: 3,
		right: 5,
	},
	lid_open: false,
	
	toggle_lid: function(lidStatus) {  // methods (properties containing functions)
		this.lid_open(lidStatus);
	},
}
```
## Object container 
The ```const``` type association tells that you can change the properities of the value 
however not the type of it 

```js
const backpack = {        				
	name: "my backpack", 				 // you can change this property
	change_name: function(newName) {
		this.name(newName)
	}
}
```

## Scope oject

```js
// Dot notation 
backpack.name

// Bracket notation
backpack["name"]
```
The reason behind the bracket notation is to get a more readable control in more complex
case.

```js
var query = "name";
backpack[query];
```

## Classes

There are who way of declaring a class:

```js
// Class declaration
class Name { ... }

// Class expression
const Name = class { ...}

```

### Class constructor 
To create a constructor

```
class Book {
  constructor(name, page, weight) {
    this.name = name;
    this.curretn_page = page;
    this.weight = weight;
  }

  change_page (page) {
    this.curretn_page = page;  
  }
}

// Simple implementation
const book1 = new Book("wow", 200, 2);
book1.change_page(4);
```

