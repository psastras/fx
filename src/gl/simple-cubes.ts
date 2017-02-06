import * as THREE from 'three'
import Scene from './scene'

interface ICube {
  mesh: THREE.Mesh
  objectPivot: THREE.Object3D
  originPivot: THREE.Object3D
  rotationAxis: THREE.Vector3
  rotationAngle: number
  rotationSpeed: number
}

export default class SimpeCubes extends Scene {

  private cubes: ICube[] = []
  private cameraRotation = 0
  private light: THREE.Light

  constructor(element: Element, nCubes: number = 250, radius: number = 100, size = 10) {
    super(element)

    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 50, specular: 30 })
    const scale = size * radius / nCubes

    this.light = new THREE.PointLight(0xffff00, 5, 150)
    this.light.position.set(50, 50, 50)
    this.scene.add(this.light)

    for (let i = 0; i < nCubes; i++) {
      const cube = this.randCube(scale, radius, material)
      this.cubes.push(cube)
      this.scene.add(cube.originPivot)
    }
  }

  protected render(dt: number): void {
    this.cameraRotation += 0.00005 * dt;
    this.camera.position.x = Math.sin(this.cameraRotation) * 75;
    this.camera.position.z = Math.cos(this.cameraRotation) * 75;
    this.camera.lookAt(this.scene.position)

    for (let cube of this.cubes) {
      cube.objectPivot.rotateOnAxis(cube.rotationAxis, 0.001 * dt * cube.rotationSpeed)
      cube.originPivot.rotateOnAxis(cube.rotationAxis, 0.0001 * dt * cube.rotationSpeed)
    }
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