import React, { Component } from "react"
import Draggable from "react-draggable"
import PropTypes from "prop-types"
import Choice from "./Choice"
import tree from "../../lib/tree"

const styles = {
  dragContainer: {
    width: "210px",
    position: "absolute"
  }
}

export default class ChoiceList extends Component {
  static propTypes = {
    dialogues: PropTypes.object,
    gridSize: PropTypes.number,
    actors: PropTypes.array,
    currentEdit: PropTypes.func,
    updateNode: PropTypes.func,
    meta: PropTypes.object
  }
  handleChoicePositionUpdate(event, data, id) {
    this.props.updateNode({
      id,
      t: "choices",
      payload: { pos: [data.lastX, data.lastY] }
    })
  }
  render() {
    const { choices, gridSize, currentEdit, updateNode, meta } = this.props
    return Object.keys(choices).map(c => {
      return (
        <Draggable
          key={c}
          position={{
            x: Math.round(choices[c].pos[0] / gridSize) * gridSize,
            y: Math.round(choices[c].pos[1] / gridSize) * gridSize
          }}
          handle=".draggable"
          grid={[gridSize, gridSize]}
          onStop={(e, d) => this.handleChoicePositionUpdate(e, d, c)}
          onMouseDown={e => {
            if (meta.linkStatus)
              return tree.setLink({ linkTo: { t: "choices", id: c } })
            currentEdit({ t: "choices", id: c })
          }}
        >
          <div id={c} style={styles.dragContainer}>
            <Choice
              id={c}
              tags={choices[c].tags}
              body={choices[c].body}
              nodeRef={this.nodeRef}
              pos={choices[c].pos}
              bounds={choices[c].bounds}
              updateNode={updateNode}
            />
          </div>
        </Draggable>
      )
    })
  }
}

ChoiceList.propTypes = {
  choices: PropTypes.object,
  dialogues: PropTypes.object,
  gridSize: PropTypes.number,
  actors: PropTypes.array,
  currentEdit: PropTypes.func,
  updateNode: PropTypes.func
}
