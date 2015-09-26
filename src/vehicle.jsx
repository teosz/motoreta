import React from 'react'

export class Vehicle extends React.Component {

  render() {
    return (
      <div className="Vehicle">
        <svg className="Vehicle-svg" width="120" height="60">
          <g className="Vehicle-body">
            <polyline points={"15 45, 60 30, 105 45,"+ this.props.geometry.axis.map((point) =>{
              let x = Math.ceil(point.length*Math.cos(point.alpha) + 60)
              let y = Math.ceil(point.length*Math.sin(point.alpha) + 30)

              return " "+x+" "+y+"";
            })} />
          </g>
          <g className="Vehicle-wheels">
            <circle cx="15" cy="45" r={this.props.geometry.wheels.left} />
            <circle cx="105" cy="45" r={this.props.geometry.wheels.right} />
          </g>
        </svg>
      </div>
    )
  }

}


// <g className="Vehicle-wheels">
//   <circle cx="10" cy="10" r="{this.props.leftWheelRadius}">
//   <circle cx="80" cy="10" r="{this.props.rightWheelRadius}">
// </g>
// <g className="Vehicle-body">
//   <polyline points="1 58, 10 44, 19 58"/>
//   {this.props.author}
// </g>
