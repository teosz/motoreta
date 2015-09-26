import PhysicsJS from 'PhysicsJS'

export class Physics {

  constructor() {
    this.world = new PhysicsJS.world()

    this.world.add([
      PhysicsJS.behavior('constant-acceleration'),
      PhysicsJS.behavior('body-impulse-response'),
      PhysicsJS.behavior('body-collision-detection'),
      PhysicsJS.behavior('sweep-prune'),
    ])
  }

  tick(time) {
    this.world.step(time)
  }

  onStep(callback) {
    this.world.on('step', callback)
  }

  offStep(callback) {
    this.world.off('step', callback)
  }

  addTerrain(geometry) {
    let width = geometry.width
    let height = geometry.height

    let terrain = PhysicsJS.body('compound', {
      x: 300,
      y: 200,
      treatment: 'static',
    })

    let A = [0, 0]
    for(let p of geometry.blocks) {
      let x = (A[0] + width * Math.cos(p.alpha * (Math.PI / 180)) / 2) | 0
      let y = (A[1] + width * Math.sin(p.alpha * (Math.PI / 180)) / 2) | 0
      let bar = PhysicsJS.body('rectangle', {
        x: 0,
        y: 0,
        width: width,
        height: height,
        mass: 20,
      })
      terrain.addChild(bar, new PhysicsJS.vector(x, y), p.alpha)
    }

    this.world.add(terrain)
    return terrain
  }

  addVehicle(geometry, pos) {
    let vertices = geometry.axis.map((p) => ({
      x: p.length * Math.cos(p.alpha * Math.PI / 180),
      y: p.length * Math.sin(p.alpha * Math.PI / 180),
    }))

    let triangle = (v0, v1) =>
      PhysicsJS.body('convex-polygon', {
        x: 0,
        y: 0,
        vertices: [{x: 0, y: 0}, v0, v1],
        mass: 20,
      })

    let vehicle = PhysicsJS.body('compound', {
      x: pos.x,
      y: pos.y,
      children: [
        triangle(vertices[0], vertices[1]),
        triangle(vertices[1], vertices[2]),
        triangle(vertices[2], vertices[3]),
        triangle(vertices[3], vertices[4]),
        triangle(vertices[4], vertices[5]),
        triangle(vertices[5], vertices[6]),
        triangle(vertices[6], vertices[7]),
        triangle(vertices[7], vertices[0]),
        PhysicsJS.body('circle', {
          x: vertices[0].x,
          y: vertices[0].y,
          width: 100,
          height: 10,
          mass: 20,
        }),
        PhysicsJS.body('circle', {
          x: vertices[3].x,
          y: vertices[3].y,
          width: 100,
          height: 10,
          mass: 20,
        }),
      ],
    })

    this.world.add(vehicle)
    return vehicle
  }

}

export class Loop {

  constructor(tick) {
    this.tick = tick
  }

  start() {
    PhysicsJS.util.ticker.on(this.tick)
  }

  stop() {
    PhysicsJS.util.ticker.off(this.tick)
  }
}

export function demo() {
  new Physics().run()
}
