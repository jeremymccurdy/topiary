import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Paper, FontIcon, FloatingActionButton } from "material-ui"
import Draggable from "react-draggable"
import {
  newDialogue,
  updateDialogue,
  deleteDialogue,
  currentDialogue
} from "../actions"
import Dialogue from "./tree/Dialogue"

const boundary = 5000
const zoomStep = 0.03
const gridSize = 30

const styles = {
  container: {
    top: 0,
    left: 0,
    width: "70vw",
    height: "100vh"
  },
  button: {
    position: "fixed",
    left: "calc(70vw - 80px)",
    top: "calc(100vh - 80px)"
  },
  // dialogueContainer: {
  //   width: "210px"
  // },
  dragContainer: {
    width: "210px",
    position: "absolute"
  },
  dragGrid: {
    position: "absolute",
    minHeight: boundary,
    minWidth: boundary,
    backgroundColor: "white",
    overflow: "scroll",
    display: "block",
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundImage:
      "linear-gradient(to right, #EEEEEE 1px, transparent 1px), linear-gradient(to bottom, #EEEEEE 1px, transparent 1px)"
  }
}

class Tree extends Component {
  static propTypes = {
    dialogues: PropTypes.arrayOf(PropTypes.object),
    newDialogue: PropTypes.func.isRequired,
    updateDialogue: PropTypes.func.isRequired,
    deleteDialogue: PropTypes.func.isRequired,
    currentDialogue: PropTypes.func.isRequired,
    actors: PropTypes.arrayOf(PropTypes.object)
  }
  static defaultProps = {
    dialogues: []
  }

  state = {
    scale: 1.0
  }

  handleNewDialogue = () => {
    this.props.newDialogue({
      title: "New",
      tags: [],
      body: "new dialogue",
      pos: [
        window.pageXOffset - boundary / 2 + window.innerWidth / 2 - 100,
        window.pageYOffset - boundary / 2 + window.innerHeight / 2 - 50
      ],
      actor: 0
    })
  }

  handleDialoguePositionUpdate = (event, data, index) => {
    this.props.updateDialogue({
      index,
      dialogue: { pos: [data.lastX, data.lastY] }
    })
  }

  handleDialogueSelect = index => {
    this.props.currentDialogue(index)
  }

  isNegative = n => {
    return ((n = +n) || 1 / n) < 0
  }

  handleZoom = e => {
    if (!e.shiftKey) {
      return
    }
    e.preventDefault()
    const direction =
      this.isNegative(e.deltaX) && this.isNegative(e.deltaY) ? "down" : "up"
    if (direction === "up") {
      this.setState({ scale: this.state.scale + zoomStep })
    } else {
      this.setState({ scale: this.state.scale - zoomStep })
    }
    if (this.state.scale < 0.3) {
      this.setState({ scale: 0.3 })
    }
  }

  render() {
    const { dialogues, deleteDialogue, actors } = this.props
    const { scale } = this.state
    const dialogueCards =
      dialogues &&
      dialogues.map((d, i) => {
        return (
          <Draggable
            key={i}
            defaultPosition={{
              x: Math.round((d.pos[0] + boundary / 2) / gridSize) * gridSize,
              y: Math.round((d.pos[1] + boundary / 2) / gridSize) * gridSize
            }}
            handle=".draggable"
            grid={[gridSize, gridSize]}
            onStop={(e, d) => this.handleDialoguePositionUpdate(e, d, i)}
            onMouseDown={e => {
              e.stopPropagation()
              this.handleDialogueSelect(i)
            }}
          >
            <div style={styles.dragContainer}>
              <Dialogue
                index={i}
                title={d.title}
                tags={d.tags}
                body={d.body}
                color={actors[d.actor].color || "FFFFFF"}
                deleteDialogue={deleteDialogue}
              />
            </div>
          </Draggable>
        )
      })
    return (
      <Paper style={styles.container}>
        <div
          style={{
            transform: `scale(${scale})`,
            transition: "transform 10ms ease"
          }}
          id="zoomGrid"
          onWheel={this.handleZoom}
        >
          {/* 
          Keep for possible pan effect

          <Draggable
            handle="#dragGrid"
            defaultPosition={{ x: -(boundary / 2), y: -(boundary / 2) }}
            bounds={{
              left: -(boundary / 2),
              top: -(boundary / 2),
              right: boundary / 2,
              bottom: boundary / 2
            }}
          > */}
          <div id="dragGrid" style={styles.dragGrid}>
            {dialogues && dialogueCards}
          </div>
          {/* </Draggable> */}
        </div>
        <FloatingActionButton
          style={styles.button}
          onClick={this.handleNewDialogue}
          secondary
        >
          <FontIcon className="material-icons md-48">add</FontIcon>
        </FloatingActionButton>
      </Paper>
    )
  }
}

const mapStateToProps = state => {
  return {
    dialogues: state.dialogues,
    actors: state.actors
  }
}

export default connect(mapStateToProps, {
  newDialogue,
  updateDialogue,
  deleteDialogue,
  currentDialogue
})(Tree)
