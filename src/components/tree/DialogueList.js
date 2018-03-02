import React from "react"
import Draggable from "react-draggable"
import PropTypes from "prop-types"
import Dialogue from "./Dialogue"

const styles = {
  dragContainer: {
    width: "210px",
    position: "absolute"
  }
}

export default function DialogueList({
  dialogues,
  gridSize,
  actors,
  deleteNode,
  currentEdit,
  updateNode
}) {
  function handleDialoguePositionUpdate(event, data, id) {
    updateNode({
      id,
      t: "dialogues",
      payload: { pos: [data.lastX, data.lastY] }
    })
  }

  return Object.keys(dialogues).map(d => {
    return (
      <Draggable
        id={d}
        key={d}
        position={{
          x: Math.round(dialogues[d].pos[0] / gridSize) * gridSize,
          y: Math.round(dialogues[d].pos[1] / gridSize) * gridSize
        }}
        handle=".draggable"
        grid={[gridSize, gridSize]}
        onMouseDown={e => {
          e.preventDefault()
          e.stopPropagation()
          currentEdit({ t: "dialogues", id: d })
        }}
        onStop={(e, data) => handleDialoguePositionUpdate(e, data, d)}
      >
        <div style={styles.dragContainer}>
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
          />
        </div>
      </Draggable>
    )
  })
}

DialogueList.propTypes = {
  dialogues: PropTypes.object,
  gridSize: PropTypes.number,
  actors: PropTypes.array,
  deleteDialogue: PropTypes.func
}
