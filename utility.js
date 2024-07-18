var jellyCount = 3;
var timer;
var isAnimating = false;
const transZmax = 10;
var transZ=3;
var planeBack;
var planeUnder;
var fish1;
var autorot = 0;
var translateY = 0.0; 
var translateYbubble = 0.0; 
var tran = [];
var tranrock = [];
var tranbubble = [];


function InitWebGL()
{
	// Initialize the WebGL canvas
	canvas = document.getElementById("canvas");
	canvas.oncontextmenu = function() {return false;};
	gl = canvas.getContext("webgl", {antialias: false, depth: true});	// Initialize the GL context
	if (!gl) {
		alert("Unable to initialize WebGL. Your browser or machine may not support it.");
		return;
	}
	
	// Initialize settings
	gl.viewport(0, 0, canvas.width, canvas.height);
    //gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
	
    planeBack = new PlaneDrawer();
	planeBack.setTexture("./textures/sea1.jpg");
	planeUnder = new PlaneDrawer();
	planeUnder.setTexture("./textures/sabbia.jpg");

	
	
	var objBubbleUrl = "./obj/bubbsph.obj";
	var imgBubbleUrl = "./textures/bubb.png";
	// bubble1
	var bubble1 = new fishDrawer(0.1);
	LoadMeshAndSetup(bubble1, objBubbleUrl, imgBubbleUrl);
	bubbleDrawers.push(bubble1);
	tranbubble.push([-1.5, -1.3, 0, 0.05]);
	// bubble2
	var bubble2 = new fishDrawer(0.1);
	LoadMeshAndSetup(bubble2, objBubbleUrl, imgBubbleUrl);
	bubbleDrawers.push(bubble2);
	tranbubble.push([-1.5, -1, 0, 0.08]);
	// bubble3
	var bubble3 = new fishDrawer(0.1);
	LoadMeshAndSetup(bubble3, objBubbleUrl, imgBubbleUrl);
	bubbleDrawers.push(bubble3);
	tranbubble.push([-1.2, -1.2, 0, 0.08]);
	// bubble4
	var bubble4 = new fishDrawer(0.1);
	LoadMeshAndSetup(bubble4, objBubbleUrl, imgBubbleUrl);
	bubbleDrawers.push(bubble4);
	tranbubble.push([-1.7, -1.1, 0, 0.08]);
	// bubble5
	var bubble5 = new fishDrawer(0.1);
	LoadMeshAndSetup(bubble5, objBubbleUrl, imgBubbleUrl);
	bubbleDrawers.push(bubble5);
	tranbubble.push([-1.6, -0.9, 0, 0.08]);
	// bubble6
	var bubble6 = new fishDrawer(0.1);
	LoadMeshAndSetup(bubble6, objBubbleUrl, imgBubbleUrl);
	bubbleDrawers.push(bubble6);
	tranbubble.push([1.6, -0.9, 0, 0.08]);
	// bubble7
	var bubble7 = new fishDrawer(0.1);
	LoadMeshAndSetup(bubble7, objBubbleUrl, imgBubbleUrl);
	bubbleDrawers.push(bubble7);
	tranbubble.push([2.3, -1.2, 0, 0.08]);
	// bubble8
	var bubble8 = new fishDrawer(0.1);
	LoadMeshAndSetup(bubble8, objBubbleUrl, imgBubbleUrl);
	bubbleDrawers.push(bubble8);
	tranbubble.push([2.3, -1.5, 0.3, 0.08]);
	// bubble9
	var bubble9 = new fishDrawer(0.1);
	LoadMeshAndSetup(bubble9, objBubbleUrl, imgBubbleUrl);
	bubbleDrawers.push(bubble9);
	tranbubble.push([2, -0.9, 2, 0.08]);
	


	var objrock1 = "./obj/stone_1.obj";
	var objrock2 = "./obj/stone_2.obj";
	var objrock3 = "./obj/stone_3.obj";
	var objrock4 = "./obj/stone_4.obj";
	var objrock5 = "./obj/stone_5.obj";
	var imgrock1 = "./textures/Rock_02_UV_H_CM_1.jpg";
	var imgrock2 = "./textures/Craggy_Rock_With_Moss_UV_CM_1.jpg";
	var imgrock3 = "./textures/Craggy_Stone_With_Green_Moss_Litchen_UV_CM_1.jpg";
	var imgrock4 = "./textures/Stone_06_UV_H_CM_1.jpg";
	var imgrock5 = "./textures/Very_Craggy_Grey_Rock_Moss_UV_CM_1.jpg";
	
	
	// rock1
	var rock1 = new fishDrawer();
	LoadMeshAndSetup(rock1, objrock1, imgrock3);
	rockDrawers.push(rock1);
	tranrock.push([-2.5, -1, 0, 1]);
	
	// rock2
	var rock2 = new fishDrawer();
	LoadMeshAndSetup(rock2, objrock2, imgrock2);
	rockDrawers.push(rock2);
	tranrock.push([-1.6, -1.3, 0, 1]);
	// rock3
	var rock3 = new fishDrawer();
	LoadMeshAndSetup(rock3, objrock2, imgrock2);
	rockDrawers.push(rock3);
	tranrock.push([-2, -1, -1.1, 0.3]);
	// rock4
	var rock4 = new fishDrawer();
	LoadMeshAndSetup(rock4, objrock1, imgrock2);
	rockDrawers.push(rock4);
	tranrock.push([0, -1.8, 1, 0.5]);
	// rock5
	var rock5 = new fishDrawer();
	LoadMeshAndSetup(rock5, objrock4, imgrock2);
	rockDrawers.push(rock5);
	tranrock.push([-0.5, -1.7, 1.3, 0.4]);
	// rock6
	var rock6 = new fishDrawer();
	LoadMeshAndSetup(rock6, objrock3, imgrock2);
	rockDrawers.push(rock6);
	tranrock.push([-0.70, -1.7, 1.3, 0.3]);
	// rock7
	var rock7 = new fishDrawer();
	LoadMeshAndSetup(rock7, objrock5, imgrock3);
	rockDrawers.push(rock7);
	tranrock.push([4, -1.7, 1.3, 0.7]);
	// rock8
	var rock8 = new fishDrawer();
	LoadMeshAndSetup(rock8, objrock1, imgrock4);
	rockDrawers.push(rock8);
	tranrock.push([2, -1.7, 1.3, 0.5]);
	// rock9
	var rock9 = new fishDrawer();
	LoadMeshAndSetup(rock9, objrock2, imgrock5);
	rockDrawers.push(rock9);
	tranrock.push([2.38, -1, -1.3, 0.5]);
	// rock10
	var rock10 = new fishDrawer();
	LoadMeshAndSetup(rock10, objrock3, imgrock2);
	rockDrawers.push(rock10);
	tranrock.push([-1.3, -1, -1.1, 0.3]);
	// rock11
	var rock11 = new fishDrawer();
	LoadMeshAndSetup(rock11, objrock4, imgrock2);
	rockDrawers.push(rock11);
	tranrock.push([1.3, -1, -1.1, 0.3]);
	// rock12
	var rock12 = new fishDrawer();
	LoadMeshAndSetup(rock12, objrock4, imgrock2);
	rockDrawers.push(rock12);
	tranrock.push([2.8, -1.6, 1.5, 0.6]);
	// rock13
	var rock13 = new fishDrawer();
	LoadMeshAndSetup(rock13, objrock1, imgrock2);
	rockDrawers.push(rock13);
	tranrock.push([1, -1.9, 1.8, 0.9]);
	// rock14
	var rock14 = new fishDrawer();
	LoadMeshAndSetup(rock14, objrock5, imgrock2);
	rockDrawers.push(rock14);
	tranrock.push([0, -1.7, 2.2, 0.8]);
	var rock15 = new fishDrawer();
	LoadMeshAndSetup(rock15, objrock2, imgrock5);
	rockDrawers.push(rock15);
	tranrock.push([1, -1.5, 0, 0.35]);
	
	var stonePortal = new fishDrawer();
	LoadMeshAndSetup(stonePortal, "./obj/StonePortal1.obj", imgrock1);
	rockDrawers.push(stonePortal);
	tranrock.push([0, -0.5, 1.9, 6]);
	var stonePortal = new fishDrawer();
	LoadMeshAndSetup(stonePortal, "./obj/StonePortal1.obj", imgrock1);
	rockDrawers.push(stonePortal);
	tranrock.push([0, -0.5, 1.9, 2]);
	
	
	// fish
	var obj1 = "./obj/medusa.obj";
    var img1 = "./textures/medusa.jpg";
	fish1 = new fishDrawer();
    LoadMeshAndSetup(fish1, obj1, img1);
    fishDrawersfissi.push(fish1);
    
	var fixedFish = fishDrawersfissi.length;
	for (let i = 0; i < jellyCount - fixedFish; i++) {
		let fish = new fishDrawer();

		let img2 = "./textures/medusa2.png";
	
		let img = Math.random() < 0.5 ? img1 : img2;
	
		LoadMeshAndSetup(fish, obj1, img);
		fishDrawers.push(fish);
	}
	
	for (var i = 0; i < fishDrawers.length; i++) {
		var transX = Math.random() * 5 - 3;
		var transY = Math.random() * 3 - 2;
		var transZ = Math.random() * 2 - 1;
		var scale = Math.random() * 2-0.5;
		
		tran.push([transX, transY, transZ, scale]);
	}


	updateGlobalLightDir();
    updateGlobalAmbient();
	updateFogAmount();
	updateFogColor();

	UpdateCanvasSize();
}

