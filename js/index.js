var vertex_shader_code = `precision mediump float;
attribute vec2 vert_position;
attribute vec3 vert_color;
varying vec3 frag_color;

uniform mat4 mworld;
uniform mat4 mview;
uniform mat4 mproj;

void main()
{
	frag_color = vert_color;
	gl_Position = mproj * mview * mworld * vec4(vert_position, 0.0, 1.0);
}
`

var fragment_shader_code = `precision mediump float;
varying vec3 frag_color;
void main()
{
	gl_FragColor = vec4(frag_color, 1.0);
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
gl.useProgram(program);

var triangle_vertices = [
	// x, y, z        r, g, b
	0.0,  0.5,  0.0,  1.0, 0.0, 0.0,
	-0.5, -0.5, 0.0,  0.0, 1.0, 0.0,
	0.5,  -0.5, 0.0,  0.0, 0.0, 1.0
];

var triangle_buffer_object = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, triangle_buffer_object);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle_vertices), gl.STATIC_DRAW);

// attributes
var pos_attrib_loc = gl.getAttribLocation(program, "vert_position");
var color_attrib_loc = gl.getAttribLocation(program, "vert_color");
gl.vertexAttribPointer(
	pos_attrib_loc, 3, gl.FLOAT, gl.FALSE,
	6 * Float32Array.BYTES_PER_ELEMENT, 0
);
gl.vertexAttribPointer(
	color_attrib_loc, 3, gl.FLOAT, gl.FALSE,
	6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT
);
gl.enableVertexAttribArray(pos_attrib_loc);
gl.enableVertexAttribArray(color_attrib_loc);

// uniforms
var mworld_uniform_loc = gl.getUniformLocation(program, "mworld");
var mview_uniform_loc = gl.getUniformLocation(program, "mview");
var mproj_uniform_loc = gl.getUniformLocation(program, "mproj");

var world_matrix = new Float32Array(16);
var view_matrix = new Float32Array(16);
var proj_matrix = new Float32Array(16);
glMatrix.mat4.identity(world_matrix);
glMatrix.mat4.lookAt(view_matrix, [0, 0, -2], [0, 0, 0], [0, 1, 0]);
glMatrix.mat4.perspective(proj_matrix, glMatrix.glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);

gl.uniformMatrix4fv(mworld_uniform_loc, gl.FALSE, world_matrix);
gl.uniformMatrix4fv(mview_uniform_loc, gl.FALSE, view_matrix);
gl.uniformMatrix4fv(mproj_uniform_loc, gl.FALSE, proj_matrix);

// main loop

var identity_matrix = new Float32Array(16);
glMatrix.mat4.identity(identity_matrix);
var angle = 0;
var loop = function() {
	angle = performance.now() / 1000 / 6 * 2 * Math.PI;

	// rotate shape
	glMatrix.mat4.rotate(world_matrix, identity_matrix, angle, [0, 1, 0]);
	gl.uniformMatrix4fv(mworld_uniform_loc, gl.FALSE, world_matrix);

	gl.clearColor(0.0, 0.0, 0.0, 0.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.TRIANGLES, 0, 3);

	requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
