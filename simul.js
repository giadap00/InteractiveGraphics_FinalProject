//var fishDrawer;
var canvas, gl;
var perspectiveMatrix;	// perspective projection matrix
var rotX=0, rotY=0, transZ=3;
var timer;
var autoTranslateX = 0
var autoTranslateY = 0; // Variabile per la traslazione automatica
var fishDrawers = [];
var fishDrawersfissi = [];
var rockDrawers = [];
var bubbleDrawers = [];

let globalDiffuse = [1.8, 1.8, 1.8];
let globalSpecular = [5.0, 5.0, 5.0];


class fishDrawer{
    
    constructor(opacity = 1.0) {
        this.mesh = new ObjMesh1();

        this.opacity = opacity;
        this.texture = null;
        this.prog = InitShaderProgram( objVS, objFS );

        

		this.mvp = gl.getUniformLocation( this.prog, 'mvp' );
		this.mv = gl.getUniformLocation(this.prog, 'mv');
		this.normal = gl.getUniformLocation(this.prog, 'normal');
		
		this.vertPos = gl.getAttribLocation( this.prog, 'vertPos' );
		this.texCoordLocation=gl.getAttribLocation(this.prog, 'vertTexCoord' );
		this.normals= gl.getAttribLocation(this.prog, 'normals');
		

		this.vertexBuffer = gl.createBuffer();
		this.textureCoorBuffer = gl.createBuffer();
		this.normalsBuffer=gl.createBuffer();

		this.sampler = gl.getUniformLocation(this.prog, "sampler");
        this.lightDirection = gl.getUniformLocation(this.prog, 'lightDirection');
        this.ambientLight = gl.getUniformLocation(this.prog, 'ambientLight');
        this.diffuseLight = gl.getUniformLocation(this.prog, 'diffuseLight');
        this.specularLight = gl.getUniformLocation(this.prog, 'specularLight');
        this.viewPosition = gl.getUniformLocation(this.prog, 'viewPosition');


        this.opac = gl.getUniformLocation(this.prog, 'opacity');
        this.opacity = opacity;
        // Set light parameters
        this.diffuse = globalDiffuse;
        this.specular = globalSpecular;

        this.fogColorLocation = gl.getUniformLocation(this.prog, "u_fogColor");
        this.fogAmountLocation = gl.getUniformLocation(this.prog, "u_fogAmount");
		
    }

    


    
    

