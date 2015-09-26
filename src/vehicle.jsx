import React from 'react'

export class Vehicle extends React.Component {

  render() {
    let points = this.props.geometry.axis.map((p) => [
      p.length * Math.cos(p.alpha),
      p.length * Math.sin(p.alpha),
    ])

    return (
      <div className="Vehicle">
        <svg className="Vehicle-svg" width="400" height="400">
          <g transform="translate(200,200)">
            <g className="Vehicle-wheels">
              <circle
                cx={points[0][0]}
                cy={points[0][1]}
                r={this.props.geometry.wheels.left}
                />
              <circle
                cx={points[3][0]}
                cy={points[3][1]}
                r={this.props.geometry.wheels.right}
                />
            </g>
            <polyline
              className="Vehicle-body"
              points={points.map((p) => p.join(' '))}
              />
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
