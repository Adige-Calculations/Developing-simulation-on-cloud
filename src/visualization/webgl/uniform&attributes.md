# Values for Uniform Variables

GLSL has some familiar basic data types: float, int, and bool. But it also has some new predefined data types to represent vectors and matrices. For example, the data type vec3 represents a vector in 3D. The value of a vec3 variable is a list of three floating-point numbers. Similarly, there are data types vec2 and vec4 to represent 2D and 4D vectors.

Global variable declarations in a vertex shader can be marked as attribute, varying, or uniform. A varying variable should be declared in both shaders, with the same name and type. This allows the GLSL compiler to determine what attribute, uniform, and varying variables are used in a shader program.

The JavaScript side of the program needs a way to refer to particular attributes and uniform variables. The function ```gl.getUniformLocation``` can be used to get a reference to a uniform variable in a shader program. It takes as parameters the identifier for the compiled program, which was returned by ```gl.createProgram```, and the name of the uniform variable in the shader source code. For example, if prog identifies a shader program that has a uniform variable named color, then the location of the color variable can be obtained with the JavaScript statement.

```js
colorUniformLoc = gl.getUniformLocation( prog, "color" );
```
The location colorUniformLoc can then be used to set the value of the uniform variable. For example:

```js
gl.uniform3f( colorUniformLoc, 1, 0, 0 );
```

The function gl.uniform3f is one of a family of functions that can be referred to as a group as gl.uniform*. This is similar to the family glVertex* in OpenGL 1.1. The * represents a suffix that tells the number and type of values that are provided for the variable. In this case, gl.uniform3f takes three floating point values, and it is appropriate for setting the value of a uniform variable of type vec3. The number of values can be 1, 2, 3, or 4. The type can be "f" for floating point or "i" for integer. (For a boolean uniform, you should use gl.uniform1i and pass 0 to represent false or 1 to represent true.) If a "v" is added to the suffix, then the values are passed in an array. For example,
```js
gl.uniform3fv( colorUniformLoc, [ 1, 0, 0 ] );
```
There is another family of functions for setting the value of uniform matrix variables. We will get to that later.

The value of a uniform variable can be set any time after the shader program has been compiled, and the value remains in effect until it is changed by another call to gl.uniform*.

If the string that is passed as the second parameter gl.getUniformLocation is not the name of a uniform variable in the shader programs, then the return value is null. The return value can also be null if the uniform variable is declared in the shader source code but is not "active" in the program. A variable that is declared but not actually used is not active, and it does not get a location in the compiled program. This has occasionally caused problems for me, when I commented out part of a shader program for debugging purposes, and accidently made a variable inactive by doing so.

# Values for Attribute

Turning now to attributes, the situation is more complicated, because an attribute can take a different value for each vertex in a primitive. The basic idea is that the complete set of data for the attribute is copied in a single operation from a JavaScript array into memory that is accessible to the GPU. Unfortunately, setting things up to make that operation possible is non-trivial.

First of all, a regular JavaScript array is not suitable for this purpose. For efficiency, we need the data to be in a block of memory holding numerical values in successive memory locations, and regular JavaScript arrays don't have that form. To fix this problem, a new kind of array, called typed arrays, was introduced into JavaScript. We encountered typed arrays when working with three.js in the Chapter 5. There is a short introduction to typed arrays in Subsection 5.1.3. A typed array has a fixed length, which is assigned when it is created, and it can only hold numbers of a specified type. There are different kinds of typed array for different kinds of numerical data. For now we will use Float32Array, which holds 32-bit floating point numbers. Once you have a typed array, you can use it much like a regular array, but when you assign any value to an element of a Float32Array, the value is converted into a 32-bit floating point number. If the value cannot be interpreted as a number, it will be converted to NaN, the "not-a-number" value.

Before data can be transferred from JavaScript into an attribute variable, it must be placed into a typed array. When possible, for efficiency, you should work with typed arrays directly, rather than working with regular JavaScript arrays and then copying the data into typed arrays.

For use in WebGL, the attribute data must be transferred into a VBO (vertex buffer object). VBOs were introduced in OpenGL 1.5 and were discussed briefly in Subsection 3.4.4. A VBO is a block of memory that is accessible to the GPU. To use a VBO, you must first call the function gl.createBuffer() to create it. For example,