    setMesh( vertPos, texCoords, normals ){

        this.numTriangles = vertPos.length / 3;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertPos), gl.STATIC_DRAW );
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW );
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    }

    draw( matrixMVP, matrixMV, matrixNormal )
	{   
       
        
		// [TO-DO] Complete the WebGL initializations before drawing
        gl.useProgram(this.prog);

		gl.uniformMatrix4fv(this.mvp, false, matrixMVP);
		gl.uniformMatrix4fv(this.mv, false, matrixMV);
		gl.uniformMatrix3fv(this.normal, false, matrixNormal);
		
        // Bind the texture
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        gl.uniform1f(this.opac, this.opacity);
		gl.uniform3fv(this.diffuseLight, this.diffuse);
        gl.uniform3fv(this.specularLight, this.specular);
        gl.uniform3fv(this.viewPosition, [0.0, 0.0, transZ]); // Example view position

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.vertexAttribPointer(this.vertPos, 3, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray(this.vertPos);
		

		gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoorBuffer);
		gl.vertexAttribPointer(this.texCoordLocation, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray(this.texCoordLocation);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
		gl.vertexAttribPointer(this.normals, 3, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray(this.normals);

		gl.drawArrays( gl.TRIANGLES, 0, this.numTriangles );
		
	}

    // This method is called to set the texture of the mesh.
	// The argument is an HTML IMG element containing the texture data.
	setTexture(img) {
        gl.useProgram(this.prog);
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        
        // Set the parameters so we can render any size image
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        
        // Upload the image into the texture
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        
        this.texture = texture;
    }
    setLightDir( x, y, z )
	{
		// [TO-DO] set the uniform parameter(s) of the fragment shader to specify the light direction.
		gl.useProgram(this.prog);
		gl.uniform3f(this.lightDirection, x,y,z);
		
	}
    setAmbientColor( r, g, b )
	{
		// [TO-DO] set the uniform parameter(s) of the fragment shader to specify the light direction.
		gl.useProgram(this.prog);
		gl.uniform3f(this.ambientLight, r,g,b);
		
	}

    setFogAmount(fogAmount){
        gl.useProgram(this.prog);
        gl.uniform1f(this.fogAmountLocation, fogAmount);

    }

    setFogColor(fogColor){
        gl.useProgram(this.prog);
        gl.uniform4fv(this.fogColorLocation, fogColor);
    }
}


var objVS = `
attribute vec3 vertPos;
attribute vec2 vertTexCoord;
attribute vec3 normals;

uniform mat4 mvp;
uniform mat4 mv;
uniform mat3 normal;

varying vec2 fragTexCoord;
varying vec3 fragNormal;
varying vec3 fragPosition;
varying vec3 reflectDir;
varying vec3 vLightDir;


void main()
{
    
    vec4 worldPosition = mv * vec4(vertPos, 1.0);
    gl_Position = mvp * vec4(vertPos, 1);
    fragTexCoord = vertTexCoord;
    fragNormal = normal * normals;
    fragPosition = worldPosition.xyz;

    vec3 I = normalize(worldPosition.xyz);
    reflectDir = reflect(I, normalize(fragNormal));
    
}
`;

var objFS =  `
precision mediump float;

uniform sampler2D sampler;
uniform vec3 lightDirection;
uniform vec3 ambientLight;
uniform vec3 diffuseLight;
uniform vec3 specularLight;
uniform vec3 viewPosition;
uniform float opacity;
uniform vec4 u_fogColor;
uniform float u_fogAmount;

varying vec2 fragTexCoord;
varying vec3 fragNormal;
varying vec3 fragPosition;

void main(){
    vec3 normal = normalize(fragNormal);
    vec3 lightDir = normalize(lightDirection);
    vec3 viewDir = normalize(viewPosition - fragPosition);
    vec3 reflectDir = reflect(-lightDir, normal);

    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * diffuseLight;

    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = spec * specularLight;

    vec3 ambient = ambientLight;
    vec3 lighting = ambient + diffuse + specular;

    vec4 texColor = texture2D(sampler, fragTexCoord);
    vec4 color = vec4(lighting * texColor.rgb, opacity);
    gl_FragColor = mix(color, u_fogColor, u_fogAmount);
    }
`;

class PlaneDrawer {
    constructor() {
        // Compile the shader program
        this.prog = InitShaderProgram(planeVS, planeFS);

        // Get the ids of the uniform variables in the shaders
        this.textureSampler = gl.getUniformLocation(this.prog, 'sampler');
        this.mvp = gl.getUniformLocation(this.prog, 'mvp');
        this.mv = gl.getUniformLocation(this.prog, 'mv');
        this.normal = gl.getUniformLocation(this.prog, 'normal');
        this.lightDirection = gl.getUniformLocation(this.prog, 'lightDirection');
        this.ambientLight = gl.getUniformLocation(this.prog, 'ambientLight');
        this.diffuseLight = gl.getUniformLocation(this.prog, 'diffuseLight');
        this.specularLight = gl.getUniformLocation(this.prog, 'specularLight');
        this.viewPosition = gl.getUniformLocation(this.prog, 'viewPosition');

        // Get the ids of the vertex attributes in the shaders
        this.vertPos = gl.getAttribLocation(this.prog, 'vertPos');
        this.texCoordLocation = gl.getAttribLocation(this.prog, 'vertTexCoord');
        this.normals = gl.getAttribLocation(this.prog, 'normals');

        // Light parameters (global variables should be defined elsewhere in your script)
        this.diffuse = globalDiffuse;
        this.specular = globalSpecular;

        this.fogColorLocation = gl.getUniformLocation(this.prog, "u_fogColor");
        this.fogAmountLocation = gl.getUniformLocation(this.prog, "u_fogAmount");
		

        // Create the buffer objects and load vertex data
        this.vertbuffer = gl.createBuffer();
        var pos = [
            -7.0, -2.0, -7.0,
            -7.0, -2.0, 7.0,
            7.0, -2.0, -7.0,
            7.0, -2.0, 7.0,
        ];
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertbuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);

        var normals = [
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
        ];
        this.normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

        this.texCoordBuffer = gl.createBuffer();
        var texCoord = [
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
        ];
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoord), gl.STATIC_DRAW);

        var indices = [
            0, 1, 2,
            2, 1, 3,
        ];
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        this.texture = null;
        this.numIndices = indices.length;
    }

    draw(matrixMVP, matrixMV, matrixNormal) {
        gl.useProgram(this.prog);

        gl.uniformMatrix4fv(this.mvp, false, matrixMVP);
        gl.uniformMatrix4fv(this.mv, false, matrixMV);
        gl.uniformMatrix3fv(this.normal, false, matrixNormal);
        gl.uniform3fv(this.diffuseLight, this.diffuse);
        gl.uniform3fv(this.specularLight, this.specular);
        gl.uniform3fv(this.viewPosition, [0.0, 0.0, transZ]); // Example view position

        // Set up vertex position attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertbuffer);
        gl.vertexAttribPointer(this.vertPos, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.vertPos);

        // Set up texture coordinate attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.vertexAttribPointer(this.texCoordLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.texCoordLocation);

        // Set up normal coordinate attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.vertexAttribPointer(this.normals, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.normals);

        // Bind the element array buffer and draw the plane
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.activeTexture(gl.TEXTURE0); // Activate texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(this.textureSampler, 0); // Bind the texture unit to the sampler

       
        gl.drawElements(gl.TRIANGLES, this.numIndices, gl.UNSIGNED_SHORT, 0);
    }

    // Method to set the texture of the mesh
    setTexture(imgUrl) {
        const img = new Image();
        img.onload = () => {
            gl.useProgram(this.prog);
            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);

            // Set the parameters so we can render any size image
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            // Upload the image into the texture
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

            // Generate mipmaps for the texture
            //gl.generateMipmap(gl.TEXTURE_2D);

            this.texture = texture;
        };
        img.src = imgUrl;
    }

    // Method to set the light direction
    setLightDir(x, y, z) {
        gl.useProgram(this.prog);
        gl.uniform3f(this.lightDirection, x, y, z);
    }

    // Method to set the ambient color
    setAmbientColor(r, g, b) {
        gl.useProgram(this.prog);
        gl.uniform3f(this.ambientLight, r, g, b);
    }

    setFogAmount(fogAmount){
        gl.useProgram(this.prog);
        gl.uniform1f(this.fogAmountLocation, fogAmount);

    }

    setFogColor(fogColor){
        gl.useProgram(this.prog);
        gl.uniform4fv(this.fogColorLocation, fogColor);
    }
}

