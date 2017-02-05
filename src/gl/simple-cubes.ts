import * as THREE from 'three'
import Scene from './scene'

export default class SimpeCubes extends Scene {

  private cube: THREE.Mesh

  constructor(element: Element) {
    super(element)

    const geometry = new THREE.DodecahedronGeometry(1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
  }

  protected render(dt: number): void {
    this.cube.rotation.x += 0.0001 * dt
    this.cube.rotation.y += 0.0001 * dt
  }
}