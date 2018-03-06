import React from "react"
import PropTypes from "prop-types"

function determineEdge(start1, end1, start2, end2) {
  if (!start1 || !end1 || !start2 || !end2) {
    return {}
  }

  const coefA1 = end1.y - start1.y
  const coefB1 = start1.x - end1.x
  const coefC1 = end1.x * start1.y - start1.x * end1.y
  const s4 = coefA1 * start2.x + coefB1 * start2.y + coefC1
  const s3 = coefA1 * end2.x + coefB1 * end2.y + coefC1
  if (s3 !== 0 && s4 !== 0 && ((s3 >= 0 && s4 >= 0) || (s3 < 0 && s4 < 0))) {
    return
  }

  const coefA2 = end2.y - start2.y
  const coefB2 = start2.x - end2.x
  const coefC2 = end2.x * start2.y - start2.x * end2.y
  const s1 = coefA2 * start1.x + coefB2 * start1.y + coefC2
  const s2 = coefA2 * end1.x + coefB2 * end1.y + coefC2
  if (s1 !== 0 && s2 !== 0 && ((s1 >= 0 && s2 >= 0) || (s1 < 0 && s2 < 0))) {
    return
  }

  const denominator = coefA1 * coefB2 - coefA2 * coefB1
  const x = coefB1 * coefC2 - coefB2 * coefC1
  const y = coefA2 * coefC1 - coefA1 * coefC2
  return {
    x: x / denominator,
    y: y / denominator
  }
}

export default function Arrow({ from, to, linking, mouse }) {
  const fromBounds = document.getElementById(from.id).getBoundingClientRect()
  let toBounds
  const start = {
    x: fromBounds.left + window.scrollX + fromBounds.width / 2,
    y: fromBounds.top + window.scrollY + fromBounds.height / 2
  }
  let end
  if (linking) {
    end = { x: mouse.pageX, y: mouse.pageY }
  } else {
    toBounds = document.getElementById(to.id).getBoundingClientRect()
    end = {
      x: toBounds.left + window.scrollX + toBounds.width / 2,
      y: toBounds.top + window.scrollY + toBounds.height / 2
    }
  }
  if (linking) {
    end.y = mouse.pageY
    end.x = mouse.pageX
  } else {
    const TL = {
      x: toBounds.left + window.scrollX,
      y: toBounds.top + window.scrollY
    }
    const TR = {
      x: toBounds.left + window.scrollX + toBounds.width,
      y: toBounds.top + window.scrollY
    }
    const BL = {
      x: toBounds.left + window.scrollX,
      y: toBounds.top + window.scrollY + toBounds.height
    }
    const BR = {
      x: toBounds.left + window.scrollX + toBounds.width,
      y: toBounds.top + window.scrollY + toBounds.height
    }
    const top = determineEdge(start, end, TL, TR)
    const bottom = determineEdge(start, end, BL, BR)
    const left = determineEdge(start, end, TL, BL)
    const right = determineEdge(start, end, TR, BR)
    end = top || bottom || left || right
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
  to: PropTypes.object,
  linking: PropTypes.bool,
  mouse: PropTypes.object
}
