import 'babel-core/polyfill'
require('./style.scss')
import React from 'react'
import { Vehicle } from './vehicle.jsx'

window.addEventListener('load', () => {
  React.render(
    <Vehicle />,
    document.querySelector('body')
  )
})
