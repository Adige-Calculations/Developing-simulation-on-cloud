# Html

When you present an HTML document to a browser, it creates an object model 
for the document, a Document Object Model (DOM). This DOM describes the
hierarchical tree structure for that document, how the different elements
in the document relate to each other and are nested. 

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
