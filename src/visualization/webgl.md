# WebGL

There are two sides to any WebGL program. Part of the program is written in JavaScript, the programming language for the web. The second part is written in GLSL, a language for writing "shader" programs that run on the GPU

## Pipeline:

<strong> The program pass throgh this pipeline: </strong>

1. Data flow
2. Vertex shader
3. Fragment shader 
4. Graphics 

<strong> In more words: </strong>

The JavaScript side of the program sends values for attributes and uniform variables to the GPU and then issues a command to draw a primitive. The GPU executes the vertex shader once for each vertex. The vertex shader can use the values of attributes and uniforms. It assigns values to gl_Position and to any varying variables that exist in the shader. After clipping, rasterization, and interpolation, the GPU executes the fragment shader once for each pixel in the primitive. The fragment shader can use the values of varying variables, uniform variables, and gl_FragCoord. It computes a value for gl_FragColor. This diagram summarizes the flow of data

<img src="../images/webgl-dataflow.png"> </img>

## WebGL Graphic context

> To use WebGL, you need a WebGL graphics context.

The graphics context is a JavaScript object whose methods implement the JavaScript side of the WebGL API. A graphics context for WebGL 1.0 can be obtained by calling the function 

```js
canvas.getContext("webgl")

// For WebGL 2.0, you would simply use:
canvas.getContext("webgl2") 
```
where canvas is a DOM object representing the canvas element. 
The return value of ```getContext()``` will be null if the context cannot be created. So,getting a WebGL graphics context often looks something like this:

```js
canvas = document.getElementById("webglcanvas");
gl = canvas.getContext("webgl");  // canvas.getContext("webgl2")
if ( ! gl ) {
    // rember that (null == false) for the interpreter
    throw new Error("WebGL not supported; can't create graphics context.");
}
```
## Data flow 

In WegGL, the seven types of primitive are identified by the constants:

- gl.POINTS,
- gl.LINES,
- gl.LINE_STRIP,
- gl.LINE_LOOP,
- gl.TRIANGLES
- gl.TRIANGLE_STRIP
- gl.TRIANGLE_FAN

where gl is a WebGL graphics context.

There are two general categories of data that can be provided for the primitive. The two kinds of data are referred to as 

- attribute variables (or just "attributes")
- uniform variables (or just "uniforms")

A primitive is defined by its type and by a list of vertices. The difference between attributes and uniforms is that a uniform variable has a single value that is the same for the entire primitive, while the value of an attribute variable can be different for different vertices.

> One attribute that should always be specified is the coordinates of the vertex. The vertex coordinates must be an attribute since each vertex in a primitive will have its own set of coordinates. WebGL does not come with any predefined attributes, not even one for vertex coordinates. In the programmable pipeline, the attributes and uniforms that are used are entirely up to the programmer. 

As far as WebGL is concerned, attributes are just values that are passed into the vertex shader. Uniforms can be passed into the vertex shader, the fragment shader, or both. WebGL does not assign a meaning to the values. The meaning is entirely determined by what the shaders do with the values.


## The shader program

Drawing with WebGL requires a shader program, which consists of a vertex shader and a fragment shader. Shaders are written in some version of the GLSL programming language.
GLSL is based on the C programming language. The vertex shader and fragment shader are separate programs, each with its own ```main()``` function. 


The two shaders are compiled separately and then "linked" to produce a complete shader program. The JavaScript API for WebGL includes functions for compiling the shaders and then linking them. To use the functions, the source code for the shaders must be JavaScript strings.

## Vertex Shader 

Code that take your shape and convert it into a points in a 3-dim space.
It takes three steps to create the vertex shader.

```js
let vertexShader = gl.createShader( gl.VERTEX_SHADER );
gl.shaderSource( vertexShader, vertexShaderSource );
gl.compileShader( vertexShader );
```
The functions that are used here are part of the WebGL graphics context, gl, and the parameter vertexShaderSource is the string that contains the source code for the shader. Errors in the source code will cause the compilation to fail silently. You need to check for compilation errors by calling the function

```js
gl.getShaderParameter( vertexShader, gl.COMPILE_STATUS )
```

which returns a boolean value to indicate whether the compilation succeeded.

## Fragment shader

Color the elements between vertices.

The fragment shader can be created in a similar way. With both shaders in hand, you can create and link the program. The shaders need to be "attached" to the program object before linking. The code takes the form:

```js
let prog = gl.createProgram();
gl.attachShader( prog, vertexShader );
gl.attachShader( prog, fragmentShader );
gl.linkProgram( prog );
```
Even if the shaders have been successfully compiled, errors can occur when they are linked into a complete program. For example, the vertex and fragment shader can share certain kinds of variable. If the two programs declare such variables with the same name but with different types, an error will occur at link time. Checking for link errors is similar to checking for compilation errors in the shaders.
