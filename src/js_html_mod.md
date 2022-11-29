# Html manipulation

From a browser console you can type js expression and have in return object such as:

```console
// Return the entire html document
document
// Return a the body of the html 
docment.body.innerHTML
``` 
# Injecting html
The back ticks tell the browser that anything inside here is a template literal 
meaning we can mix HTML and strings with JavaScript expressions to literally create templates

```js
const liter = 2;
const color = "red"; 
const age = 1;
const lid_open = true;

const content = `
    <main>
      <article>
        <h1>Backpack description:</h1>
        <ul>
          <li>Volume: ${liter}</li>
          <li>Color:${color}</li>
          <li>Age:${age}</li>
          <li>Lid status:${lid_open}</li>
        </ul>
      </article>
    </main>`;

document.body.innerHTML = content;
```

## Access element in the DOM (Document Object Model)

Using CSS queries you can use in JS these command:

```js
// Return first element
document.querySelector("main")
// Return the main class 
document.querySelector(".maincontent")
// Return last object
document.querySelector("main li:last-child")
// Return a node list
document.querySelectorAll("main li")
```
