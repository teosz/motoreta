import React from 'react'

export class Terrain extends React.Component {

  render() {

    let width = this.props.geometry.width
    let height = this.props.geometry.height

    let A = [0,0];

    let bars = []

    for (let p of this.props.geometry.blocks) {
      let B = [
        A[0] + width*Math.cos(p.alpha*(Math.PI/180)) | 0,
        A[1] + width*Math.sin(p.alpha*(Math.PI/180)) | 0,
      ]
      let C = [B[0], B[1] + height]
      let D = [A[0], A[1] + height]
      bars.push([A, B, C, D])
      A = B
    }

    return (
      <div className="Terrain">
        <svg className="Terrain-svg">

          {bars.map((b) =>
            <polyline points={''+b.map((p) => p.join(' '))} />
          )}
        </svg>
      </div>
    )
  }

}