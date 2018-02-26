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

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "70vw",
    height: "100vh"
  },
  button: {
    position: "fixed",
    right: "31vw",
    bottom: "20px"
  },
  dialogueContainer: {
    width: "200px"
  },
  dragContainer: {
    width: "200px"
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

  handleNewDialogue = () => {
    this.props.newDialogue({
      title: "New",
      tags: "",
      body: "new dialogue",
      pos: [0, 0],
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

  render() {
    const { dialogues, deleteDialogue, actors } = this.props
    const dialogueCards =
      dialogues &&
      dialogues.map((d, i) => {
        return (
          <Draggable
            key={i}
            defaultPosition={{ x: d.pos[0], y: d.pos[1] }}
            handle=".draggable"
            onStop={(e, d) => this.handleDialoguePositionUpdate(e, d, i)}
            onMouseDown={() => this.handleDialogueSelect(i)}
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
        {dialogues && dialogueCards}
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
