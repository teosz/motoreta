import Physics from 'PhysicsJS'

export function demo() {
  let ctx = {}

  Physics(function(world) {
    let width = 600
    let height = 400

    var ball = Physics.body('compound', {
      x: width/2,
      y: height/2,
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

    var bucket = Physics.body('compound', {
      x: width/2,
      y: height/2,
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

    world.add([
      bucket,
      ball,
    ])

    world.add([
      Physics.behavior('constant-acceleration'),
      Physics.behavior('body-impulse-response'),
      Physics.behavior('body-collision-detection'),
      Physics.behavior('sweep-prune'),
    ])

    let count = 0
    Physics.util.ticker.on(function(time) {
        if(count > 100) return
        count += 1
        world.step(time)
        console.log(
          ball.state.pos.x,
          ball.state.pos.y,
          ball.state.angular.pos
        )
    })
  })
}