// Called every time the window size is changed.
function UpdateCanvasSize()
{
	canvas.style.width  = "100%";
	canvas.style.height = "100%";
	const pixelRatio = window.devicePixelRatio || 1;
	canvas.width  = pixelRatio * canvas.clientWidth;
	canvas.height = pixelRatio * canvas.clientHeight;
	const width  = (canvas.width  / pixelRatio);
	const height = (canvas.height / pixelRatio);
	canvas.style.width  = width  + 'px';
	canvas.style.height = height + 'px';
	gl.viewport( 0, 0, canvas.width, canvas.height );
	UpdateProjectionMatrix();
}

function ProjectionMatrix( c, z, fov_angle=60 )
{
	var r = c.width / c.height;
	var n = (z - 1.74);
	const min_n = 0.001;
	if ( n < min_n ) n = min_n;
	var f = (z + 1.74);;
	var fov = 3.145 * fov_angle / 180;
	var s = 1 / Math.tan( fov/2 );
	return [
		s/r, 0, 0, 0,
		0, s, 0, 0,
		0, 0, (n+f)/(f-n), 1,
		0, 0, -2*n*f/(f-n), 0
	];
}

function UpdateProjectionMatrix()
{
	const fov = 60;
	var r = canvas.width / canvas.height;
	var n = 0.1;
	const min_n = 0.001;
	if ( n < min_n ) n = min_n;
	var f = transZmax*100;
	var ff = Math.PI * fov / 180;
	var tant_2 = Math.tan( ff/2 );
	var s = 1 / tant_2;
	perspectiveMatrix = [
		s/r, 0, 0, 0,
		0, s, 0, 0,
		0, 0, -(n+f)/(f-n), -1,
		0, 0, -2*n*f/(f-n), 0
	];
}

