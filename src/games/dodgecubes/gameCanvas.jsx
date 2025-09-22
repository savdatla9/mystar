import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import useKeyboard from './useKeyboard.jsx'

/**
 * Vanilla Three.js inside React:
 * - Creates a renderer on a <canvas>
 * - Simple top-down arena
 * - Player (sphere) moves with keyboard/joystick
 * - Dodge randomly spawned cubes; collision = game over
 * - Score increases over time
 */
export default function GameCanvas({ useTouch }) {
  const canvasRef = useRef(null)
  const keys = useKeyboard()

  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem('bestScore') || 0))
  const [dead, setDead] = useState(false)

  // joystick state read via window event
  const joy = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onJoy = (e) => { joy.current = e.detail || { x: 0, y: 0, direction: '' } }
    window.addEventListener('joystick-move', onJoy)
    return () => window.removeEventListener('joystick-move', onJoy)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0d0f1a)

    const camera = new THREE.OrthographicCamera(-8, 8, 4.5, -4.5, 0.1, 100)
    camera.position.set(0, 10, 0)
    camera.lookAt(0, 0, 0)

    // Lighting
    const hemi = new THREE.HemisphereLight(0xffffff, 0x222233, 1.0)
    scene.add(hemi)

    // Arena (plane)
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 10),
      new THREE.MeshStandardMaterial({ color: 0x182033, metalness: 0.1, roughness: 0.9 })
    )
    plane.rotation.x = -Math.PI / 2
    scene.add(plane)

    // Player
    const player = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x4fd1c5, emissive: 0x062e2a })
    )
    player.position.set(0, 0.4, 0)
    scene.add(player)

    // Obstacles pool
    const obstacles = []
    const obstacleGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7)
    const obstacleMat = new THREE.MeshStandardMaterial({ color: 0xfb7185, emissive: 0x29030a })

    // HUD lines (bounds)
    const bounds = { x: 9.5, z: 4.5 } // slightly inside plane size
    const playerVel = new THREE.Vector2(0, 0)
    const MAX_SPEED = 5
    const ACCEL = 12
    const FRICTION = 8

    // Spawn logic
    let spawnTimer = 0
    let spawnEvery = 0.9 // seconds

    // Score
    let t = 0
    let running = true

    // Resize
    const onResize = () => {
      const w = canvas.clientWidth || canvas.parentElement.clientWidth
      const h = canvas.clientHeight || (canvas.parentElement.clientHeight || window.innerHeight - 120)
      renderer.setSize(w, h, false)
      // Keep ortho size constant; adjust aspect by expanding left/right
      const aspect = w / h
      const viewHeight = 9
      camera.top = viewHeight / 2
      camera.bottom = -viewHeight / 2
      camera.left = -viewHeight * aspect / 2
      camera.right = viewHeight * aspect / 2
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)
    onResize()

    // Restart handler
    const onKey = (e) => {
      if (e.code === 'Space') restart()
    }
    window.addEventListener('keydown', onKey)

    function spawnObstacle() {
      const m = new THREE.Mesh(obstacleGeo, obstacleMat.clone())
      m.position.set(
        (Math.random() < 0.5 ? -1 : 1) * (Math.random() * bounds.x),
        0.35,
        (Math.random() * 2 - 1) * bounds.z
      )
      // Velocity aims roughly toward player area
      const speed = 1.5 + Math.random() * 2.0
      const dir = new THREE.Vector2(
        (Math.random() * 0.6 + 0.4) * (m.position.x > 0 ? -1 : 1),
        (Math.random() * 2 - 1) * 0.6
      ).normalize().multiplyScalar(speed)
      m.userData.vx = dir.x
      m.userData.vz = dir.y
      scene.add(m)
      obstacles.push(m)
    }

    function resetGame() {
      // Clear obstacles
      obstacles.forEach(o => scene.remove(o))
      obstacles.length = 0
      // Reset player & state
      player.position.set(0, 0.4, 0)
      playerVel.set(0, 0)
      spawnTimer = 0
      spawnEvery = 0.9
      t = 0
      running = true
      setScore(0)
      setDead(false)
    }

    function restart() {
      resetGame()
    }

    // Collision test (AABB ~ sphere/cube)
    function collide(a, b, r = 0.45) {
      const dx = Math.abs(a.position.x - b.position.x)
      const dz = Math.abs(a.position.z - b.position.z)
      return (dx < r + 0.35) && (dz < r + 0.35)
    }

    let last = performance.now()
    // const clock = new THREE.Clock()

    function loop(now) {
      const dt = Math.min((now - last) / 1000, 0.033)
      last = now

      if (running) {
        t += dt
        setScore(prev => {
          const s = prev + dt * 10 | 0
          return s
        })

        // Difficulty ramp
        spawnEvery = Math.max(0.35, 0.9 - t * 0.02)

        // Input (keyboard)
        const input = new THREE.Vector2(
          (keys.current.right ? 1 : 0) - (keys.current.left ? 1 : 0),
          (keys.current.up ? 1 : 0) - (keys.current.down ? 1 : 0)
        )

        // Merge joystick if enabled
        if (useTouch) {
          const j = joy.current
          input.x += j.x
          input.y += j.y
        }

        // Normalize if necessary
        if (input.lengthSq() > 1) input.normalize()

        // Acceleration
        playerVel.x += input.x * ACCEL * dt
        playerVel.y += input.y * ACCEL * dt

        // Friction
        const fr = Math.max(0, 1 - FRICTION * dt)
        playerVel.multiplyScalar(fr)

        // Clamp speed
        if (playerVel.length() > MAX_SPEED) {
          playerVel.setLength(MAX_SPEED)
        }

        // Integrate
        player.position.x += playerVel.x * dt
        player.position.z += playerVel.y * dt

        // Bounds
        player.position.x = THREE.MathUtils.clamp(player.position.x, -bounds.x, bounds.x)
        player.position.z = THREE.MathUtils.clamp(player.position.z, -bounds.z, bounds.z)

        // Spawn
        spawnTimer += dt
        if (spawnTimer >= spawnEvery) {
          spawnTimer = 0
          spawnObstacle()
        }

        // Update obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const o = obstacles[i]
          o.position.x += o.userData.vx * dt
          o.position.z += o.userData.vz * dt

          // bounce on arena edges
          if (Math.abs(o.position.x) > bounds.x) o.userData.vx *= -1
          if (Math.abs(o.position.z) > bounds.z) o.userData.vz *= -1

          // collision
          if (collide(player, o)) {
            running = false
            setDead(true)
            setBest(prev => {
              const newBest = Math.max(prev, Math.floor(t * 10))
              localStorage.setItem('bestScore', String(newBest))
              return newBest
            })
          }
        }
      }

      renderer.render(scene, camera)
      requestAnimationFrame(loop)
    }

    resetGame()
    requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
      renderer.dispose()
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose?.()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose?.())
          else obj.material.dispose?.()
        }
      })
    }
  }, [useTouch])

  return (
    <div className="game-wrap">
      <canvas ref={canvasRef} className="game-canvas" />
      <div className="hud bottom">
        <div className="score">
          <span>Score: {score}</span>
          <span>Best: {best}</span>
        </div>
        {dead && (
          <div className="banner">
            <strong>Game Over</strong> — press <kbd>Space</kbd> to restart
          </div>
        )}
      </div>
    </div>
  )
}