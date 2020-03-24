import './style/main.styl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import Cubes from './javascript/Cubes.js'
import Hangar from './javascript/Hangar.js'
import James from './javascript/James.js'

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Scene
 */
const scene = new THREE.Scene()

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.position.x = 5
directionalLight.position.y = 5
directionalLight.position.z = 5
scene.add(directionalLight)

/**
 * JAMES
 */

const hangar = new Hangar()
scene.add(hangar.group)

// const action = () =>{
//     const action = james.mixer.clipAction( james.graffiti,  james.root );
//     action.time = 0;
//     // james.mixer.stopAllAction();
//     action.loop = THREE.LoopOnce;
//     // action.fadeIn(5);
//     action.play();
//     console.log(james.graffiti);
//     console.log(james.mixer);
//     console.log(james);

// }
// setTimeout(() =>{
//     action()
// },10000)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 30
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearAlpha(0)
document.body.appendChild(renderer.domElement)

/**
 * cameraControls
 */
const cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.zoomSpeed = 0.3
cameraControls.enableDamping = true
/**
 * Resize
 */
window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Loop
 */
let clock = new THREE.Clock();

const loop = () =>
{
    const dt = clock.getDelta();
    window.requestAnimationFrame(loop)

    // if (james.mixer!=undefined) james.mixer.update(dt);

    // Render
    renderer.render(scene, camera)
}

loop()