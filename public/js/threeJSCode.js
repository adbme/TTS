

let gltf = null;
let mixer = null;
let clock = new THREE.Clock();
let controls;
let camera;

init();


animate();
const backgroundSphereGeometry = new THREE.SphereGeometry(1000, 1900, 32);
const backgroundSphereMaterial = new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: new THREE.CanvasTexture(generateRadialGradientCanvas())
});
const backgroundSphere = new THREE.Mesh(backgroundSphereGeometry, backgroundSphereMaterial);
scene.add(backgroundSphere);







function generateRadialGradientCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;

    const context = canvas.getContext('2d');

    const gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, 'skyblue');
    gradient.addColorStop(1, 'white');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
}
function init() {
    // Render size to match the browser
    width = window.innerWidth;
    height = window.innerHeight;


    // Create new scene
    scene = new THREE.Scene();

    // Lighting setup    
    let ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);
    const light = new THREE.SpotLight(0xFFFFFF, 2, 100, Math.PI / 4, 8);
    light.position.set(10, 25, 45);
    light.castShadow = true;
    scene.add(light);

    // Camera setup
    camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 10000);
    camera.position.set(0, 100, 0);
    console.log(camera.position)

    let geometry = new THREE.BoxGeometry(100, 5, 100);
    let material = new THREE.MeshLambertMaterial({

    });


    let manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    let loader = new THREE.GLTFLoader();
    loader.setCrossOrigin('anonymous');

    let scale = 20;
    let url = "/gltfImport/animation1.glb";



    let mixer;

    loader.load(url, function (data) {
        gltf = data;
        let object = gltf.scene;
        object.scale.set(scale, scale, scale);
        object.position.y = 2;
        object.position.x = 0;
        object.position.z = 0;
        object.castShadow = true;
        object.receiveShadow = true;

        let animations = gltf.animations;
        if (animations && animations.length) {
            mixer = new THREE.AnimationMixer(object);

        }
        scene.add(object);

        //

        //
    });

    // Create renderer and include antialiasing to smoothen edges
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xD0D3D4);
    renderer.shadowMap.enabled = true;

    // Allow user to orbit around object
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.userPan = false;
    controls.userPanSpeed = 0.0;


    //controls.autoRotate = true;



    renderer.setSize(width, height);
    renderer.gammaOutput = true;
    document.body.appendChild(renderer.domElement);
}



function animate() {


    requestAnimationFrame(animate);
    if (mixer) mixer.update(clock.getDelta());
    controls.update();
    render();

}
// Fire it up!
function render() {


    renderer.render(scene, camera);
}

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

// Grid de la box
var axes = new THREE.AxisHelper(50);
scene.add(axes);
var gridXZ = new THREE.GridHelper(1000, 40);
scene.add(gridXZ);


;



// lumières
light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1);
scene.add(light);
light = new THREE.DirectionalLight(0x002288);
light.position.set(-1, -1, -1);
scene.add(light);
light = new THREE.AmbientLight(0x222222);
scene.add(light);

//background color de la scène
scene.background = new THREE.Color('#C9EAF7');

function onWindowResize() {
    w = window.innerWidth;
    h = window.innerHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
};
window.addEventListener('resize', onWindowResize, false);
