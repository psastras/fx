import * as THREE from 'three'

abstract class Scene {

  protected readonly element: HTMLElement
  protected readonly scene: THREE.Scene
  protected readonly renderer: THREE.Renderer | any
  protected readonly camera: THREE.Camera

  protected prevTimestamp: number

  constructor(element: HTMLElement) {
    this.element = element
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
    this.renderer.setClearColor(0xffffff, 0)
    this.element.appendChild(this.renderer.domElement)

    window.removeEventListener('resize', () => {
      // no-op
    })
    window.addEventListener('resize', () => {
      if (this.camera instanceof THREE.PerspectiveCamera) {
        this.camera.aspect = this.element.clientWidth / this.element.clientHeight
        this.camera.updateProjectionMatrix()
      }
      this.renderer.setSize(this.element.clientWidth, this.element.clientHeight)
    }, false)

    this.camera = this.setupCamera(this.element.clientWidth, this.element.clientHeight)
    this.renderer.setSize(this.element.clientWidth, this.element.clientHeight)
  }

  public run(timestamp?: number): void {
    const dt = (timestamp && this.prevTimestamp) ? timestamp - this.prevTimestamp : 0
    this.prevTimestamp = timestamp
    requestAnimationFrame(this.run.bind(this))
    this.render(dt)
    this.renderer.render(this.scene, this.camera)
  }

  protected abstract render(dt: number): void

  protected setupCamera(width: number, height: number): THREE.Camera {
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 0.5
    return camera
  }
}

export default Scene