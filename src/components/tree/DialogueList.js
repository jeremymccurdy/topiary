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
  deleteDialogue,
  currentDialogue,
  updateDialogue
}) {
  function handleDialoguePositionUpdate(event, data, index) {
    updateDialogue({
      index,
      dialogue: { pos: [data.lastX, data.lastY] }
    })
  }

  function handleDialogueSelect(index) {
    currentDialogue(index)
  }

  return dialogues.map((d, i) => {
    return (
      <Draggable
        key={i}
        position={{
          x: Math.round(d.pos[0] / gridSize) * gridSize,
          y: Math.round(d.pos[1] / gridSize) * gridSize
        }}
        handle=".draggable"
        grid={[gridSize, gridSize]}
        onMouseDown={e => {
          e.preventDefault()
          e.stopPropagation()
          handleDialogueSelect(i)
        }}
        onStop={(e, d) => handleDialoguePositionUpdate(e, d, i)}
      >
        <div id={`dialogues[${i}]`} style={styles.dragContainer}>
          <Dialogue
            index={i}
            title={d.title}
            tags={d.tags}
            body={d.body}
            actor={actors[d.actor] && actors[d.actor].name}
            color={actors[d.actor] && actors[d.actor].color}
            deleteDialogue={deleteDialogue}
          />
        </div>
      </Draggable>
    )
  })
}

DialogueList.propTypes = {
  dialogues: PropTypes.array,
  gridSize: PropTypes.number,
  actors: PropTypes.array,
  deleteDialogue: PropTypes.func
}
