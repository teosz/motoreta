import React from 'react'

export class Vehicle extends React.Component {

  render() {
    let points = this.props.geometry.axis.map((p) => [
      p.length * Math.cos(p.alpha * Math.PI / 180),
      p.length * Math.sin(p.alpha * Math.PI / 180),
    ])

    return (
      <div className="Vehicle">
        <svg className="Vehicle-svg">
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
        </svg>
      </div>
    )
  }

}