import Physics from 'PhysicsJS'

export class Race {

  constructor() {
    this.ball = Physics.body('compound', {
      x: 300,
      y: 200,
      children: [
        Physics.body('rectangle', {
            x: 0,
            y: 0,
            width: 20,
            height: 20,
            mass: 1,
        }),
      ],
    })

    this.bucket = Physics.body('compound', {
      x: 300,
      y: 200,
      treatment: 'static',
      children: [
        Physics.body('rectangle', {
            x: -50,
            y: 0,
            width: 10,
            height: 100,
            mass: 20,
        }),
        Physics.body('rectangle', {
            x: 0,
            y: 50,
            width: 100,
            height: 10,
            mass: 20,
        }),
        Physics.body('rectangle', {
            x: 50,
            y: 0,
            width: 10,
            height: 100,
            mass: 20,
        }),
      ],
    })

    this.world = new Physics.world()

    this.world.add([
      this.bucket,
      this.ball,
    ])

    this.world.add([
      Physics.behavior('constant-acceleration'),
      Physics.behavior('body-impulse-response'),
      Physics.behavior('body-collision-detection'),
      Physics.behavior('sweep-prune'),
    ])
  }

  run() {
    let count = 0
    Physics.util.ticker.on((time) => {
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
  new Race().run()
}
