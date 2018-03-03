import React, { Component } from "react"
import Draggable from "react-draggable"
import PropTypes from "prop-types"
import Dialogue from "./Dialogue"
import tree from "../../lib/tree"

const styles = {
  dragContainer: {
    width: "210px",
    position: "absolute"
  }
}

export default class DialogueList extends Component {
  static propTypes = {
    dialogues: PropTypes.object,
    gridSize: PropTypes.number,
    actors: PropTypes.array,
    currentEdit: PropTypes.func,
    updateNode: PropTypes.func,
    meta: PropTypes.object
  }

  handleDialoguePositionUpdate(event, data, id) {
    this.props.updateNode({
      id,
      t: "dialogues",
      payload: { pos: [data.lastX, data.lastY] }
    })
  }
  render() {
    const {
      dialogues,
      gridSize,
      actors,
      currentEdit,
      updateNode,
      meta
    } = this.props
    return Object.keys(dialogues).map(d => {
      return (
        <Draggable
          key={d}
          position={{
            x: Math.round(dialogues[d].pos[0] / gridSize) * gridSize,
            y: Math.round(dialogues[d].pos[1] / gridSize) * gridSize
          }}
          handle=".draggable"
          grid={[gridSize, gridSize]}
          onMouseDown={e => {
            if (meta.linkStatus)
              return tree.setLink({ linkTo: { t: "dialogues", id: d } })
            currentEdit({ t: "dialogues", id: d })
          }}
          onStop={(e, data) => this.handleDialoguePositionUpdate(e, data, d)}
        >
          <div id={d} style={styles.dragContainer}>
            <Dialogue
              id={d}
              title={dialogues[d].title}
              tags={dialogues[d].tags}
              body={dialogues[d].body}
              actor={
                actors[dialogues[d].actor] && actors[dialogues[d].actor].name
              }
              color={
                actors[dialogues[d].actor] && actors[dialogues[d].actor].color
              }
              next={dialogues[d].next}
              pos={dialogues[d].pos}
              bounds={dialogues[d].bounds}
              updateNode={updateNode}
              currentEdit={currentEdit}
            />
          </div>
        </Draggable>
      )
    })
  }
}
