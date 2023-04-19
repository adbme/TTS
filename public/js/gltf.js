const loader = new THREE.GLTFLoader();
let mixer;
let clip1, clip2, action1, action2;

const playButtons = [document.getElementById('bouton-play1'), document.getElementById('roomTitle1'), document.getElementById('roomTitle2'), document.getElementById('roomTitle3')];

const playButton2 = [document.getElementById('bouton-play2'),
document.getElementById('roomTitle4'),
document.getElementById('roomTitle5'),
document.getElementById('roomTitle6'),
document.getElementById('roomTitle7'),
document.getElementById('roomTitle8'),
document.getElementById('roomTitle9'),
document.getElementById('roomTitle10')];

loader.load('/gltfImport/final.glb', function (gltf) {
    gltf.scene.position.set(0, -50, 0);
    gltf.scene.scale.set(20, 20, 20);
    scene.add(gltf.scene);
    mixer = new THREE.AnimationMixer(gltf.scene);

    clip1 = gltf.animations[0];
    clip2 = gltf.animations[1];

    action1 = mixer.clipAction(clip1);
    action2 = mixer.clipAction(clip2);

    action1.setLoop(THREE.LoopOnce);
    action1.clampWhenFinished = true;
    action1.timeScale = 0;

    action2.setLoop(THREE.LoopOnce);
    action2.clampWhenFinished = true;
    action2.timeScale = 0;
});

// animation play-button commence à 0 sec et finis 2 secondes après 
playButtons.forEach(button => {
    button.addEventListener('click', function () {
        action1.stop();
        action2.stop();
        action1.time = 0;
        action1.timeScale = 1;
        action1.play();

        action2.time = 0;
        action2.timeScale = 1;
        action2.play();

        setTimeout(() => {
            action1.paused = true;
            action2.paused = true;
            // 2 sec ->
        }, 2000);
    });
});

playButton2.forEach(button => {
    button.addEventListener('click', function () {
        action1.stop();
        action2.stop();
        action1.time = 4;
        action1.timeScale = 1;
        action1.play();

        // animation play-button2 commence à 4 secondes et finis 3 sec après
        action2.time = 4;
        action2.timeScale = 1;
        action2.play();

        setTimeout(() => {
            action1.paused = true;
            action2.paused = true;
            // 3 sec ->
        }, 3000);
    });
});






function animate() {
    requestAnimationFrame(animate);
    if (mixer) {
        mixer.update(clock.getDelta());
    }
    controls.update();
    render();
}