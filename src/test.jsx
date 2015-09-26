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

function rnd(min, max) {
  return min + (Math.random() * (max - min))
}

function randomTerrain() {
  return {
    alpha: rnd(-45, 45),
  }
}

export function test() {
  return (
    <Game
      terrain={terrainProps}
      />
  )
}
