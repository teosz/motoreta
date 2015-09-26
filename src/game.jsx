import React from 'react'
import { Cars } from './genetic.jsx'
import { RaceView } from './race-view.jsx'
import { Physics, Loop } from './physics.jsx'

export class Game extends React.Component {

  constructor(props) {
    super(props)
    this.genetics = new Cars(10)
    this.state = {vehicles: []}
  }

  render() {
    return (
      <div>
        <p>generation: {this.genetics.generationNumber}</p>
        <RaceView
          model={{
            vehicles: this.state.vehicles,
            terrain: this.props.terrain,
            focus: {x: 0, y: 0},
          }}
          />
      </div>
    )
  }

  newRace() {
    let generation = this.genetics.members
    console.log('starting race with', generation)

    let races = generation.slice(0, 1).map((v) => {
      let physics = new Physics()
      let vehicleBody = physics.addVehicle(v.code, {x: 200, y: -200})
      let terrain = physics.addTerrain(this.props.terrain)
      return {
        physics: physics,
        vehicleBody: vehicleBody,
        terrain: terrain,
      }
    })

    let count = 0
    let loop = new Loop((time) => {
      if(count > 200) {
        console.log('stop at 200')
        loop.stop()
        this.done(3)
      }
      count += 1

      let vehicles = races.map((race, i) => {
        race.physics.tick(time)
        let b = race.vehicleBody
        console.log(b.state.pos.x, b.state.pos.y)
        return Object.assign({}, generation[i].code, {
          x: b.state.pos.x,
          y: b.state.pos.y,
          r: b.state.angular.pos,
        })
      })
      this.setState({vehicles: vehicles})
    })
    loop.start()
  }

  done(winner) {
    console.log('race done; winner:', winner)
    //this.genetics.winner = winner
    //this.genetics.generation()
    //this.newRace()
  }

  componentDidMount() {
    this.newRace()
  }

}
