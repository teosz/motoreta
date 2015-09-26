import 'babel-core/polyfill'
require('./style.scss')

window.addEventListener('load', () => {
  document.querySelector('body').innerHTML = 'hello webpack'
})
