const randomNormal = (): number => {
  const u = 1 - Math.random()
  const v = 1 - Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

const randomPointInSphere = (radius: number): number[] => {
  const x1 = this.randNormal()
  const x2 = this.randNormal()
  const x3 = this.randNormal()
  const u = Math.random()
  const z = radius * Math.pow(u, 1 / 3) / Math.sqrt(x1 * x1 + x2 * x2 + x3 * x3)
  return [z * x1, z * x2, z * x3]
}

const randomPointOnSphere = (radius: number): number[] => {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  const x = radius * Math.cos(theta) * Math.sin(phi)
  const y = radius * Math.sin(theta) * Math.sin(phi)
  const z = radius * Math.cos(phi)
  return [x, y, z]
}

export default {
  random: {
    randomNormal,
    randomPointInSphere,
    randomPointOnSphere,
  },
}