// Vertex shader source code
var planeVS = `
attribute vec3 vertPos;
attribute vec2 vertTexCoord;
attribute vec3 normals;

uniform mat4 mvp;
uniform mat4 mv;
uniform mat3 normal;

varying vec2 fragTexCoord;
varying vec3 fragNormal;
varying vec3 fragPosition;
varying vec3 reflectDir;

void main() {
    vec4 worldPosition = mv * vec4(vertPos, 1.0);
    gl_Position = mvp * vec4(vertPos, 1.0);
    fragTexCoord = vertTexCoord;
    fragNormal = normal * normals;
    fragPosition = worldPosition.xyz;

    vec3 I = normalize(worldPosition.xyz);
    reflectDir = reflect(I, normalize(fragNormal));
}
`;

// Fragment shader source code
var planeFS = `
precision mediump float;

uniform sampler2D sampler;
uniform vec3 lightDirection;
uniform vec3 ambientLight;
uniform vec3 diffuseLight;
uniform vec3 specularLight;
uniform vec3 viewPosition;
uniform vec4 u_fogColor;
uniform float u_fogAmount;

varying vec2 fragTexCoord;
varying vec3 fragNormal;
varying vec3 fragPosition;

void main() {
    vec3 normal = normalize(fragNormal);
    vec3 lightDir = normalize(lightDirection);
    vec3 viewDir = normalize(viewPosition - fragPosition);
    vec3 reflectDir = reflect(-lightDir, normal);

    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * diffuseLight;

    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 50.0);
    vec3 specular = spec * specularLight;

    vec3 ambient = ambientLight;
    vec3 lighting = ambient + diffuse + specular;

    vec4 texColor = texture2D(sampler, fragTexCoord);
    vec4 color = vec4(lighting * texColor.rgb, texColor.a);
    gl_FragColor = mix(color, u_fogColor, u_fogAmount);
}
`;



function updateGlobalLightDir() {
    globalLightDir = [
        parseFloat(document.getElementById('light-x').value),
        parseFloat(document.getElementById('light-y').value),
        parseFloat(document.getElementById('light-z').value)
    ];

	var x = globalLightDir[0];
	var y = globalLightDir[1];
	var z = globalLightDir[2];
		
		fish1.setLightDir( x, y, z );
        planeBack.setLightDir( x, y, z );
        planeUnder.setLightDir( x, y, z );
    
        for (var i = 0; i< bubbleDrawers.length; i++){

            bubbleDrawers[i].setLightDir( x, y, z );
        }
       
        for (var i = 0; i< fishDrawers.length; i++){
    
            fishDrawers[i].setLightDir( x, y, z );
        }
    
        for (var i = 0; i< rockDrawers.length; i++){
    
            rockDrawers[i].setLightDir( x, y, z );
        }
	DrawScene();
	
   
    
    console.log('Updated globalLightDir:', globalLightDir);
}

