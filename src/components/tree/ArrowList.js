import React, { Component } from "react"
import PropTypes from "prop-types"
import Arrow from "./Arrow"

export default class ArrowList extends Component {
  state = {
    mounted: false
  }
  componentDidMount() {
    this.setState({ mounted: true })
  }
  render() {
    const arrows = []
    const { dialogues, choices } = this.props
    Object.keys(choices).forEach(c => {
      if (choices[c].next && choices[c].pos) {
        choices[c].next.forEach(n => {
          const type = this.props[n.t]
          if (type) {
            arrows.push(
              <Arrow key={n.id + "-" + c} from={choices[c]} to={type[n.id]} />
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
            arrows.push(
              <Arrow key={n.id + "-" + d} from={dialogues[d]} to={type[n.id]} />
            )
          }
        })
      }
    })
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        {this.state.mounted && arrows}
      </svg>
    )
  }
}

ArrowList.propTypes = {
  dialogues: PropTypes.object,
  choices: PropTypes.object
}

ArrowList.defaultProps = {
  dialogues: {},
  choices: {}
}