import React from 'react'
import { Vehicle } from './vehicle.jsx'
import { Race } from './race.jsx'
import { Terrain } from './terrain.jsx'

var terrainProps = {
  "startingPoint" : {
    "x": 10,
    "y": 20
  },

  "width" : 100,
  "height" : 10,

  "blocks" : [{
    "alpha" : 10
  },
  {
    "alpha" : 20
  },
  {
    "alpha" : -35
  },
  {
    "alpha" : 15
  },
  {
    "alpha" : -15
  },
  {
    "alpha" : 45
  },
  {
    "alpha" : -45
  },
  {
    "alpha" : -30
  },
  {
    "alpha" : 30
  }]
}


function rnd(min, max) {
  return min + (Math.random() * (max - min))
}

function randomVehicle() {
  return {
    wheels: {
      left: rnd(20, 50),
      right: rnd(20, 50),
    },
    axis: [0, 1, 2, 3, 4, 5, 6, 7]
      .map(() => ({
        alpha: rnd(0, 360),
        length: rnd(50, 100),
      }))
      .sort((a, b) => a.alpha - b.alpha),
  }
}

export function test() {
  let vehicle = randomVehicle()
  return(
    <div>
      <Terrain geometry={terrainProps} />
      <Vehicle geometry={vehicle} />
    </div>
    )
}
