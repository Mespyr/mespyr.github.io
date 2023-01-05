var vertex_shader_code = `precision mediump float;
attribute vec2 vert_position;
void main()
{
	gl_Position = vec4(vert_position, 0.0, 1.0);
}
`

var fragment_shader_code = `precision mediump float;
void main()
{
	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

const canvas = document.querySelector("#display-webgl");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gl = canvas.getContext("webgl");

gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);

var vertex_shader = gl.createShader(gl.VERTEX_SHADER);
var fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex_shader, vertex_shader_code);
gl.shaderSource(fragment_shader, fragment_shader_code);

gl.compileShader(vertex_shader);
gl.compileShader(fragment_shader);
if (!gl.getShaderParameter(vertex_shader, gl.COMPILE_STATUS))
	console.error("error compiling vertex shader", gl.getShaderInfoLog(vertex_shader));
if (!gl.getShaderParameter(fragment_shader, gl.COMPILE_STATUS))
	console.error("error compiling fragment shader", gl.getShaderInfoLog(fragment_shader));

var program = gl.createProgram();
gl.attachShader(program, vertex_shader);
gl.attachShader(program, fragment_shader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS))
	console.error("error linking program", gl.getProgramInfoLog(program));
gl.validateProgram(program);
if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
	console.error("error validating program", gl.getProgramInfoLog(program));

var triangle_vertices = [
	0.0, 0.5,
	-0.5, -0.5,
	0.5, -0.5
];

var triangle_buffer_object = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, triangle_buffer_object);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle_vertices), gl.STATIC_DRAW);

var pos_attrib_loc = gl.getAttribLocation(program, "vert_position");
gl.vertexAttribPointer(
	pos_attrib_loc, 2, gl.FLOAT, gl.FALSE,
	2 * Float32Array.BYTES_PER_ELEMENT, 0
);
gl.enableVertexAttribArray(pos_attrib_loc);

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);
