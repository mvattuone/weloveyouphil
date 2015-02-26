var buildCube = function(l,w,d) { 
	var geometry = new THREE.BoxGeometry(l,w,d);
	var material = new THREE.MeshLambertMaterial({ 
        color: generateColor(), 
        ambient: generateColor(),
        map: THREE.ImageUtils.loadTexture('hero.jpg')
    });
	var cube = new THREE.Mesh(geometry, material);
	return cube;
}

var buildText = function() {

	var materialFront = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF
	});

    var materialSide = new THREE.MeshBasicMaterial({
        color: 0x6D9BC3
    });

    var materialArray = [materialFront, materialSide];
    var textGeom = new THREE.TextGeometry("We Love You Phil ", {
        size: 8,
        height: 8,
        curveSegments: 0,
        font: 'helvetiker',
        bevelThickness: 0.5,
        bevelSize: 1,
        bevelEnabled: true,
        material: 0,
        extrudeMaterial: 1
    });

    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
	var textMesh = new THREE.Mesh(textGeom, textMaterial);
	return textMesh;
}

// render loop
var render = function() {
    var j;
	requestAnimationFrame(render);

	cubes.map(function(cube) {
        cube.original_position = cube.position.x;
        if (cube.position.x <= 210) {
            cube.position.x += 4
        } else {
            cube.position.x = -200;
        }
	});

	texts.map(function(text) {
		if (text.position.x >= 200) {
			text.position.x = -200;
		} else {
			text.position.x += 3;
		}
	});

	var k = 0;
	for(var i = 12; i < cubes.length; i++) {
        var scale = window.array[k] / 2;
        cubes[i].scale.z = (scale < 1 ? 200 : scale);
        cubes[i].position.x = (scale < 1 ? 200 : scale);
        k += (k < window.array.length ? 1 : 0);
	}

    if (j % 3 == 0 ) {
        camera.position.z += 9.5;
        if (camera.position.z <= 900) {
            return true;
        } else {
            camera.position.z = 0;
        }
    }

	renderer.render( scene, camera );
    j++;
}

var createScene = function() {
	window.scene = new THREE.Scene();
	window.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 10000);
	window.renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	camera.position.set( 0, 100, 250 );

    window.cubes = [];
    window.texts = [];
    var i;
    var x = 0,
	    y = 0,
	    z = 0;
    for (i=0; i<12; i++) {
    	

    	cubes.push(buildCube(10,15,10));
	    cubes[i].position.set(-24 * x, 30 * y, z - 20);
	    
	    x++;
        y++;
        z++;
    }

    var x = 0,
	    y = 0,
	    z = 0;

    for (i=0; i<12; i++) {
    	cubes.push(buildCube(10,15,15));
	    cubes[i].position.set(-24 * x, 30 * y, z - 20);
	    x++;
        y++;
        z++;
    }


    cubes.map(function(cube) {
    	scene.add(cube);
    })

    var x = 0,
	    y = 0,
	    z = 0;

   	for (i=0; i<12; i++) {
    	cubes.push(buildCube(250,15,10));
	    cubes[12+i].position.set(24 * x, 30 * y, z - 20);
	    x++;
        y++;
        z++;
    }

    var x = 0,
    	y = 0,
    	z = 0;

   	for (i=0; i<12; i++) {
    	cubes.push(buildCube(250,15,10));
	    cubes[12+i].position.set(24 * x, 30 * y, z - 20);
	    x++;
        y++;
        z++;
    }

    cubes.map(function(cube) {
    	scene.add(cube);
    })

    var x = 0,
	    y = 0,
	    z = 0;
    for (i=0; i<18; i++) {
    	texts[i] = buildText();
    	texts[i].position.set(47 * x, (45 * y) + 5, 0);
    	scene.add(texts[i]);
    	x++;
    	y++;
    	z++;
    }

    var ambientLight = new THREE.AmbientLight(0x000044);
    scene.add(ambientLight);
  
    // directional lighting
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

 	

    render(scene, renderer, camera);
		
}

