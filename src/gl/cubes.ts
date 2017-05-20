import * as THREE from 'three'
import * as Color from 'color'
import { BloomPass, BlurPass } from 'postprocessing'
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
  private cameraTarget: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  private cameraDirection: THREE.Vector3 = new THREE.Vector3(0, 0, 0)

  constructor(private nCubes: number = 250, private radius: number = 100, private size = 10) {
    super()
  }

  protected setup(): void {
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 50, specular: 30 })
    const scale = this.size * this.radius / this.nCubes
    this.light = new THREE.PointLight(0xffff00, 5, 150)
    this.light.position.set(50, 50, 50)
    this.scene.add(this.light)
    this.camera.lookAt(this.scene.position)
    this.cameraDirection = this.scene.position
    this.camera.position.x = this.radius * 0.75
    this.camera.position.z = this.radius * 0.75

    for (let i = 0; i < this.nCubes; i++) {
      const cube = this.randCube(scale, this.radius, material)
      this.cubes.push(cube)
      this.scene.add(cube.originPivot)
    }

    document.onmousemove = (e: MouseEvent) => {
      const x = (e.clientX - this.element.clientWidth / 2) / this.element.clientWidth * this.radius / 5
      const y = (e.clientY - this.element.clientHeight / 2) / this.element.clientHeight * this.radius / 5
      this.cameraTarget = new THREE.Vector3(-x, y, 0)
    }

    window.ondeviceorientation = (e: DeviceOrientationEvent) => {
      // const z = e.alpha / 180.0 - 1
      const x = e.gamma / 90.0 // left to right
      const y = e.beta / 180.0 // front to back
      this.cameraTarget = new THREE.Vector3(-x * this.radius, y * this.radius, 0)
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

    // gradually point the camera towards the cameraTarget
    const cameraDelta = new THREE.Vector3()
      .subVectors(this.cameraTarget, this.cameraDirection)
    this.cameraDirection = new THREE.Vector3()
      .addVectors(this.cameraDirection, cameraDelta.multiplyScalar(0.05))
    this.camera.lookAt(this.cameraDirection)
  }

  private randCube(scale: number, radius: number, material: THREE.Material): ICube {
    const cube = new THREE.CubeGeometry(scale, scale, scale)
    const [x, y, z] = this.randomPointInSphere(radius)
    const mesh = new THREE.Mesh(cube, material)
    const objectPivot = new THREE.Object3D()
    objectPivot.translateX(x)
    objectPivot.translateY(y)
    objectPivot.translateZ(z)
    objectPivot.add(mesh)

    const originPivot = new THREE.Object3D()
    originPivot.add(objectPivot)

    const [ax, ay, az] = this.randomPointOnSphere(1)
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

  private randomPointOnSphere(radius: number): number[] {
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const x = radius * Math.cos(theta) * Math.sin(phi)
    const y = radius * Math.sin(theta) * Math.sin(phi)
    const z = radius * Math.cos(phi)
    return [x, y, z]
  }
}