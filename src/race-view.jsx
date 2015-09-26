import React from 'react'
import { Vehicle } from './vehicle.jsx'
import { Terrain } from './terrain.jsx'

export class RaceView extends React.Component {

  render() {
    let model = this.props.model

    let X, Y
    let transform = 'translate('+X+','+Y+')'

    var viewportCoords = {

      MozTransform: transform,
      msTransform: transform,
      OTransform: transform,
      WebkitTransform: transform,
      transform: transform
    }

    function repeatOften() {
      // animate
      requestAnimationFrame(repeatOften);
    }
    requestAnimationFrame(repeatOften);

    return (
      <div className="RaceView">
        <div style={viewportCoords} className="RaceView-viewport" >
          <Terrain geometry={model.terrain} />
          {model.vehicles.map((v) => <div style={{transform: "translate("+v.x+"px,"+v.y+"px)"}} className="Vehicle-container"><Vehicle geometry={v} /></div>)}
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