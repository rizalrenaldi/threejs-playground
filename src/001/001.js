import '../style.css'
import * as THREE from 'three';
import * as dat from 'dat.gui';
// import SceneManager from '../sceneManager/scene';
// import gsap from 'gsap';

//loader
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('./textures/SheetMetal002_1K_NormalGL.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('#canvas')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const ballGeo = new THREE.SphereBufferGeometry(.75, 64, 64)
// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xff0000)

const stdmaterial = new THREE.MeshStandardMaterial()
stdmaterial.metalness = 0.7
stdmaterial.roughness = 0.5
stdmaterial.color = new THREE.Color(0x292929)
stdmaterial.normalMap = normalTexture

// Mesh
const sphere = new THREE.Mesh(ballGeo,stdmaterial)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
pointLight.intensity = 0.3
scene.add(pointLight)

// Light 2
const pointLight2 = new THREE.PointLight(0xffe1, 2)
pointLight2.position.set(-2.23,0.22,-1.78)
pointLight2.intensity = 10
scene.add(pointLight2)

// gui.add(pointLight.position, 'x').min(-3).max(3).step(0.01)
// gui.add(pointLight.position, 'y').min(-6).max(6).step(0.01)
// gui.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
// gui.add(pointLight, 'intensity').min(0).max(10).step(0.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)

// Light 3
const pointLight3 = new THREE.PointLight(0x87ff, 2)
pointLight3.position.set(2.45,0.22,-0.93)
pointLight3.intensity = 10
scene.add(pointLight3)

// const light3 = gui.addFolder('light 3')

// gui.add(pointLight2.position, 'x').min(-3).max(3).step(0.01)
// gui.add(pointLight2.position, 'y').min(-6).max(6).step(0.01)
// gui.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
// gui.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// const light2Color = {
//     color: 0xff0000
// }

// light3.addColor(light2Color, 'color')
//             .onChange(() => {
//                 pointLight2.color.set(light2Color.color)
//             })

// const pointLightHelper = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// this.renderer.setPixelRatio(devicePixelRatio)




/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(ev) {
    mouseX = (ev.clientX - windowX)
    mouseY = (ev.clientY - windowY)
}

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.position.z += -.5 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()
    // const control = new OrbitControls(
//     camera,
//     renderer.domElement
//   )
//   control.enablePan = false
//   control.enableZoom = false
//   control.autoRotate = false;
//   control.autoRotateSpeed = 6;
//   control.enableDamping = true

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



