# Html manipulation

From the browser console you can type JS expressions and have in return objects such as:

```console
// Return the entire html document
document
// Return a the body of the html 
docment.body.innerHTML
``` 

## Injecting html
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

The access of the DOM object, tagged from the attribute, in the next case the 
attribute is ```class```:

```html
...
    <main class="maincontent"></main>
...
```
The attribute can be ```src ```  etc.. 
<p></p> 
Or from the type of element it is possible to retrive the element like:

```html
...
    <figure class="backpack__image">
      <img src=${everydayPack.image} alt="" />
    </figure>
...
```

Callable from:

```js
document.querySelector("figure")
```
Nesting attributes are still picked up in this way:

```html
      <img src=${everydayPack.image} alt="" />
```

Callable from:

```js
document.querySelector("img")
```
### Via CSS queries

Using CSS queries you can accces element of your DOM ```document``` written in JS code as:

- ```querySelector()```
- ```querySelectorAll()```

An application of these method is shown by this examples:

```js
// Return first element
document.querySelector("main")
// Return the main classes
document.querySelector(".maincontent")
// Return last object
document.querySelector("main li:last-child")
// Return a node list
document.querySelectorAll("main li")
```
Another example:
```js
const paragraphs = document.querySelectorAll("p");
// paragraphs[0] is the first <p> element
// paragraphs[1] is the second <p> element, etc.
alert(paragraphs[0].nodeName);
```
### Traditional way

There is a different standard method to access the DOM, but the CSS queries 
is the favourite for simplicity. Nonetheless for compleition it is shown:

```js
// To find elements whose class lists include both the red and test classes:
element.getElementsByClassName('red test');
``` 

## Element manipulation

JS can be used to modify the attributes of any elements. The attributes 
are stored in the attributes property, it can be accessed directly by calling it.

```js
element.attributes
```