function DrawScene()
{
	perspectiveMatrix = ProjectionMatrix( canvas, transZ );

	var mv1  = GetModelViewMatrix( 1, 0.2, 0, transZ+3.7, 3.14/2,  0 );
	var mvp1 = MatrixMult( perspectiveMatrix, mv1 );
	var nrmTrans1 = [ mv1[0],mv1[1],mv1[2], mv1[4],mv1[5],mv1[6], mv1[8],mv1[9],mv1[10] ];
	
	var mv2  = GetModelViewMatrix(  0.5, 0, translateY + 0, transZ, rotX + 5,  autorot+rotY );
	var mvp2 = MatrixMult( perspectiveMatrix, mv2 );
	var nrmTrans2 = [ mv2[0],mv2[1],mv2[2], mv2[4],mv2[5],mv2[6], mv2[8],mv2[9],mv2[10] ];

	var mv3  = GetModelViewMatrix( 1, 0, 0, transZ, 0,  3.14/2 );
	var mvp3 = MatrixMult( perspectiveMatrix, mv3 );
	var nrmTrans3 = [ mv3[0],mv3[1],mv3[2], mv3[4],mv3[5],mv3[6], mv3[8],mv3[9],mv3[10] ];

	// Clear the screen and the depth buffer.
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	
	planeBack.draw(mvp1,mv1,nrmTrans1);
	planeUnder.draw(mvp3, mv3, nrmTrans3);
	
	
	fish1.draw(mvp2, mv2,nrmTrans2);
	
	
	for (var i = 0; i< bubbleDrawers.length; i++){

		var mv  = GetModelViewMatrix( tranbubble[i][3], tranbubble[i][0],  tranbubble[i][1]+ translateYbubble, transZ, rotX,    autorot+rotY+3.14 );
		var mvp = MatrixMult( perspectiveMatrix, mv );
		var nrmTrans = [ mv[0],mv[1],mv[2], mv[4],mv[5],mv[6], mv[8],mv[9],mv[10] ];
	
		
		bubbleDrawers[i].draw(mvp, mv, nrmTrans);
    }
   
	for (var i = 0; i< fishDrawers.length; i++){

		var mv  = GetModelViewMatrix( tran[i][3], tran[i][0],  tran[i][1]+ translateY, transZ, 0.0+rotX,  autorot + rotY );
		var mvp = MatrixMult( perspectiveMatrix, mv );
		var nrmTrans = [ mv[0],mv[1],mv[2], mv[4],mv[5],mv[6], mv[8],mv[9],mv[10] ];
	
		
		fishDrawers[i].draw(mvp, mv, nrmTrans);
    }

	for (var i = 0; i< rockDrawers.length; i++){

		var mv  = GetModelViewMatrix( tranrock[i][3], tranrock[i][0],  tranrock[i][1] ,  tranrock[i][2]+transZ, 0, rotY );
		var mvp = MatrixMult( perspectiveMatrix, mv );
		var nrmTrans = [ mv[0],mv[1],mv[2], mv[4],mv[5],mv[6], mv[8],mv[9],mv[10] ];
	
		
		rockDrawers[i].draw(mvp, mv, nrmTrans);
    }
   
	
}

