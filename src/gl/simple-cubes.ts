import * as THREE from 'three'
import Scene from './scene'

export default class SimpeCubes extends Scene {

  private cubes: THREE.Mesh[]
  private rotation: number = 0

  constructor(element: Element, nCubes: number = 250, radius: number = 100, size = 10) {
    super(element)

    const material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00ffff })
    const scale = size * radius / nCubes

    for (let i = 0; i < nCubes; i++) {
      const geometry = new THREE.CubeGeometry(scale, scale, scale)
      const [x, y, z] = this.randomPointInSphere(radius)
      const cube = new THREE.Mesh(geometry.translate(x, y, z), material)
      this.scene.add(cube)
    }
  }

  protected render(dt: number): void {
    this.rotation += 0.001;
    this.camera.position.x = Math.sin(this.rotation) * 75;
    this.camera.position.z = Math.cos(this.rotation) * 75;
    this.camera.lookAt(this.scene.position)
  }

  /**
   * Sample from a standard normal distribution, using B-M transform
   */
  private randNormal(): number {
    const u = 1 - Math.random()
    const v = 1 - Math.random()
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
  }

  private randomPointInSphere(radius: number): number[] {
    const x1 = this.randNormal()
    const x2 = this.randNormal()
    const x3 = this.randNormal()
    const u = Math.random()
    const z = radius * Math.pow(u, 1 / 3) / Math.sqrt(x1 * x1 + x2 * x2 + x3 * x3)
    return [z * x1, z * x2, z * x3]
  }
}