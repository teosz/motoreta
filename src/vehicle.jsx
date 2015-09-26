import React from 'react'

export class Vehicle extends React.Component {

  render() {
    return (
      <div className="Vehicle">
        <svg className="Vehicle-svg" width="100" height="40">
          <g className="Vehicle-wheels">
            <circle cx="10" cy="10" r="10" />
            <circle cx="80" cy="10" r="10" />
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
