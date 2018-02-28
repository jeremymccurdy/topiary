import React from "react"
import PropTypes from "prop-types"

export default function Link({ from, to }) {
  const posA = {
    x: from[0] + 4,
    y: from[1] + 15
  }
  const posB = {
    x: to[0] - 10,
    y: to[1] + 10
  }
  // const lStr = `M${posA.x} ${posA.y} L ${posB.x} ${posB.y}`
  const dStr = `M${posA.x} ${posA.y} C ${posA.x - 80} ${posA.y}, ${posB.x -
    80} ${posB.y}, ${posB.x} ${posB.y}`
  return (
    <path
      d={dStr}
      markerEnd="url(#arrowhead)"
      stroke="black"
      strokeWidth="2px"
      fill="none"
    />
  )
}

Link.propTypes = {
  from: PropTypes.array.isRequired,
  to: PropTypes.array.isRequired
}
