import React from "react"
import Draggable from "react-draggable"
import PropTypes from "prop-types"
import Choice from "./Choice"

const styles = {
  dragContainer: {
    width: "210px",
    position: "absolute"
  }
}

export default function ChoiceList({
  choices,
  gridSize,
  currentEdit,
  updateNode,
  dialogues
}) {
  function handleChoicePositionUpdate(event, data, id) {
    updateNode({
      id,
      t: "choices",
      payload: { pos: [data.lastX, data.lastY] }
    })
  }
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
        onStop={(e, d) => handleChoicePositionUpdate(e, d, c)}
        onMouseDown={e => {
          e.stopPropagation()
          currentEdit({ t: "choices", id: c })
        }}
      >
        <div>
          <div style={styles.dragContainer}>
            <Choice id={c} tags={choices[c].tags} body={choices[c].body} />
          </div>
        </div>
      </Draggable>
    )
  })
}

ChoiceList.propTypes = {
  choices: PropTypes.object,
  dialogues: PropTypes.object,
  gridSize: PropTypes.number,
  actors: PropTypes.array,
  currentEdit: PropTypes.func,
  updateNode: PropTypes.func
}
