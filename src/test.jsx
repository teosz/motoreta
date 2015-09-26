import React from 'react'
import { Vehicle } from './vehicle.jsx'
import { Physics } from './physics.jsx'
import { Terrain } from './terrain.jsx'
import { Game } from './game.jsx'

var terrainProps = {
  startingPoint: {
    x: 10,
    y: 20
  },
  width: 100,
  height: 10,
  blocks: []
}


for (let i = 0; i < 200; i++) {
  terrainProps.blocks.push(randomTerrain());
}


var focus = {
  x: 150,
  y: 50
}


function rnd(min, max) {
  return min + (Math.random() * (max - min))
}

function randomTerrain() {
  return {
    alpha: rnd(-45, 45)
  }
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
  let randomVehicles = [
    Object.assign({x:   0, y: 20, r: 0}, randomVehicle()),
    Object.assign({x: 100, y: 20, r: 0}, randomVehicle()),
    Object.assign({x: 200, y: 20, r: 0}, randomVehicle()),
    Object.assign({x: 300, y: 20, r: 0}, randomVehicle()),
  ]
  return (
    <Game
      vehicles={randomVehicles}
      terrain={terrainProps}
      />
  )
}
