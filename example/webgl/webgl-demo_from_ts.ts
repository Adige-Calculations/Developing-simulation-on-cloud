import { initBuffers } from "./init-buffers";  
import { drawScene } from "./draw-scene";

function main() {
  const canvas: HTMLCanvasElement | null = document.querySelector("#glcanvas");

  if (canvas === null) {
    alert("Unable to find the element with id: glcanvas.");
    return;
  }
  // Initialize the GL context
  const gl: WebGLRenderingContext | null = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);

  const vsSource: string = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
        gl_position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
    `;

  const fsSource: string = `
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }`;

  const shaderProgram: WebGLProgram | undefined = initShaderProgram(
    gl,
    vsSource,
    fsSource
  );

  if (shaderProgram === undefined) {
    alert("initialization of the shader program did not work.");
    return;
  }

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
    },
    modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
  };

  const buffer = initBuffers(gl);

  
}

function initShaderProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string
) {
  const vertexShader: WebGLShader | undefined = loadShader(
    gl,
    gl.VERTEX_SHADER,
    vsSource
  );
  const fragmentShader: WebGLShader | undefined = loadShader(
    gl,
    gl.FRAGMENT_SHADER,
    fsSource
  );

  const shaderProgram = gl.createProgram();
  if (
    shaderProgram === null ||
    vertexShader === undefined ||
    fragmentShader === undefined
  ) {
    alert("initialization of the shader program did not work.");
    return;
  }

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );
    return;
  }

  return shaderProgram;
}

function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader: WebGLShader | null = gl.createShader(type);

  if (shader === null) {
    alert("Could not create the shader");
    return;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return;
  }

  return shader;
}

main();
