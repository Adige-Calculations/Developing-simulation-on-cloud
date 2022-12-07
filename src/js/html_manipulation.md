# Html manipulation

From the browser console you can type JS expressions and have in return objects such as:

```console
// Return the entire html document
document
// Return a the body of the html 
docment.body.innerHTML
``` 

## Injecting html
To insert plain HTML inside an element the ```innerHTML```method is used, expecially 
with the usage of templates, meaning we can mix HTML and strings with JavaScript
expressions such as:

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

### Example within a function

```js
const greenPack = {
  name: "Frog Pack",
  color: "green",
  volume: 8,
  pocketNum: 3,
};

const addPack = function (currentPack) {
  const newArticle = document.createElement("article");
  newArticle.innerHTML = `
    <h1>${currentPack.name}</h1>
    <ul>
      <li>Volume: ${currentPack.volume}</li>
      <li>Color: ${currentPack.color}</li>
      <li>Number of pockets: ${currentPack.pocketNum}</li>
    </ul>
  `;
  return newArticle;
};

const main = document.querySelector("main");
main.append(addPack(greenPack));
```

# Access element in the DOM (Document Object Model) 

The DOM structure can be modified in several ways:

## Via CSS queries

With CSS query you can accces element of your DOM by using JS code as:

- ```querySelector()```
- ```querySelectorAll()```

An application of these method is shown by this examples:

```js
// Return first element "main"
document.querySelector("main")
// Get the first element with attribute: class="maincontent":
document.querySelector(".maincontent")
// Return last object
document.querySelector("main li:last-child")
// Return a node list containing each element object matching the query
document.querySelectorAll("main li")
// Return the first element with attribute: id="glCanvas"
document.querySelector("#glCanavs")
```
Another example:
```js
const paragraphs = document.querySelectorAll("p");
// paragraphs[0] is the first <p> element
// paragraphs[1] is the second <p> element, etc.
alert(paragraphs[0].nodeName);
```
### Examples

The access of the DOM elements, tagged from the attribute ```class```:

```html
...
    <main class="maincontent"> </main>
...
```
using the following code: 

```js
document.getElementsByClassName("maincontent")
```

The attribute can be ```src ```  etc.. 
<p></p> 
Or from the type of element it is possible to retrive the elements like:

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

## Traditional way

There is a different standard method to access the DOM, but the CSS queries 
is the favourite for simplicity. Nonetheless for compleition it is shown:

```js
// To find elements whose class lists include both the red and test classes:
element.getElementsByClassName('red test');
``` 

# Element attributes manipulation
JS can be used to modify the attributes of any elements. The attributes 
are stored in the element property, it can be accessed directly by calling it.

```js
element.attributes
```

# Element managemnt

New element and subseqeunt appendage of html

```js
const content = `
js string
`

const main = document.querySelector(".maincontent");

const newArticle = document.createElement("article");
newArticle.classList.add("backpack");
newArticle.setAttribute("id", "everyday");
newArticle.innerHTML = content;

main.append(newArticle);  // or ".prepend" 
```

### Example 2

```js
const newImage = document.createElement("img");
newImage.classList.add("feat-img");
newImage.setAttribute("src", "logo.svg");
newImage.setAttribute("alt", "The company logo");
newImage.style.cssText = "display: block";
```

which return:

```html
<img class="feat-img" src="logo.svg" alt="The company logo" style="display: block;">
```

#  Event listener

An event listener is a method added to a target:

```js
.addEventListener()
```
usually with this structure

```js
// target can be "button"
// event can be "click"
// callback can be "addone" if it is callback |  "addone(x, y, z ...)" if it is a function
target.addEventListener(event, callback, [, options])
```

Option is tipically ```false``` to ensure default behaviour of the function and it 
is rarely used.

Event listeners can be appended to any element inside the window and inside the DOM
and you can trigger whatever function you want either using an anonymous function inside
the event listener or by using a callback.

``` js
const button = document.querySelector(".cta-button");
const posX = document.querySelector(".posX span");
const posY = document.querySelector(".posY span");

// Log when the button is clicked in the console.
button.addEventListener("click", () => {
  button.classList.toggle("active");
  console.log("Button was clicked!");
}, false);

// Update the x and y displays to show the current mouse position.
const mousePosition = (event) => {
  posX.innerText = event.pageX;
  posY.innerText = event.pageY;
};

window.addEventListener("mousemove", mousePosition, false);
```
