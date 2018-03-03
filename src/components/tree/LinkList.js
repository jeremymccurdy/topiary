import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "./Link"

const styles = {
  dragContainer: {
    width: "210px",
    position: "absolute"
  }
}

export default class LinkList extends Component {
  state = {
    mounted: false
  }
  componentDidMount() {
    this.setState({ mounted: true })
  }
  render() {
    const links = []
    const { dialogues, choices } = this.props
    Object.keys(choices).forEach(c => {
      if (choices[c].next && choices[c].pos) {
        choices[c].next.forEach(n => {
          const type = this.props[n.t]
          if (type) {
            links.push(
              <Link
                fromId={c}
                toId={n.id}
                key={n.id + "link"}
                from={choices[c].pos}
                to={type[n.id].pos}
              />
            )
          }
        })
      }
    })
    Object.keys(dialogues).forEach(d => {
      if (dialogues[d].next && dialogues[d].pos) {
        dialogues[d].next.forEach(n => {
          const type = this.props[n.t]
          if (type[n.id]) {
            links.push(
              <Link
                fromId={d}
                toId={n.id}
                key={n.id + "link"}
                from={dialogues[d].pos}
                to={type[n.id].pos}
              />
            )
          }
        })
      }
    })
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
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
        {this.state.mounted && links}
      </svg>
    )
  }
}

LinkList.propTypes = {
  dialogues: PropTypes.object,
  choices: PropTypes.object
}

LinkList.defaultProps = {
  dialogues: {},
  choices: {}
}
