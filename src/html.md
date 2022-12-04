# Html (HyperText Markup Language)

When you present an HTML document to a browser, it creates an object model 
for the document, a Document Object Model (DOM). This DOM describes the
hierarchical tree structure for that document, how the different elements
in the document relate to each other and are nested. 

## DOM

It represents the page so that programs can change the document structure, style,
and content. The DOM represents the document as nodes and objects; that way,
programming languages can interact with the page.

A web page is a document that can be either displayed in the browser window 
or as the HTML source. In both cases, it is the same document but the Document
Object Model (DOM) representation allows it to be manipulated.
As an object-oriented representation of the web page, it can be modified 
with a scripting language such as JavaScript.

## Description of html structure

Given the following html element:

```js
  <article class="backpack" id="everyday">
  Html content
  </article>
```
The descrption of the html structure is:

- element type = article
- element attributes = [class, id]
- element nested html = Html content

## JS code injection standard
Modern pattern states that the ```<script> </script>``` tag lines must be 
included in the ```<head> </head>```. To permit a the total redering of the html
content on the page page it is necessary to use the ```<script>  ...  deref </script>```
tag (```<script>  ...  async </script>``` acts in a similar manner) to permit at 
the js code to be executed after the rendering of the html. If the script is set 
to "async", the JS script run when the module is fully loaded (hence download 
completed). Instead if the script is set to "defer", when the entire HTML page 
is rendered as follows:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Module demo</title>
    <script src="script.js" defer></script>
  </head>
  <body></body>
</html>
```

Here the body tag can be redered and then JS will be executed
