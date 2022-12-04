# Javascript

Javascript (JS) is an object oriented language. It is useful to think at JS as an interactive layer 
on top of the content, HTML and its presentation, CSS.
The most basic way to interact is to inject new HTML content into the document.

## Types
```js
// String:
let stringDemo = "A string of text.";

// Numbes:
let integerDemo = 4;

let floatDemo = 5.6;

// Boolean:
let booleanDemo = true;

// Null value (nothing):
let nullDemo = null;

// Undefined:
let undefinedDemo;

let undefinedAssignedDemo = undefined;

// Object:
const objectDemo = {
  dance: "Mambo",
  number: 5,
};

// Array:
const arrayDemo = ["tango", "foxtrot", "waltz", "rumba", "bolero"];
const collection = ["piggy", integerDemo, 5, true]
```

## Variable allocation  

### var
Varible can be issued, keep in mind they are globally scoped i.e. if you change its value
inside a function the change will be reflected in the global code.

```js
var x = 4, y = "variable";  // mutable content - it is possible to be reassigned
```

### let
It's a ```var``` with local scope

```js
let x = 5;
```

### const 
Works like a let but it cannot change its state

```js
const x = 5;
x = 9        // Problem: Assignemnt to constant value 
``` 

## Functions
A tipical function is implemented as:

### Traditional function expressions
The traditional method:

```js
function(a, b) {
	... 
	return c 
}
```
### Arrow function expressions
A methode introduced with ES6 and its becoming more and more common in modern JS:

```js
const do_actions = () => { ... }  // To execute run:   do_actions(); 
(a) => {return a}
```
They are a simpler way to represent a function.
Arrow function can be called only after its declaration hence forcing good code writing.

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

## Callback

Sometimes we have two functions and we want to control the sequence at which they
execute. This typically happens if one function relies on the output of another 
function for data or when one function has to wait for another function to 
complete before doing something. For example:

```js 
...

const function_to_be_passed_as_callback = (a) { return a + 1 }

// Here a function is trated as a input variable, hence you are passing function object to be used later on
const add_one (a, callback) {
	callback(a)
}

const printHTML = (number) => {
  const table = document.createElement("table");
  const new_number = add_one(number, function_to_be_passed_as_callback)
  table.innerHTML = `
    <tr>
      <td>Add one to ${number}:</td>
      <td>${new_number}</td>
    </tr>
  `;
  document.querySelector("main").append(tipTable);
};

```
