import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import bumpMapUrl from '../../assets/backgrounds_objects/planet_Bog1200.png'

function AlienSphere({ size, rotationSpeed, color = 0x5a14b4, emissive = 0x1a0440 }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.z = 2.5

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(size, size)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    // Lights
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.6)
    dirLight.position.set(4, 3, 5)
    scene.add(dirLight)

    const ambientLight = new THREE.AmbientLight(0x2a0a4a)
    scene.add(ambientLight)

    // Geometry
    const geometry = new THREE.SphereGeometry(1, 64, 64)

    // Texture
    const textureLoader = new THREE.TextureLoader()
    const bumpMap = textureLoader.load(bumpMapUrl)

    // Material
    const material = new THREE.MeshStandardMaterial({
      color,
      emissive,
      emissiveIntensity: 0.3,
      roughness: 0.55,
      metalness: 0.1,
      bumpMap,
      bumpScale: 0.45,
    })

    // Mesh
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Animation loop
    let animId
    const angularSpeed = (2 * Math.PI) / (rotationSpeed * 60)

    function animate() {
      animId = requestAnimationFrame(animate)
      sphere.rotation.y += angularSpeed
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animId)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [size, rotationSpeed, color, emissive])

  return (
    <div
      ref={mountRef}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    />
  )
}

export default AlienSphere
