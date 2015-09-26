import PhysicsJS from 'PhysicsJS'

export class Physics {

  constructor() {
    this.ball = PhysicsJS.body('compound', {
      x: 300,
      y: 200,
      children: [
        PhysicsJS.body('rectangle', {
            x: 0,
            y: 0,
            width: 20,
            height: 20,
            mass: 1,
        }),
      ],
    })

    this.bucket = PhysicsJS.body('compound', {
      x: 300,
      y: 200,
      treatment: 'static',
      children: [
        PhysicsJS.body('rectangle', {
            x: -50,
            y: 0,
            width: 10,
            height: 100,
            mass: 20,
        }),
        PhysicsJS.body('rectangle', {
            x: 0,
            y: 50,
            width: 100,
            height: 10,
            mass: 20,
        }),
        PhysicsJS.body('rectangle', {
            x: 50,
            y: 0,
            width: 10,
            height: 100,
            mass: 20,
        }),
      ],
    })

    this.world = new PhysicsJS.world()

    this.world.add([
      this.bucket,
      this.ball,
    ])

    this.world.add([
      PhysicsJS.behavior('constant-acceleration'),
      PhysicsJS.behavior('body-impulse-response'),
      PhysicsJS.behavior('body-collision-detection'),
      PhysicsJS.behavior('sweep-prune'),
    ])
  }

  run() {
    let count = 0
    PhysicsJS.util.ticker.on((time) => {
        if(count > 100) return
        count += 1
        this.world.step(time)
        console.log(
          this.ball.state.pos.x,
          this.ball.state.pos.y,
          this.ball.state.angular.pos
        )
    })
  }

}

export function demo() {
  new Physics().run()
}
