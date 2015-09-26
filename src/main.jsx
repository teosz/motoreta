import 'babel-core/polyfill'
require('./style.scss')
import React from 'react'
import { Vehicle } from './vehicle.jsx'

var vehicleProps = {
  "wheels" : {
    "left": 10,
    "right": 20
  },

  "axis": [{
    "alpha" : 30,
    "length": 20,
  },
  {
    "alpha" : 10,
    "length": 39,
  },
  {
    "alpha" : 20,
    "length": 3,
  }
  ]
}

window.addEventListener('load', () => {
  React.render(
    <Vehicle geometry={vehicleProps} />,

    document.querySelector('body')
    )
})
