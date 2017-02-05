import * as THREE from 'three';

export default class TestScene {

  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.Renderer | any
  private cube: THREE.Mesh
  private light: THREE.Light

  constructor(element: Element) {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, element.clientWidth / element.clientHeight,
      0.1, 1000)
    this.camera.position.z = 0.5
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setClearColor(0xffffff, 0)

    window.addEventListener('resize', () => {
      this.camera.aspect = element.clientWidth / element.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(element.clientWidth, element.clientHeight)
    }, false)

    this.renderer.setSize(element.clientWidth, element.clientHeight)

    element.appendChild(this.renderer.domElement)
    const geometry = new THREE.DodecahedronGeometry(1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x999999, wireframe: true })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
  }

  public render(): void {
    requestAnimationFrame(this.render.bind(this))

    this.cube.rotation.x += 0.001
    this.cube.rotation.y += 0.001

    this.renderer.render(this.scene, this.camera)
  }
}