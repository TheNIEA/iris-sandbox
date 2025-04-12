import * as THREE from 'three'

export function initThreeJS() {
  const canvas = document.getElementById('background-canvas')
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })

  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.position.z = 5

  const geometry = new THREE.TetrahedronGeometry()
  const material = new THREE.MeshStandardMaterial({ color: 0xff6b6b, emissive: 0xf06595 })
  const shapes = []

  for (let i = 0; i < 50; i++) {
    const shape = new THREE.Mesh(geometry, material)
    shape.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    )
    shape.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    )
    shapes.push(shape)
    scene.add(shape)
  }

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(5, 5, 5)
  scene.add(pointLight)

  function animate() {
    requestAnimationFrame(animate)
    shapes.forEach(shape => {
      shape.rotation.x += 0.01
      shape.rotation.y += 0.01
    })
    renderer.render(scene, camera)
  }

  animate()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}
