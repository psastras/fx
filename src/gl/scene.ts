import * as THREE from 'three'
import { EffectComposer, RenderPass } from 'postprocessing'

abstract class Scene {

  protected clock: THREE.Clock
  protected element: HTMLCanvasElement
  protected scene: THREE.Scene
  protected renderer: THREE.WebGLRenderer
  protected camera: THREE.Camera
  protected callRender: boolean
  protected composer: any

  public init(element: HTMLCanvasElement, callRender: boolean = true): void {
    this.clock = new THREE.Clock()
    this.element = element
    this.callRender = callRender
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({ canvas: element, alpha: true, antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
    this.renderer.setClearColor(0xffffff, 0)
    this.camera = this.setupCamera(this.element.clientWidth, this.element.clientHeight)
    this.renderer.setSize(this.element.clientWidth, this.element.clientHeight)

    this.composer = new EffectComposer(this.renderer)
    this.composer.setSize(this.element.clientWidth, this.element.clientHeight)
    const passes = [new RenderPass(this.scene, this.camera), ...this.passes()]
    passes[passes.length - 1].renderToScreen = true
    passes.forEach((pass) => this.composer.addPass(pass))
    this.setup()

    window.addEventListener('resize', this.onWindowResize, false)
  }

  public dispose(): void {
    window.removeEventListener('resize', this.onWindowResize, false)
    this.composer.dispose()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
  }

  public run(): void {
    requestAnimationFrame(this.run.bind(this))
    this.render(this.clock.getDelta())
    if (this.callRender) {
      this.composer.render(this.clock.getDelta())
    }
  }

  protected abstract setup(): void

  protected abstract passes(): any[]

  protected abstract render(dt: number): void

  protected setupCamera(width: number, height: number): THREE.Camera {
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 0.5
    return camera
  }

  private onWindowResize = () => {
    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = this.element.clientWidth / this.element.clientHeight
      this.camera.updateProjectionMatrix()
    }
    this.composer.setSize(this.element.clientWidth, this.element.clientHeight)
    this.renderer.setSize(this.element.clientWidth, this.element.clientHeight)
  }
}

export default Scene