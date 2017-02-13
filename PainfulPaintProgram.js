// Cap4730 / Painful Paint Program
// Source for "PainfulPaintProgram.html"
// Kasonic, Courtney

// Hit 'spacebar' to stop drawing

// Global vars

var vertexShaderText =
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'',
'void main()',
'{',
'	fragColor = vertColor;',
	'gl_Position = vec4(vertPosition, 0.0, 1.0);',
	'gl_PointSize = 10.0;',
'}'
].join('\n');

// ~ ~ ~ ~ ~

var fragmentShaderText =
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'void main()',
'{',
'	gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');

var canvas = document.getElementById('game-surface');
var gl = canvas.getContext('webgl');
var program = gl.createProgram();
var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

function Initialize() {

	if(!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
		alert('Your browser does not support WebGL :(');
	}

	gl.clearColor(0.7, 0.7, 0.7, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Creating vertex and fragment shaders

	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader :(', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader :(', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		consol.error('ERROR linking program :(', gl.getProgramInfoLog(program));
		return;
	}

	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		color.error('ERROR validating program :(', gl.getProgramInfoLog(program));
		return;
	}
};

function renderTriangle() {
	requestAnimFrame(render);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

function renderLine() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.useProgram(program);
	gl.drawArrays(gl.LINES, 0, 2);
};

function vec2(x, y) {
	xPos = this.x;
	yPos = this.y;
};

// Choose color
var colors =
[
	1.0, 0.0, 0.0, // red
	0.8, 0.3, 0.0, // orange
	0.7, 0.5, 0.0, //yellow
	0.0, 1.0, 0.0, // green
	0.0, 0.0, 1.0, // blue
	0.6, 0.0, 0.4  // purple
];

// Stop drawing
window.onkeydown = function(event) {
	var key = String.fromCharCode(event.keyCode);
	if (key == 'spacebar') {
		gl.clear(gl.CLEAR_BUFFER_BIT);
	}
};


var userClicks = [];

canvas.addEventListener("click", function getClick(e) {

			// Getting click position for drawing stuff
			//canvas.addEventListener("click", function getClick(e) {
			var event = e;
			var xPosition, yPosition;
			var canBoundX = canvas.offsetLeft;
			var canBoundY = canvas.offsetTop;

			xPosition = event.clientX - canBoundX;
			yPosition = event.clientY - canBoundY;

			//var coordinates = [xPosition, yPosition];
			//return coordinates;
			//return {'x': xPosition, 'y': yPosition};

			document.getElementById("demo").innerHTML = xPosition + ", " + yPosition;

			userClicks.push(xPosition);
			userClicks.push(yPosition);

			var numClicks = 0;

			for (var i = 0; i < userClicks.length; i++) {
				for (var j = 0; j < userClicks[i].length; j++) {
					userClicks[i][j].addEventListener("click", function () {
						// stuff to do with clicks
						//xPosition = userClicks[i];
						//yPosition = userClicks[i+1];

						window.userClicks[i][j] = userClicks;

						numClicks++;
						return (numClicks * userClicks);



					});
				}
			}

			document.getElementById("coordDemo").innerHTML = userClicks;

			// Choose color
			var colorPick = document.getElementById("colorMenu");
			colorPick.addEventListener("click", function () {
					switch (colorMenu) {
						case 0:
							break;
						case 'color1':
							colorPick = colors[0]; // red
							break;
						case 'color2':
							colorPick = colors[1]; // orange
							break;
						case 'color3':
							colorPick = colors[2]; // yellow
							break;
						case 'color4':
							colorPick = colors[3]; // green
							break;
						case 'color5':
							colorPick = colors[4]; // blue
							break;
						case 'color6':
							colorPick = colors[5]; // purple
							break;
					}
				}
			);

			// Choose shape
			var shape = document.getElementById("shapeMenu");
			shape.addEventListener("click", function () {
					switch (shapeMenu) {
						case 0:
							break;
						case 'shape1':
							drawLine(xPosition, yPosition, colorPick);
							break;
						case 'shape2':
							drawTriangle(p1, p2, p3, colorPick);
							break;
						case 'shape3':
							drawRectangle(p1, p2, p3, p4, colorPick);
							break;
						case 'shape4':
							drawPolygon(pointN, colorPick);
							break;
						case 'shape5':
							drawCircle(point, colorPick);
							break;
					}
				}
			);
});

/*function storeClicks(userX, userY, some_Array) {
	some_Array.push(userX);
	some_Array.push(userY);

	storeClicks(userX, userY, userClicks);

	for (var i = 0; i <= userClicks.length; i += 2) {
		var userX = userClicks[i];
		var userY = userClicks[i+1];
		drawLine(userX, userY, colorPick);
		document.getElementById("coordDemo").innerHTML = userClicks;
	}

	for (i = 0; i <= 10; i++) {
		for (j = 0; j <= 10; j++) {
			userClicks [someX, someY,
						i, j];
		}
	}
};*/

//storeClicks(xPosition, yPosition);

/*function getClick() {
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	var clk = vec2(-1 + 2*event.ClientX/canvas.width,
					-1 + 2*(canvas.height-event.ClientY)/canvas.height);
	gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec2']*index, clk);
};*/


function drawLine(lX, lY, aColor) {
	xPosition = this.lX;
	yPosition = this.lY;
	colorPick = this.aColor;

	var lineVertices =
		[
			xPosition, yPosition, colorPick
		];

	var lineVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineVertices), gl.STATIC_DRAW);

	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');

	gl.vertexAttribPointer(
		positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 4);

	gl.vertexAttribPointer(
		colorAttribLocation, 1, gl.FLOAT, gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 8);

	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);

	//renderLine();
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.useProgram(program);
	gl.drawArrays(gl.LINES, 0, 1);
};