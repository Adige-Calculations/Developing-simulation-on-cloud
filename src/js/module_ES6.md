# Javascript ES6

ECMAScript 2015 was the second major revision to JavaScript.
ECMAScript 2015 is also known as ES6 and ECMAScript 6.

# Module

Wring a file called ```user.js```. To export user in a file called ```main.js``` in line:

```js
// default export 
export default class User {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

export printName(user) {
    console.log('User`s name is ${user.name}')
}
```
It is possible to export variable a the end of a file:

```js
class User {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

printName(user) {
    console.log('User`s name is ${user.name}')
}

export default User
export { printName }  // Non default export
```

In ```main.js``` you can import the <b> default </b> object from ```user.js```:

```js
import User from '/user.js'

const user = new User('Bob', 11)
console.log(user)

```

If you want to put in scoper object that has not been exported as default you must insert it in curly brackets as :
```js
import User, {printName as printUserName, printAge} from '/user.js'

const user = new User('Bob', 11)
printUserName(user)
printAge(user)
```

## Html js loading

To include js file that uses modules you must specify into your HTML file that the js is using modules as:

```html
<script type="module" src="./main.js"> </script>
```

