import * as THREE from 'three'
import * as Color from 'color'
import { BloomPass, BlurPass } from 'postprocessing'
import math from './math'
import Scene from './scene'

interface ICube {
  mesh: THREE.Mesh
  objectPivot: THREE.Object3D
  originPivot: THREE.Object3D
  rotationAxis: THREE.Vector3
  rotationAngle: number
  rotationSpeed: number
}

export default class SimpleCubes extends Scene {

  private cubes: ICube[] = []
  private cameraRotation = 0
  private light: THREE.Light
  private hue: number = 0

  constructor(private nCubes: number = 250, private radius: number = 1, private size = 15) {
    super()
  }

  protected setup(): void {
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 50, specular: 30 })
    const scale = this.size * this.radius / this.nCubes
    this.light = new THREE.PointLight(0xffff00, 5, 1.5)
    this.light.position.set(.5, .5, .5)
    this.scene.add(this.light)

    for (let i = 0; i < this.nCubes; i++) {
      const cube = this.randCube(scale, this.radius, material)
      this.cubes.push(cube)
      this.scene.add(cube.originPivot)
    }
  }

  protected passes(): any[] {
    return [new BlurPass({
      resolutionScale: 0.5,
    }), new BloomPass({
      distinction: 5.0,
      resolutionScale: 0.5,
      screenMode: false,
      strength: 5.0,
    })]
  }

  protected render(dt: number): void {
    this.scene.rotateY(0.1 * dt)
    this.hue = this.hue + 5 * dt % 360
    this.light.color = new THREE.Color(Color({ h: this.hue, s: 50, v: 255 }).rgbNumber())

    for (const cube of this.cubes) {
      cube.objectPivot.rotateOnAxis(cube.rotationAxis, dt * cube.rotationSpeed)
      cube.originPivot.rotateOnAxis(cube.rotationAxis, 0.1 * dt * cube.rotationSpeed)
    }
  }

  private randCube(scale: number, radius: number, material: THREE.Material): ICube {
    const cube = new THREE.CubeGeometry(scale, scale, scale)
    const [x, y, z] = math.random.randomPointInSphere(radius)
    const mesh = new THREE.Mesh(cube, material)
    const objectPivot = new THREE.Object3D()
    objectPivot.translateX(x)
    objectPivot.translateY(y)
    objectPivot.translateZ(z)
    objectPivot.add(mesh)

    const originPivot = new THREE.Object3D()
    originPivot.add(objectPivot)

    const [ax, ay, az] = math.random.randomPointOnSphere(1)
    const rotationAxis = new THREE.Vector3(ax, ay, az)
    return {
      mesh,
      objectPivot,
      originPivot,
      rotationAngle: 0,
      rotationAxis,
      rotationSpeed: Math.random(),
    }
  }
}