getroomstatus()
setInterval(getroomstatus, 5 * 60 * 1000)


// script pour json : 

const positions = [
    {
        roomName: "lausanne.pleiades@jobtrek.ch",
        position: { x: -20, y: 30, z: -20 }
    },
    {
        roomName: "lausanne.suchet@jobtrek.ch",
        position: { x: -130, y: 30, z: 20 }
    },
    {
        roomName: "lausanne.chasseron@jobtrek.ch",
        position: { x: -130, y: 30, z: -60 }
    },
    {
        roomName: "lausanne.argentine@jobtrek.ch",
        position: { x: -140, y: 160, z: -70 }
    },
    {
        roomName: "lausanne.chamossaire@jobtrek.ch",
        position: { x: -140, y: 160, z: 40 }
    },
    {
        roomName: "lausanne.monch@jobtrek.ch",
        position: { x: 20, y: 1000, z: 10 }
    },
    {
        roomName: "lausanne.eiger@jobtrek.ch",
        position: { x: 20, y: 1000, z: 10 }
    },
    {
        roomName: "lausanne.dent-du-midi@jobtrek.ch",
        position: { x: -20, y: 160, z: 40 }
    },

    {
        roomName: "lausanne.wengen@jobtrek.ch",
        position: { x: 140, y: 140, z: -20 }
    },

    {
        roomName: "lausanne.jungfrau@jobtrek.ch",
        position: { x: -10, y: 170, z: -70 }
    }
]

function getroomstatus() {
    // console.log("you know man")
    fetch('/schedules.json')
        .then(response => response.json())
        .then(salles => {
            // Création de la liste
            // console.log(salles)
            for (let salle of positions) {

                // console.log(salle)

                let room = salles.find(s => {
                    return s.roomName === salle.roomName
                })

                addLight(salle.position, room.availability)

            }
        });
}



function addLight(position, disponibilité) {

    let couleur = disponibilité === "Available" ? 'green' : '#4b0082'

    let spotLight = new THREE.SpotLight(couleur, 96);

    spotLight.position.set(position.x, position.y, position.z);

    spotLight.angle = Math.PI / 2;
    spotLight.penumbra = 0.5;
    spotLight.decay = 2;
    spotLight.distance = 100;

    scene.add(spotLight);
    currentSpotLight = spotLight;


    // const lightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(lightHelper);
}