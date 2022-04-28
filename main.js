import './style.css'

import * as THREE from 'three.js';

import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const ambientLight = new THREE.AmbientLight( 0x404040 )
ambientLight.intensity = .1;
scene.add( ambientLight );

const renderScene = new RenderPass(scene, camera);

const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );

const params = {
  exposure: 0,
  bloomStrength: .5,
  bloomThreshold: 0,
  bloomRadius: 1,
  scene: 'Scene with Glow'
};

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

const bloomComposer = new EffectComposer( renderer );
bloomComposer.renderToScreen = false;
bloomComposer.addPass( renderScene );
bloomComposer.addPass( bloomPass );

const finalPass = new ShaderPass(
	new THREE.ShaderMaterial( {
		uniforms: {
			baseTexture: { value: null },
			bloomTexture: { value: bloomComposer.renderTarget2.texture }
		},
		vertexShader: document.getElementById( 'vertexshader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
		defines: {}
	} ), 'baseTexture'
);
finalPass.needsSwap = true;

const finalComposer = new EffectComposer( renderer );
finalComposer.addPass( renderScene );
finalComposer.addPass( finalPass );


// renderer.render(scene, camera);


const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set(0,0,0);
light.shadow.mapSize.x = 4096;
light.shadow.mapSize.y = 4096;

scene.add(light);


// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 10);
// scene.add(lightHelper, gridHelper);


const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  material.emissive = new THREE.Color(0xffffff);
  material.emissiveIntensity = 1;
  const sphere = new THREE.Mesh(geometry, material);
  
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
  sphere.position.set(x, y, z);
  scene.add(sphere);
}

Array(200).fill().forEach(addStar);


const loader = new GLTFLoader();
let moon;
let earth;
let sun;
let mars;
let venus;
let jupiter;
let saturn;
let uranus;
let neptune;

const marsLockGeo = new THREE.SphereGeometry(0.5, 10, 10);
const marsLockMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const marsLock = new THREE.Mesh(marsLockGeo, marsLockMat);
scene.add(marsLock);

const earthLockGeo = new THREE.SphereGeometry(0.5, 15, 15);
const earthLockMatr = new THREE.MeshStandardMaterial({ color: 0xffff11 });
const earthLock = new THREE.Mesh(earthLockGeo, earthLockMatr);
scene.add(earthLock);

const moonLockGeo = new THREE.SphereGeometry(0.5, 10, 10);
const moonLockMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const moonLock = new THREE.Mesh(moonLockGeo, moonLockMat);
scene.add(moonLock);

const venusLockGeo = new THREE.SphereGeometry(0.5, 10, 10);
const venusLockMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const venusLock = new THREE.Mesh(venusLockGeo, venusLockMat);
scene.add(venusLock);

const jupiterLockGeo = new THREE.SphereGeometry(0.5, 10, 10);
const jupiterLockMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const jupiterLock = new THREE.Mesh(jupiterLockGeo, jupiterLockMat);
scene.add(jupiterLock);

const saturnLockGeo = new THREE.SphereGeometry(0.5, 10, 10);
const saturnLockMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const saturnLock = new THREE.Mesh(saturnLockGeo, saturnLockMat);
scene.add(saturnLock);

const uranusLockGeo = new THREE.SphereGeometry(0.5, 10, 10);
const uranusLockMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const uranusLock = new THREE.Mesh(uranusLockGeo, uranusLockMat);
scene.add(uranusLock);

const neptuneLockGeo = new THREE.SphereGeometry(0.5, 10, 10);
const neptuneLockMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const neptuneLock = new THREE.Mesh(neptuneLockGeo, neptuneLockMat);
scene.add(neptuneLock);


loader.load ('./objects/neptune.glb', function (gltf) {
  neptune = gltf.scene;
  neptune.position.setX(70);
  neptuneLock.add(neptune);
}, undefined, function ( error ) {
  console.error( error );
});

loader.load ('./objects/uranus.glb', function (gltf) {
  uranus = gltf.scene;
  uranus.position.setX(60);
  uranusLock.add(uranus);
}, undefined, function ( error ) {
  console.error( error );
});

loader.load ('./objects/saturn.glb', function (gltf) {
  saturn = gltf.scene;
  saturn.position.setX(50);
  saturnLock.add(saturn);
}, undefined, function ( error ) {
  console.error( error );
});

