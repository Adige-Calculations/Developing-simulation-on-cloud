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

All HTML documents must start with a document type declaration: <!DOCTYPE html>.
The HTML document itself begins with <html> and ends with </html>.
The visible part of the HTML document is between the ```<body>``` tag. 

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>Web Page</title>
  </head>
<body>
	<h1>My First Heading</h1>
	<p>My first paragraph.</p>
</body>
</html> 
```

Given the following html element:

```html
  <article class="backpack blue" id="everyday">
  Html content
  </article>
```
The descrption of the html structure is:

- element type = article
- element attributes = [class, id]
- element class = [backpack, blue]
- element innerText = Html content

## Javascript location standard
Code must be executed outside the ```<body> </body>``` tag;
Modern pattern states that the ```<script> </script>``` tag lines must be 
included in the ```<head> </head>```. To permit a the total redering of the html
content on the page before the code execute it is necessary to use the ```<script>  ...  deref </script>```
tag 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="script.js" defer></script>
  </head>
  <body>
	...
  </body>
</html>
```

Above the body tag can be redered and then JS will be executed. The tag ```<script>  ...  async </script>```
acts in a similar way, if the script is set to "async", the JS script run when
the module is fully loaded (hence download completed). Instead if the script
is set to "defer".

## HTML Links

HTML links are defined with the <a> tag:
```html
<a href="https://www.adigecalculations.com"> This is a link to our website </a> 
```
## VS code extentions

HTML and CSS content can be automatized using a built in extention called Emmet. To short cut boilerplate code type in the text editor: "!" to gerate the code such as:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
</body>
</html>
```
