import 'babel-core/polyfill'
require('./style.scss')
import React from 'react'
import { Vehicle } from './vehicle.jsx'
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

var vehicleProps = {
  "wheels" : {
    "left": 15,
    "right": 15
  },

  "axis": [{
    "alpha" : 30,
    "length": 20
  },
  {
    "alpha" : 10,
    "length": 60
  },
  {
    "alpha" : 200,
    "length": 40
  }]
}

window.addEventListener('load', () => {
  React.render(
    <div>
      <Terrain geometry={terrainProps} />
      <Vehicle geometry={vehicleProps} />
    </div>,

    document.querySelector('body')
    )
})