loader.load ('./objects/jupiter.glb', function (gltf) {
  jupiter = gltf.scene;
  jupiter.position.setX(40);
  jupiterLock.add(jupiter);
  jupiter.receiveShadow = true;
}, undefined, function ( error ) {
  console.error( error );
});

loader.load ('./objects/venus.glb', function (gltf) {
  venus = gltf.scene;
  venus.position.setX(12);
  venusLock.add(venus);
  venus.castShadow = true;
}, undefined, function ( error ) {
  console.error( error );
});

loader.load ('./objects/mars.glb', function (gltf) {
  mars = gltf.scene;
  mars.position.setX(25);
  marsLock.add(mars);
}, undefined, function ( error ) {
  console.error( error );
});

loader.load ('./objects/moon.glb', function (gltf) {
  moon = gltf.scene;
  moon.position.setX(3);
  moon.castShadow = true;
  moon.receiveShadow = true;
  moonLock.add(moon);
}, undefined, function ( error ) {
  console.error( error );
});

loader.load ('./objects/earth.glb', function (gltf) {
  earth = gltf.scene;
  earth.add(moonLock);
  earth.receiveShadow = true;
  earth.castShadow = true;
  earthLock.add(earth)
  earth.position.setX(20);
}, undefined, function ( error ) {
  console.error( error );
});

loader.load ('./objects/sun.glb', function (gltf) {
  sun = gltf.scene;
  sun.castShadow = true;
  
  scene.add(sun);
  sun.layers.enable(BLOOM_SCENE);
  // sun.add(earthLock);
}, undefined, function ( error ) {
  console.error( error );
});



let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

document.addEventListener('mousedown', onDocumentMouseDown, false);


var quaternion = new THREE.Quaternion();
var object = moon;
// quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ).normalize(), 0.005 );
// object.position.applyQuaternion( quaternion );
// renderer.render(scene, camera);

let isPlay = true;

document.addEventListener("keydown", (event) => {
  const keyName = event.key;

  if (keyName === "p" && isPlay) {
    isPlay = !isPlay;
    console.log(isPlay);
    animate2();
  }
  else if (keyName === "p" && !isPlay) {
    isPlay = !isPlay;
    animate1();
    return;
  }
});

function onDocumentMouseDown(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    console.log(intersects[0].object.name);
  }
}

let uniforms = {
  globalBloom: {value: 1}
}

const materials = {};
const darkMaterial = new THREE.MeshBasicMaterial( { color: 'black' } );

function restoreMaterial( obj ) {

  if ( materials[ obj.uuid ] ) {

    obj.material = materials[ obj.uuid ];
    delete materials[ obj.uuid ];

  }

}

function darkenNonBloomed( obj ) {

  if ( obj.name != 'star9' ) {
    // console.log(obj.name);

    materials[ obj.uuid ] = obj.material;
    obj.material = darkMaterial;

  }

}

function animate2() {
  if (isPlay) {
    return;
  }

  requestAnimationFrame(animate2);
  sun.layers.toggle(BLOOM_SCENE);
  scene.traverse( darkenNonBloomed );
	bloomComposer.render();
	scene.traverse( restoreMaterial );

  const spaceTexture = new THREE.TextureLoader().load('./space.jpg');
  scene.background = spaceTexture;

  
  finalComposer.render();
  // controls.update();
}

function animate1() {
  if (!isPlay) {
    return;
  }

  requestAnimationFrame(animate1);

  neptuneLock.rotation.y += .00005;
  neptune.rotation.y += .0003;
  uranusLock.rotation.y += .00009;
  // uranus.rotation.y += .00009;
  uranus.rotation.x += .005;
  saturnLock.rotation.y += .0003;
  saturn.rotation.y += .003;
  jupiterLock.rotation.y += .0007;
  jupiter.rotation.y += .004;
  venusLock.rotation.y += .005;
  venus.rotation.y += .01;
  earthLock.rotation.y += .003;
  // earthLock.rotation.z += .001;
  earth.rotation.y += .01;
  moonLock.rotation.y += .01;
  marsLock.rotation.y += .001;
  mars.rotation.y += .01;
  sun.rotation.y += .004;

  // controls.update();

  sun.layers.toggle(BLOOM_SCENE);
  scene.traverse( darkenNonBloomed );
	bloomComposer.render();
	scene.traverse( restoreMaterial );

  const spaceTexture = new THREE.TextureLoader().load('./space.jpg');
  scene.background = spaceTexture;
  
  finalComposer.render();
  // renderer.render(scene, camera);
}

animate1();