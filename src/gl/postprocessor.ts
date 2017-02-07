import * as THREE from 'three'

interface IPass {

}

export default class PostProcessor {

  private element: HTMLElement
  private scene: THREE.Scene
  private camera: THREE.Camera
  private renderer: THREE.WebGLRenderer

  // for each pass, the processor flip flops between the two targets
  private colorBuffer1: THREE.WebGLRenderTarget
  private colorBuffer2: THREE.WebGLRenderTarget

  private colorBufferMaterial1: THREE.Material
  private colorBufferMaterial2: THREE.Material

  // orthographic camera used to render the texture screen
  private orthoCamera: THREE.OrthographicCamera
  // plane meshes used to render texture to screen
  private plane: THREE.PlaneGeometry
  private planeMesh1: THREE.Mesh
  private planeMesh2: THREE.Mesh

  private scene1: THREE.Scene
  private scene2: THREE.Scene

  constructor(element: HTMLElement, renderer: THREE.WebGLRenderer,
              scene: THREE.Scene, camera: THREE.Camera) {
    this.element = element
    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    this.orthoCamera = new THREE.OrthographicCamera(
      element.clientWidth / -2, element.clientWidth / 2, element.clientHeight / 2,
      element.clientHeight / -2, -100, 100)

    const pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1
    this.colorBuffer1 = new THREE.WebGLRenderTarget(element.clientWidth * pixelRatio,
      element.clientHeight * pixelRatio, {
        magFilter: THREE.NearestFilter,
        minFilter: THREE.NearestFilter,
      })
    this.colorBuffer2 = new THREE.WebGLRenderTarget(element.clientWidth * pixelRatio,
      element.clientHeight * pixelRatio, {
        magFilter: THREE.NearestFilter,
        minFilter: THREE.NearestFilter,
      })

    this.colorBufferMaterial1 = new THREE.MeshBasicMaterial({ map: this.colorBuffer1.texture })
    this.colorBufferMaterial2 = new THREE.MeshBasicMaterial({ map: this.colorBuffer2.texture })

    this.plane = new THREE.PlaneGeometry(element.clientWidth, element.clientHeight)
    this.planeMesh1 = new THREE.Mesh(this.plane, this.colorBufferMaterial1)
    this.planeMesh2 = new THREE.Mesh(this.plane, this.colorBufferMaterial2)

    this.scene1 = new THREE.Scene()
    this.scene2 = new THREE.Scene()

    this.scene1.add(this.planeMesh1)
    this.scene2.add(this.planeMesh2)

    window.addEventListener('resize', () => {
      this.scene1.remove(this.planeMesh1)
      this.scene2.remove(this.planeMesh2)
      this.orthoCamera.left = this.element.clientWidth / -2
      this.orthoCamera.right = this.element.clientWidth / 2
      this.orthoCamera.top = this.element.clientHeight / 2
      this.orthoCamera.bottom = this.element.clientHeight / -2
      this.orthoCamera.updateProjectionMatrix()

      this.plane.dispose()
      this.plane = new THREE.PlaneGeometry(this.element.clientWidth, this.element.clientHeight)
      this.colorBuffer1.dispose()
      this.colorBuffer2.dispose()

      this.colorBuffer1 = new THREE.WebGLRenderTarget(this.element.clientWidth * pixelRatio,
        this.element.clientHeight * pixelRatio, {
          magFilter: THREE.NearestFilter,
          minFilter: THREE.NearestFilter,
        })
      this.colorBuffer2 = new THREE.WebGLRenderTarget(this.element.clientWidth * pixelRatio,
        this.element.clientHeight * pixelRatio, {
          magFilter: THREE.NearestFilter,
          minFilter: THREE.NearestFilter,
        })

      this.colorBufferMaterial1.dispose()
      this.colorBufferMaterial2.dispose()
      this.colorBufferMaterial1 = new THREE.MeshBasicMaterial({ map: this.colorBuffer1.texture })
      this.colorBufferMaterial2 = new THREE.MeshBasicMaterial({ map: this.colorBuffer2.texture })

      this.planeMesh1 = new THREE.Mesh(this.plane, this.colorBufferMaterial1)
      this.scene1.add(this.planeMesh1)
      this.planeMesh2 = new THREE.Mesh(this.plane, this.colorBufferMaterial2)
      this.scene2.add(this.planeMesh2)
    }, false)
  }

  public buffer(): THREE.WebGLRenderTarget {
    return this.colorBuffer1
  }

  public render(): void {
    // render the scene into the color buffer
    this.renderer.render(this.scene, this.camera, this.colorBuffer1)

    // for each pass, flip between the two buffers (todo)

    // render texture to screen
    this.renderer.render(this.scene1, this.orthoCamera)
  }
}