import React from 'react'
import { Vehicle } from './vehicle.jsx'
import { Race } from './race.jsx'

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
        alpha: rnd(0, Math.PI * 2),
        length: rnd(50, 100),
      }))
      .sort((a, b) => a.alpha - b.alpha),
  }
}

export function test() {
  let geom = randomVehicle()
  console.log(JSON.stringify(geom))
  return <Vehicle geometry={geom} />
}