function updateGlobalAmbient() {
    const color = document.getElementById('ambient-color').value;
    globalAmbient = [
        parseInt(color.substr(1, 2), 16) / 255,
        parseInt(color.substr(3, 2), 16) / 255,
        parseInt(color.substr(5, 2), 16) / 255
    ];
    
    var r = globalAmbient[0];
	var g = globalAmbient[1];
	var b = globalAmbient[2];
		
		fish1.setAmbientColor( r, g, b );
        planeBack.setAmbientColor( r, g, b );
        planeUnder.setAmbientColor( r, g, b );
    
        for (var i = 0; i< bubbleDrawers.length; i++){

            bubbleDrawers[i].setAmbientColor( r, g, b );
        }
       
        for (var i = 0; i< fishDrawers.length; i++){
    
            fishDrawers[i].setAmbientColor( r, g, b );
        }
    
        for (var i = 0; i< rockDrawers.length; i++){
    
            rockDrawers[i].setAmbientColor( r, g, b );
        }
	DrawScene();
    
    console.log('Updated globalAmbient:', globalAmbient);
}

function updateFogAmount() {
    fogAmount = parseFloat(document.getElementById('fog-amount').value);

    fish1.setFogAmount(fogAmount);
    planeBack.setFogAmount(fogAmount);
    planeUnder.setFogAmount(fogAmount);

    for (var i = 0; i < bubbleDrawers.length; i++) {
        bubbleDrawers[i].setFogAmount(fogAmount);
    }

    for (var i = 0; i < fishDrawers.length; i++) {
        fishDrawers[i].setFogAmount(fogAmount);
    }

    for (var i = 0; i < rockDrawers.length; i++) {
        rockDrawers[i].setFogAmount(fogAmount);
    }

    DrawScene();

    console.log('Updated fogAmount:', fogAmount);
}

function updateFogColor() {
    var colorHex = document.getElementById('fog-color').value;
    var opacity = parseFloat(document.getElementById('fog-opacity').value);

    // Convert Hex color to RGBA array
    var r = parseInt(colorHex.slice(1, 3), 16) / 255;
    var g = parseInt(colorHex.slice(3, 5), 16) / 255;
    var b = parseInt(colorHex.slice(5, 7), 16) / 255;
    var fogColor = [r, g, b, opacity];

    fish1.setFogColor(fogColor);
    planeBack.setFogColor(fogColor);
    planeUnder.setFogColor(fogColor);

    for (var i = 0; i < bubbleDrawers.length; i++) {
        bubbleDrawers[i].setFogColor(fogColor);
    }

    for (var i = 0; i < fishDrawers.length; i++) {
        fishDrawers[i].setFogColor(fogColor);
    }

    for (var i = 0; i < rockDrawers.length; i++) {
        rockDrawers[i].setFogColor(fogColor);
    }

    DrawScene();

    console.log('Updated fogColor:', fogColor);
}





window.onload = function() {
    
    InitWebGL();
    

    
    // Aggiungi gestore per lo zoom del canvas
// Definisci il valore massimo consentito per transZ
var maxZoomOut = 0.5;  // Modifica questo valore a seconda delle tue esigenze
var minZoomIn = 3.5;   // Modifica questo valore a seconda delle tue esigenze

// Aggiungi gestore per lo zoom del canvas
canvas.zoom = function(s) {
    // Calcola il nuovo valore di transZ
    var newTransZ = transZ * (s / canvas.height + 1);

    // Controlla se il nuovo valore supera il limite massimo di zoom (riduzione)
    if (newTransZ < maxZoomOut) {
        transZ = maxZoomOut;
    } else if (newTransZ > minZoomIn) {
        transZ = minZoomIn;
    } else {
        transZ = newTransZ;
    }

    UpdateProjectionMatrix();
    DrawScene();
};


// Gestore per lo scroll della rotella del mouse
canvas.onwheel = function(event) {
    canvas.zoom(0.3 * event.deltaY);
};



    // Gestore per il click del mouse
    canvas.onmousedown = function(event) {
        var cx = event.clientX;
        var cy = event.clientY;
        if (event.ctrlKey) {
            canvas.onmousemove = function(event) {
                canvas.zoom(5 * (event.clientY - cy));
                cy = event.clientY;
            };
        } else {
            canvas.onmousemove = function(event) {
                rotY += (cx - event.clientX) / canvas.width * 5;
                rotX += (cy - event.clientY) / canvas.height * 5;
                cx = event.clientX;
                cy = event.clientY;
                
                UpdateProjectionMatrix();
                DrawScene();
            };
        }
        
        
    };

    // Gestori per il rilascio del mouse o l'uscita dal canvas
    canvas.onmouseup = canvas.onmouseleave = function() {
        canvas.onmousemove = null;
    };


};

