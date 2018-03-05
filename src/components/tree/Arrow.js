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

export default function Arrow({ from, to, linking, mouse }) {
  const fromBounds = document.getElementById(from.id).getBoundingClientRect()
  let toBounds
  const start = {
    x: from.pos[0] + fromBounds.width / 2,
    y: from.pos[1] + fromBounds.height / 2
  }
  let end
  if (linking) {
    end = { x: mouse.pageX, y: mouse.pageY }
  } else {
    toBounds = document.getElementById(to.id).getBoundingClientRect()
    end = {
      x: to.pos[0] + toBounds.width / 2,
      y: to.pos[1] + toBounds.height / 2
    }
  }
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
      end.y = linking ? mouse.pageX : end.y - toBounds.height / 2 - 10
      break
    case "bottom":
      end.y += linking ? mouse.pageY : toBounds.height / 2 + 20
      break
    case "right":
      end.x += linking ? mouse.pageY : toBounds.width / 2 + 20
      break
    case "left":
      end.x = linking ? mouse.pageX : end.x - toBounds.width / 2 - 10
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
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
  linking: PropTypes.bool,
  mouse: PropTypes.object
}
