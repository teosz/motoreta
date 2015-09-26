import React from 'react'
import { Vehicle } from './vehicle.jsx'
import { Terrain } from './terrain.jsx'

export class RaceView extends React.Component {

  render() {
    let model = this.props.model

    let focusX = model.focus.x
    let focusY = model.focus.y

    let transform = 'translate('+focusX+'px,'+focusY+'px)'

    let bgPos = focusX*0.1*-1+'px '+focusY*0.1*-1+'px'

    var viewportCoords = {
      MozTransform: transform,
      msTransform: transform,
      OTransform: transform,
      WebkitTransform: transform,
      transform: transform
    }

    var bgCoords = {
      'background-position': bgPos
    }

    function repeatOften() {
      // animate
      requestAnimationFrame(repeatOften);
    }
    requestAnimationFrame(repeatOften);

    return (
      <div className="RaceView" style={bgCoords}>
        <div style={viewportCoords} className="RaceView-viewport" >
          <Terrain geometry={model.terrain} />
          {model.vehicles.map((v) => <div style={{transform: "translate("+v.x+"px,"+v.y+"px)"}} className="Vehicle-container"><Vehicle geometry={v} /></div>)}
        </div>
        <div id="clouds">
          <div className="cloud x1"></div>
          <div className="cloud x2"></div>
          <div className="cloud x3"></div>
          <div className="cloud x4"></div>
          <div className="cloud x5"></div>
        </div>
      </div>
    )
  }

}


// <RaceView
//  terrain={terrain}
//  vehicles={vehicles}
//  focus={150, 0}
//  />