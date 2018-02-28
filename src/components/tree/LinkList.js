import React from "react"
import PropTypes from "prop-types"
import Link from "./Link"

const styles = {
  dragContainer: {
    width: "210px",
    position: "absolute"
  }
}

export default function LinkList({ dialogues, choices }) {
  const links = []
  choices.forEach(c => {
    if (c.next) {
      c.next.map(n =>
        links.push(<Link key={n} from={c.pos} to={eval(n).pos} />)
      )
    }
  })
  dialogues.forEach(d => {
    if (d.next) {
      d.next.map(n =>
        links.push(<Link key={n} from={d.pos} to={eval(n).pos} />)
      )
    }
  })
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="5000px"
      style={styles.link}
    >
      <defs>
        <marker
          id="arrowhead"
          viewBox="0 0 10 10"
          refX="3"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      {links}
    </svg>
  )
}

LinkList.propTypes = {
  dialogues: PropTypes.array,
  choices: PropTypes.array
}

LinkList.defaultProps = {
  dialogues: [],
  choices: []
}
