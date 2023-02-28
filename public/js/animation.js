// Jungfrau
const jubgfrau = document.getElementById('roomTitle10')
const jubgfrauTl = gsap.timeline();
jubgfrau.addEventListener('click', function () {
    jubgfrauTl.to(camera.position, {
        z: 300,
        x: -40,
        y: 200,
        onUpdate: function () {
            // Pointer la caméra vers le cube

        }
    })
        .to(camera.position, {
            z: -50,
            x: -50,
            y: 170,
            onUpdate: function () {
                // Pointer la caméra vers le cube

            }
        });
});


// Wengen
const wengen = document.getElementById('roomTitle9')
const wengenTl = gsap.timeline();
wengen.addEventListener('click', function () {
    wengenTl.to(camera.position, {
        z: 300,
        x: 100,
        y: 200,
        onUpdate: function () {


        }
    })
    wengenTl.to(camera.position, {
        z: 340,
        x: 120,
        y: 20,
        onUpdate: function () {


        }
    })
});

// Pleiade
const pleiades = document.getElementById('roomTitle1')
const plaiadesTl = gsap.timeline();
pleiades.addEventListener('click', function () {

    plaiadesTl.to(camera.position, {
        z: 300,
        x: 100,
        y: 200,
        onUpdate: function () {


        }
    })
    plaiadesTl.to(camera.position, {
        z: 0,
        x: 12,
        y: 20,
        onUpdate: function () {



        }
    })
});

// Suchet
const suchet = document.getElementById('roomTitle2')
const suchetTl = gsap.timeline();
suchet.addEventListener('click', function () {

    suchetTl.to(camera.position, {
        z: 300,
        x: 100,
        y: 200,
        onUpdate: function () {


        }
    })
    suchetTl.to(camera.position, {
        z: 0,
        x: 20,
        y: 2,
        onUpdate: function () {
            camera.position.x += -13; // zoom avant

        }
    })

});


// Chasseron
const chasseron = document.getElementById('roomTitle3')
const chasseronTL = gsap.timeline();
chasseron.addEventListener('click', function () {
    chasseronTL.to(camera.position, {
        z: 300,
        x: 100,
        y: 200,
        onUpdate: function () {


        }
    })
    chasseronTL.to(camera.position, {
        z: 4,
        x: 20,
        y: 6,
        onUpdate: function () {
            camera.position.x += -13; // zoom avant

        }
    })
});

// Argentine
const argentine = document.getElementById('roomTitle4')
const argentineTL = gsap.timeline();
argentine.addEventListener('click', function () {
    argentineTL.to(camera.position, {
        z: 300,
        x: 100,
        y: 200,
        onUpdate: function () {


        }
    })
    argentineTL.to(camera.position, {
        z: -60,
        x: -140,
        y: 140,
        onUpdate: function () {


        }
    })
});

// Chamossaire
const chamossaire = document.getElementById('roomTitle5')
const chamossaireTL = gsap.timeline();
chamossaire.addEventListener('click', function () {
    chamossaireTL.to(camera.position, {
        z: 300,
        x: 100,
        y: 200,
        onUpdate: function () {


        }
    })
    chamossaireTL.to(camera.position, {
        z: 40,
        x: -140,
        y: 140,
        onUpdate: function () {


        }
    })
});

// Mönch
const monch = document.getElementById('roomTitle6')
const monchTL = gsap.timeline();
monch.addEventListener('click', function () {
    monchTL.to(camera.position, {
        z: 300,
        x: 100,
        y: 200,
        onUpdate: function () {


        }
    })
    monchTL.to(camera.position, {
        z: 50,
        x: -85,
        y: 150,
        onUpdate: function () {


        }
    })
});

// Eiger
const eiger = document.getElementById('roomTitle7')
const eigerTL = gsap.timeline();
eiger.addEventListener('click', function () {
    eigerTL.to(camera.position, {
        z: 300,
        x: 100,
        y: 200,
        onUpdate: function () {


        }
    })
    eigerTL.to(camera.position, {
        z: 30,
        x: -60,
        y: 150,
        onUpdate: function () {


        }
    })
});

// DentDuMidi
const dentDuMidi = document.getElementById('roomTitle8')
const dentDuMidiTL = gsap.timeline();
dentDuMidi.addEventListener('click', function () {
    dentDuMidiTL.to(camera.position, {
        z: -300,
        x: -300,
        y: 300,
        onUpdate: function () {


        }
    })
    dentDuMidiTL.to(camera.position, {
        z: 30,
        x: -20,
        y: 170,
        onUpdate: function () {


        }
    })
});