```js
colorBuffer = gl.createBuffer();
````
Before transferring data into the VBO, you must "bind" the VBO:
```js
gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
```

The first parameter to gl.bindBuffer is called the "target." It specifies how the VBO will be used. The target gl.ARRAY_BUFFER is used when the buffer is being used to store values for an attribute. Only one VBO at a time can be bound to a given target.

The function that transfers data into a VBO doesn't mention the VBO—instead, it uses the VBO that is currently bound. To copy data into that buffer, use gl.bufferData(). For example:
```js
gl.bufferData(gl.ARRAY_BUFFER, colorArray, gl.STATIC_DRAW);
```
The first parameter is, again, the target. The data is transferred into the VBO that is bound to that target. The second parameter is the typed array that holds the data on the JavaScript side. All the elements of the array are copied into the buffer, and the size of the array determines the size of the buffer. Note that this is a straightforward transfer of raw data bytes; WebGL does not remember whether the data represents floats or ints or some other kind of data.

The third parameter to gl.bufferData is one of the constants gl.STATIC_DRAW, gl.STREAM_DRAW, or gl.DYNAMIC_DRAW. It is a hint to WebGL about how the data will be used, and it helps WebGL to manage the data in the most efficient way. The value gl.STATIC_DRAW means that you intend to use the data many times without changing it. For example, if you will use the same data throughout the program, you can load it into a buffer once, during initialization, using gl.STATIC_DRAW. WebGL will probably store the data on the graphics card itself where it can be accessed most quickly by the graphics hardware. The second value, gl.STEAM_DRAW, is for data that will be used only once, or at most a few times. (It can be "streamed" to the card when it is needed.) The value gl.DYNAMIC_DRAW is somewhere between the other two values; it is meant for data that will be used multiple times, but with modifications.

Getting attribute data into VBOs is only part of the story. You also have to tell WebGL to use the VBO as the source of values for the attribute. To do so, first of all, you need to know the location of the attribute in the shader program. You can determine that using gl.getAttribLocation. For example,

```js
colorAttribLoc = gl.getAttribLocation(prog, "a_color");
```
This assumes that prog is the shader program and "a_color" is the name of the attribute variable in the vertex shader. This is entirely analogous to gl.getUniformLocation (except that the return value is an integer, and is -1 if the requested attribute does not exist or is not active).

Although an attribute usually takes different values at different vertices, it is possible to use the same value at every vertex. In fact, that is the default behavior. The single attribute value for all vertices can be set using the family of functions gl.vertexAttrib*, which work similarly to gl.uniform*. In the more usual case, where you want to take the values of an attribute from a VBO, you must enable the use of a VBO for that attribute. This is done by calling

```js
gl.enableVertexAttribArray( colorAttribLoc );
```

where the parameter is the location of the attribute in the shader program, as returned by a call to gl.getAttribLocation(). This command has nothing to do with any particular VBO. It just turns on the use of buffers for the specified attribute. Often, it is reasonable to call this method just once, during initialization. Use of data from the VBO can be turned off by calling
```js
gl.disableVertexAttribArray( colorAttribLoc );
```

Finally, before you draw a primitive that uses the attribute data from a VBO, you have to tell WebGL which buffer contains the data and how the bits in that buffer are to be interpreted. This is done with gl.vertexAttribPointer(). The VBO must be bound to the ARRAY_BUFFER target when this function is called. For example,

```js
gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
gl.vertexAttribPointer( colorAttribLoc, 3, gl.FLOAT, false, 0, 0 );
```
Assuming that colorBuffer refers to the VBO and colorAttribLoc is the location of the attribute, this tells WebGL to take values for the attribute from that buffer. Often, you will call gl.bindBuffer() just before calling gl.vertexAttribPointer(), but that is not necessary if the desired buffer is already bound.

The first parameter to gl.vertexAttribPointer is the attribute location. The second is the number of values per vertex. For example, if you are providing values for a vec2, the second parameter will be 2 and you will provide two numbers per vertex; for a vec3, the second parameter would be 3; for a float, it would be 1. The third parameter specifies the type of each value. Here, gl.FLOAT indicates that each value is a 32-bit floating point number. Other values include gl.BYTE, gl.UNSIGNED_BYTE, gl.UNSIGNED_SHORT, and gl.SHORT for integer values. Note that in WebGL 1.0, all attributes are floating point values; if you provide integer values for an attribute, they will be converted to floating point. The parameter value should match the data type in the buffer. For example, if the data came from a Float32Array, then the parameter should be gl.FLOAT. For the last three parameters in a call to gl.vertexAttribPointer, I will always use false, 0, and 0. These parameters add flexibility that I won't need; you can look them up in the documentation if you are interested. (The false parameter has to do with how integer values are converted into floating point values.)

In WebGL 2.0, attribute variables can have integer type. When ```gl.vertexAttribPointer()``` is used to configure an attribute, the values provided for the attribute will always be converted to floating point, so it is inappropriate for integer-valued attributes. For use with integer-valued attributes, WebGL 2.0 introduces a new function, ```gl.vertexAttribIPointer()``` that works correctly with integer data.

There is a lot to take in here. Using a VBO to provide values for an attribute requires six separate commands, and that is in addition to generating the data and placing it in a typed array. Here is the full set of commands:

```js
colorAttribLoc = gl.getAttribLocation( prog, "a_color" );
colorBuffer = gl.createBuffer();
gl.enableVertexAttribArray( colorAttribLoc );
gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
gl.vertexAttribPointer( colorAttribLoc, 3, gl.FLOAT, false, 0, 0 );
gl.bufferData( gl.ARRAY_BUFFER, colorArray, gl.STATIC_DRAW );
```
However, the six commands will not always occur at the same point in the JavaScript code. The first three commands are often done as part of initialization. gl.bufferData would be called whenever the data for the attribute needs to be changed; it might be used just once during initialization, or it might be used whenever the data needs to be modified. gl.bindBuffer must be called before gl.vertexAttribPointer or gl.bufferData, since it establishes the VBO that is used by those two commands. Remember that all of this must be done for every attribute that is used in the shader program.

