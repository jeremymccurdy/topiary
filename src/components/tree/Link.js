import React from "react"
import PropTypes from "prop-types"

const styles = {
  link: {
    position: "absolute",
    margin: 0,
    padding: 0,
    transition: `all 0ms`
  }
}

export default function Link({ from, to }) {
  const w = Math.abs(from[0] - to[0]) || 1
  const h = Math.abs(from[1] - to[1])
  return (
    <svg
      className={"link-test"}
      width={w}
      height={h}
      style={styles.link}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="corner">corner</title>
      <path d={`M0 0, L ${w} ${h}`} stroke="black" fill="black" />
    </svg>
  )
}

Link.propTypes = {
  from: PropTypes.array.isRequired,
  to: PropTypes.array.isRequired
}
