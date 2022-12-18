# WebGL - Shader creation

The code for creating a shader program is always pretty much the same, so it is convenient to pack it into a reusable function. 

```js
/**
 * Creates a program for use in the WebGL context gl, and returns the
 * identifier for that program.  If an error occurs while compiling or
 * linking the program, an exception of type Error is thrown.  The error
 * string contains the compilation or linking error. 
 */
function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
   let vsh = gl.createShader( gl.VERTEX_SHADER );
   gl.shaderSource( vsh, vertexShaderSource );
   gl.compileShader( vsh );
   if ( ! gl.getShaderParameter(vsh, gl.COMPILE_STATUS) ) {
      throw new Error("Error in vertex shader:  " + gl.getShaderInfoLog(vsh));
   }
   let fsh = gl.createShader( gl.FRAGMENT_SHADER );
   gl.shaderSource( fsh, fragmentShaderSource );
   gl.compileShader( fsh );
   if ( ! gl.getShaderParameter(fsh, gl.COMPILE_STATUS) ) {
      throw new Error("Error in fragment shader:  " + gl.getShaderInfoLog(fsh));
   }
   let prog = gl.createProgram();
   gl.attachShader( prog, vsh );
   gl.attachShader( prog, fsh );
   gl.linkProgram( prog );
   if ( ! gl.getProgramParameter( prog, gl.LINK_STATUS) ) {
      throw new Error("Link error in program:  " + gl.getProgramInfoLog(prog));
   }
   return prog;
}
```

There is one more step: You have to tell the WebGL context to use the program. If prog is a program identifier returned by the above function, this is done by calling

```js
gl.useProgram( prog );
```