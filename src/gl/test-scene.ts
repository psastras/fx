import * as THREE from 'three'
import Scene from './scene'

export default class TestScene extends Scene {

  private cube: THREE.Mesh

  protected setup(): void {
    const geometry = new THREE.DodecahedronGeometry(1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
  }

  protected passes(): any[] {
    return []
  }

  protected render(dt: number): void {
    this.cube.rotation.x += 0.0001 * dt
    this.cube.rotation.y += 0.0001 * dt
  }
}