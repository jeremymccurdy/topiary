import React from "react"
import PropTypes from "prop-types"
import Link from "./Link"

const styles = {
  dragContainer: {
    width: "210px",
    position: "absolute"
  }
}

export default function LinkList(props) {
  const links = []
  Object.values(props.choices).forEach(c => {
    if (c.next && c.pos) {
      c.next.forEach(n => {
        const type = props[n.t]
        if (type) {
          links.push(
            <Link key={n.id + "link"} from={c.pos} to={type[n.id].pos} />
          )
        }
      })
    }
  })
  Object.values(props.dialogues).forEach(d => {
    if (d.next && d.pos) {
      d.next.forEach(n => {
        const type = props[n.t]
        if (type[n.id]) {
          links.push(
            <Link key={n.id + "link"} from={d.pos} to={type[n.id].pos} />
          )
        }
      })
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
  dialogues: PropTypes.object,
  choices: PropTypes.object
}

LinkList.defaultProps = {
  dialogues: {},
  choices: {}
}
