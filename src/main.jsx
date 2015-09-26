import 'babel-core/polyfill'
require('./style.scss')
import React from 'react'
import { test } from './test.jsx'

window.addEventListener('load', () => {
  React.render(
    test(),
    document.querySelector('body')
  )
})
