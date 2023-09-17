/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Sýnir notkun á "mousedown" og "mousemove" atburðum
//
//    Hjálmtýr Hafsteinsson, september 2023
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

var locPosition;
var locColor;
var bufferIdFrog;

var score = 0;
var snyrUpp = true;

var car = vec2(0.0, 0.0)

var colorFrog = vec4(0.0, 0.8, 0.1, 1.0);
var colorRoadFrame = vec4(1.0, 1.0, 1.0, 1.0);
var colorRoadMiddle = vec4(0.0, 0.0, 0.0, 1.0);

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    
    var verticesFrog = [
        vec2( -0.1, -0.95 ),
        vec2(  0.1, -0.95 ),
        vec2( 0, -0.75 ),
    ];

    var verticesRoadFrame = [
        vec2( -1, -0.375 ),
        vec2( -1, 0.275 ),
        vec2( 1, -0.375 ),
        vec2( 1, 0.275 )
    ];

    var verticesRoadMiddle = [
        vec2( -1, -0.35 ),
        vec2( -1, 0.25 ),
        vec2( 1, -0.35 ),
        vec2( 1, 0.25 )
    ];

    var verticesCar = [
        vec2( -1.25, -0.325 ),
        vec2( -1.25, 0.275 ),
        vec2( -1.05, -0.325 ),
        vec2( -1.05, 0.275 )
    ];

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    window.addEventListener("keydown", function(e){
        if (e.key === 'ArrowLeft')
            if (verticesFrog[0][0] >= -0.85) {
                for(i=0; i<3; i++) {
                    verticesFrog[i][0] -= 0.2;
                    console.log("Left");
                    console.log(verticesFrog[i][0]);
            }
        }
        if (e.key === 'ArrowRight')
            if (verticesFrog[1][0] <= 0.85) {
                for(i=0; i<3; i++) {
                    verticesFrog[i][0] += 0.2;
                    console.log("Right");
                    console.log(verticesFrog[i][0]);
            }
        }
        if (e.key === 'ArrowUp')
        if (verticesFrog[2][1] <= 0.85) {
            for(i=0; i<3; i++) {
                verticesFrog[i][1] += 0.2;
                console.log("Up");
                console.log(verticesFrog[i][1]);
            }
        }
        if (e.key === 'ArrowDown')
        if (verticesFrog[0][1] >= -0.925) {
            for(i=0; i<3; i++) {
                verticesFrog[i][1] -= 0.2;
                console.log("Down");
                console.log(verticesFrog[i][1]);
            }
        }

        gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(verticesFrog));
    } );

    bufferIdFrog = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFrog );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesFrog), gl.DYNAMIC_DRAW );

    bufferIdRoadFrame = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdRoadFrame );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesRoadFrame), gl.DYNAMIC_DRAW );

    bufferIdRoadMiddle = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdRoadMiddle );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesRoadMiddle), gl.DYNAMIC_DRAW );

    // Get location of shader variable vPosition
    locPosition = gl.getAttribLocation( program, "vPosition" );
    gl.enableVertexAttribArray( locPosition );

    locColor = gl.getUniformLocation( program, "rcolor" );

    render();
}

function render() {
    
    gl.clear( gl.COLOR_BUFFER_BIT );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdRoadFrame );
    gl.vertexAttribPointer( locPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.uniform4fv( locColor, flatten(colorRoadFrame) );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );


    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdRoadMiddle );
    gl.vertexAttribPointer( locPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.uniform4fv( locColor, flatten(colorRoadMiddle) );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFrog );
    gl.vertexAttribPointer( locPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.uniform4fv( locColor, flatten(colorFrog) );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );

  

/*  

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFrog );
    gl.vertexAttribPointer( locPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.uniform4fv( locColor, flatten(colorRoadMiddle) );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdRoadMiddle );
    gl.vertexAttribPointer( locPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.uniform4fv( locColor, flatten(colorRoadMiddle) );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
*/

    window.requestAnimFrame(render);
}
