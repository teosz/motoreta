import React from 'react'
import { Cars } from './genetic.jsx'
import { RaceView } from './race-view.jsx'

export class Game extends React.Component {

  constructor(props) {
    super(props)
    this.genetics = new Cars(10)
    //this.state = {vehicles: this.genetics.members}
    this.state = {vehicles: props.vehicles}
  }

  render() {
    console.log('Game.render')
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
    let vehicles = this.genetics.members
    console.log('starting race with', vehicles)
    setTimeout(() => {
      this.done(3)
    }, 2000)
  }

  done(winner) {
    console.log('race done; winner:', winner)
    this.genetics.winner = winner
    this.genetics.generation()
    this.newRace()
  }

  componentDidMount() {
    this.newRace()
  }

}
