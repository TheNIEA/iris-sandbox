import * as THREE from 'three'

export function initThreeJS() {
  const canvas = document.getElementById('background-canvas')
  if (!canvas) {
    console.error('Canvas element not found')
    return
  }

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
  
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.position.z = 5

  // Add your Three.js objects and animation here
  // Example: Add a simple cube
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
  }

  animate()

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}