function InitShaderProgram( vsSource, fsSource )
{
	const vs = CompileShader( gl.VERTEX_SHADER,   vsSource );
	const fs = CompileShader( gl.FRAGMENT_SHADER, fsSource );

	const prog = gl.createProgram();
	gl.attachShader(prog, vs);
	gl.attachShader(prog, fs);
	gl.linkProgram(prog);

	if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
		alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(prog));
		return null;
	}
	return prog;
}

function CompileShader( type, source )
{
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter( shader, gl.COMPILE_STATUS) ) {
		alert('An error occurred compiling shader:\n' + gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}


function LoadMeshAndSetup(drawer, objUrl, textureUrl) {
    drawer.mesh.load(objUrl, () => {
        var box = drawer.mesh.getBoundingBox();
        var shift = [
            -(box.min[0] + box.max[0]) / 2,
            -(box.min[1] + box.max[1]) / 2,
            -(box.min[2] + box.max[2]) / 2
        ];
        var size = [
            (box.max[0] - box.min[0]) / 2,
            (box.max[1] - box.min[1]) / 2,
            (box.max[2] - box.min[2]) / 2
        ];
        
		var maxSize = Math.max( size[0], size[1], size[2] );
		var scale = 1/maxSize;
		drawer.mesh.shiftAndScale( shift, scale );
		
        LoadTexture(drawer, textureUrl, () => {
           
            var buffers = drawer.mesh.getVertexBuffers();

            drawer.setMesh(buffers.positionBuffer, buffers.texCoordBuffer, buffers.normalBuffer);

            DrawScene();
        });
    });
}

function LoadTexture(drawer, textureUrl, callback) {
    var img = new Image();
    img.onload = function() {
        drawer.setTexture(img);
        
        if (callback) callback();
    };
    img.src = textureUrl;
}



// Multiplies two matrices and returns the result A*B.
// The arguments A and B are arrays, representing column-major matrices.
function MatrixMult( A, B )
{
	var C = [];
	for ( var i=0; i<4; ++i ) {
		for ( var j=0; j<4; ++j ) {
			var v = 0;
			for ( var k=0; k<4; ++k ) {
				v += A[j+4*k] * B[k+4*i];
			}
			C.push(v);
		}
	}
	return C;
}

function GetModelViewMatrix( scale, translationX, translationY, translationZ, rotationX, rotationY )
{
	
	var scaleMatrix = [
        [scale, 0, 0, 0],
        [0, scale, 0, 0],
        [0, 0, scale, 0],
        [0, 0, 0, 1]
    ];

	var transl= [
		[1, 0, 0, translationX],
		[0, 1, 0, translationY],
		[0, 0, 1, translationZ],
		[0, 0, 0, 1]
	];
	
	var rotx=[
		[1, 0, 0, 0],
		[0, Math.cos(-rotationX), Math.sin(-rotationX), 0],
		[0, -Math.sin(-rotationX), Math.cos(-rotationX), 0], 
		[0, 0, 0, 1]
	];

	var roty=[
		[Math.cos(-rotationY), 0, -Math.sin(-rotationY), 0 ],
		[0, 1, 0, 0],
		[Math.sin(-rotationY), 0, Math.cos(-rotationY), 0 ],
		[0, 0, 0, 1]
	];

	transl = ColumnMajorOrder(transl);
	rotx = ColumnMajorOrder(rotx);
	roty = ColumnMajorOrder(roty);
	scaleMatrix = ColumnMajorOrder(scaleMatrix);

	// first apply scale, translation, rotation

	var trans1 = MatrixMult(transl, scaleMatrix);
	var trans2 = MatrixMult(trans1, roty);
	var trans = MatrixMult(trans2, rotx);
	
	var mv = trans;
	return mv;
}

function ColumnMajorOrder(matri){
	var vec=[];
	var righe=matri.length;
	var colonne=matri[0].length;
	for (var j=0; j<colonne; j++){
		for (var i=0; i<righe; i++){
			vec.push(matri[i][j]);  
		}
	}

	return vec;
}

function WindowResize()
{
	UpdateCanvasSize();
	DrawScene();
}



function Animate() {
    if (isAnimating) {
        clearInterval(timer);
        document.getElementById('auto-rotate').value = 'Animate';
        isAnimating = false;
    } else {
        timer = setInterval(function() {
            var v = document.getElementById('rotation-speed').value;
            autorot += 0.0009 * v;
            if (autorot > 2 * Math.PI) autorot -= 2 * Math.PI;
            translateY += 0.001 * v;
            var vbubble = document.getElementById('rotation-speedbubble').value;
            translateYbubble += 0.001 * vbubble;
            DrawScene();
        }, 1);
        document.getElementById('rotation-speed').disabled = false;
        document.getElementById('auto-rotate').value = 'Stop Animation';
        isAnimating = true;
    }
}


function ShowControls()
{
	var c = document.getElementById('controls');
	c.style.display = c.style.display == 'none' ? '' : 'none';
}

function IncCount( inc )
{
	var c = parseInt(document.getElementById('count-value').innerText);
	c += inc;
	if ( c < 1 ) c = 1;
	if ( c > 100 ) c = 100;
	SetCount( c );
	jellyCount = c; 
	
	NewScene();
}

function SetCount( c )
{
	document.getElementById('count-value').innerText = c;
	jellyCount = c;
	

}

function NewScene()
{
	//gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Qui impostiamo il colore di sfondo a nero
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  

	translateY = 0; 
	translateYbubble = 0; 
	transZ = 3;
	rotX = 0;
	autorot = 0; 
	rotY = 0;
	fishDrawers = [];
	fishDrawersfissi = [];
	tran = [];

	InitWebGL();
	DrawScene();
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

