import * as THREE from 'three'
import Scene from './scene'
import { GlitchPass } from 'postprocessing'

export default class TestScene extends Scene {

  private hedron: THREE.Mesh

  protected setup(): void {
    const geometry = new THREE.DodecahedronGeometry(1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true })
    this.hedron = new THREE.Mesh(geometry, material)
    this.scene.add(this.hedron)
  }

  protected passes(): any[] {
    return [new GlitchPass()]
  }

  protected render(dt: number): void {
    this.hedron.rotation.x += 0.1 * dt
    this.hedron.rotation.y += 0.1 * dt
  }
}