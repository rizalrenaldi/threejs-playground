import '../style.css'
import * as THREE from 'three';
import * as dat from 'dat.gui';

//loader
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('./textures/2K-aluminium_foil_1_normal.png')

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

// Light 1
const pointLight = new THREE.PointLight(0xa9d5ff)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
pointLight.intensity = 0.6
scene.add(pointLight)

const light1 = gui.addFolder('light front')

light1.add(pointLight.position, 'x').min(-3).max(3).step(0.01)
light1.add(pointLight.position, 'y').min(-6).max(6).step(0.01)
light1.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight, 'intensity').min(0).max(10).step(0.01)

const light1Color = {
    color: 0xa9d5ff
}

light1.addColor(light1Color, 'color')
            .onChange(() => {
                pointLight.color.set(light1Color.color)
            })

// Light 2
const pointLight2 = new THREE.PointLight(0xff9658, 2)
pointLight2.position.set(-3,0.41,0.4)
pointLight2.intensity = 2
scene.add(pointLight2)

const light2 = gui.addFolder('light left')

light2.add(pointLight2.position, 'x').min(-10).max(3).step(0.01)
light2.add(pointLight2.position, 'y').min(-10).max(6).step(0.01)
light2.add(pointLight2.position, 'z').min(-10).max(3).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0xff9658
}

light2.addColor(light2Color, 'color')
            .onChange(() => {
                pointLight2.color.set(light2Color.color)
            })

// gui.add(pointLight.position, 'x').min(-3).max(3).step(0.01)
// gui.add(pointLight.position, 'y').min(-6).max(6).step(0.01)
// gui.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
// gui.add(pointLight, 'intensity').min(0).max(10).step(0.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)

// Light 3
const pointLight3 = new THREE.PointLight(0x87ff, 2)
pointLight3.position.set(2.5,0.01,-0.93)
pointLight3.intensity = 1.7
scene.add(pointLight3)

const light3 = gui.addFolder('light right')

light3.add(pointLight3.position, 'x').min(-3).max(3).step(0.01)
light3.add(pointLight3.position, 'y').min(-6).max(6).step(0.01)
light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light3Color = {
    color: 0x87ff
}

light3.addColor(light3Color, 'color')
            .onChange(() => {
                pointLight3.color.set(light3Color.color)
            })

// const pointLightHelper = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper)

function addStar() {
	const geometry = new THREE.SphereGeometry(0.25,24,24)
	const material = new THREE.MeshStandardMaterial({color:0xffffff, transparent:true, opacity:0.3})
	const star = new THREE.Mesh(geometry,material)

	const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
	star.position.set(x,y,z)
	scene.add(star)
}

Array(400).fill().forEach(addStar)


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



