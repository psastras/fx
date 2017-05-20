import * as THREE from 'three'
import { EffectComposer, RenderPass } from 'postprocessing'

abstract class Scene {

  protected readonly clock: THREE.Clock
  protected readonly element: HTMLElement
  protected readonly scene: THREE.Scene
  protected readonly renderer: THREE.Renderer | any
  protected readonly camera: THREE.Camera
  protected readonly callRender: boolean
  protected readonly composer: any

  constructor(element: HTMLElement, callRender: boolean = true) {
    this.clock = new THREE.Clock()
    this.element = element
    this.callRender = callRender
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
      this.composer.setSize(this.element.clientWidth, this.element.clientHeight)
      this.renderer.setSize(this.element.clientWidth, this.element.clientHeight)
    }, false)

    this.camera = this.setupCamera(this.element.clientWidth, this.element.clientHeight)
    this.renderer.setSize(this.element.clientWidth, this.element.clientHeight)

    this.composer = new EffectComposer(this.renderer)
    this.composer.setSize(this.element.clientWidth, this.element.clientHeight)
    const passes = [ new RenderPass(this.scene, this.camera), ...this.passes() ]
    passes[passes.length - 1].renderToScreen = true
    passes.forEach((pass) => this.composer.addPass(pass))
  }

  public run(): void {
    requestAnimationFrame(this.run.bind(this))
    this.render(this.clock.getDelta())
    if (this.callRender) {
      this.composer.render(this.clock.getDelta())
    }
  }

  protected abstract passes(): any[]

  protected abstract render(dt: number): void

  protected setupCamera(width: number, height: number): THREE.Camera {
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 0.5
    return camera
  }
}

export default Scene