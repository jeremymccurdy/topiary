import React from "react"
import PropTypes from "prop-types"
import tree from "../../lib/tree"

function determineEdge(start1, end1, start2, end2) {
  if (!start1 || !end1 || !start2 || !end2) {
    return {}
  }

  const deltaA1 = end1.y - start1.y
  const deltaB1 = start1.x - end1.x
  const deltaC1 = end1.x * start1.y - start1.x * end1.y
  const s4 = deltaA1 * start2.x + deltaB1 * start2.y + deltaC1
  const s3 = deltaA1 * end2.x + deltaB1 * end2.y + deltaC1
  if (s3 !== 0 && s4 !== 0 && ((s3 >= 0 && s4 >= 0) || (s3 < 0 && s4 < 0))) {
    return
  }

  const deltaA2 = end2.y - start2.y
  const deltaB2 = start2.x - end2.x
  const deltaC2 = end2.x * start2.y - start2.x * end2.y
  const s1 = deltaA2 * start1.x + deltaB2 * start1.y + deltaC2
  const s2 = deltaA2 * end1.x + deltaB2 * end1.y + deltaC2
  if (s1 !== 0 && s2 !== 0 && ((s1 >= 0 && s2 >= 0) || (s1 < 0 && s2 < 0))) {
    return
  }

  const denominator = deltaA1 * deltaB2 - deltaA2 * deltaB1
  const x = deltaB1 * deltaC2 - deltaB2 * deltaC1
  const y = deltaA2 * deltaC1 - deltaA1 * deltaC2
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
      onClick={() =>
        tree.moveLink({
          linkFrom: { t: from.t, id: from.id },
          linkTo: { t: to.t, id: to.id }
        })
      }
    />
  )
}

Arrow.propTypes = {
  from: PropTypes.object.isRequired,
  to: PropTypes.object,
  linking: PropTypes.bool,
  mouse: PropTypes.object
}
