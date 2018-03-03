import React from "react"
import PropTypes from "prop-types"

function determineEdge(start, end) {
  const startH = start.x - end.x
  const startV = start.y - end.y
  const endH = end.x - start.x
  const endV = end.y - start.y

  const startSide =
    Math.abs(startH) > Math.abs(startV)
      ? startH > 0 ? "left" : "right"
      : startV > 0 ? "top" : "bottom"
  const endSide =
    Math.abs(endH) > Math.abs(endV)
      ? endH > 0 ? "left" : "right"
      : endV > 0 ? "top" : "bottom"
  return [startSide, endSide]
}

export default function Arrow({ from, to, fromId, toId }) {
  const fromBounds = document.getElementById(fromId).getBoundingClientRect()
  const toBounds = document.getElementById(toId).getBoundingClientRect()
  const start = {
    x: from[0] + fromBounds.width / 2,
    y: from[1] + fromBounds.height / 2
  }
  const end = { x: to[0] + toBounds.width / 2, y: to[1] + toBounds.height / 2 }
  const [startSide, endSide] = determineEdge(start, end)
  switch (startSide) {
    case "top":
      start.y -= fromBounds.height / 2
      break
    case "bottom":
      start.y += fromBounds.height / 2
      break
    case "right":
      start.x += fromBounds.width / 2
      break
    case "left":
      start.x -= fromBounds.width / 2
      break
    default:
      break
  }
  switch (endSide) {
    case "top":
      end.y = end.y - toBounds.height / 2 - 10
      break
    case "bottom":
      end.y += toBounds.height / 2 + 20
      break
    case "right":
      end.x += toBounds.width / 2 + 20
      break
    case "left":
      end.x = end.x - toBounds.width / 2 - 10
      break
    default:
      break
  }
  const dStr = `M${start.x} ${start.y} L ${end.x} ${end.y}`
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

Arrow.propTypes = {
  from: PropTypes.array.isRequired,
  to: PropTypes.array.isRequired,
  fromId: PropTypes.string.isRequired,
  toId: PropTypes.string.isRequired
}
