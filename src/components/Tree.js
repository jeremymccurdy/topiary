import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FontIcon, FloatingActionButton } from "material-ui"
import {
  newDialogue,
  updateDialogue,
  deleteDialogue,
  newChoice,
  updateChoice,
  deleteChoice,
  currentDialogue,
  toggleEditor
} from "../actions"
import DialogueList from "./tree/DialogueList"
import ChoiceList from "./tree/ChoiceList"
import LinkList from "./tree/LinkList"

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
  buttonContainer: {
    position: "fixed",
    left: "calc(70vw - 140px)",
    top: "calc(100vh - 80px)",
    transition: "transform 900ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 0ms",
    display: "inline"
  },
  button: {
    margin: "5px"
  },
  dragContainer: {
    width: "210px",
    position: "absolute"
  },
  dragGrid: {
    position: "relative",
    minHeight: boundary,
    minWidth: boundary,
    backgroundColor: "white",
    display: "block",
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundImage:
      "linear-gradient(to right, #EEEEEE 1px, transparent 1px), linear-gradient(to bottom, #EEEEEE 1px, transparent 1px)"
  }
}
class Tree extends Component {
  static propTypes = {
    dialogues: PropTypes.arrayOf(PropTypes.object),
    choices: PropTypes.arrayOf(PropTypes.object),
    newDialogue: PropTypes.func.isRequired,
    updateDialogue: PropTypes.func.isRequired,
    deleteDialogue: PropTypes.func.isRequired,
    newChoice: PropTypes.func.isRequired,
    updateChoice: PropTypes.func.isRequired,
    deleteChoice: PropTypes.func.isRequired,
    currentDialogue: PropTypes.func.isRequired,
    toggleEditor: PropTypes.func.isRequired,
    actors: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.shape({
      editorHidden: PropTypes.bool.isRequired
    })
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
        window.pageXOffset + window.innerWidth / 2 - 100,
        window.pageYOffset + window.innerHeight / 2 - 50
      ],
      actor: 0
    })
  }

  // POSSIBLE ZOOMING
  // isNegative = n => {
  //   return ((n = +n) || 1 / n) < 0
  // }

  // handleZoom = e => {
  //   if (!e.shiftKey) {
  //     return
  //   }
  //   e.preventDefault()
  //   const direction =
  //     this.isNegative(e.deltaX) && this.isNegative(e.deltaY) ? "down" : "up"
  //   if (direction === "up") {
  //     this.setState({ scale: this.state.scale + zoomStep })
  //   } else {
  //     this.setState({ scale: this.state.scale - zoomStep })
  //   }
  //   if (this.state.scale < 0.3) {
  //     this.setState({ scale: 0.3 })
  //   }
  // }

  render() {
    const { meta, dialogues, choices } = this.props
    const { scale } = this.state
    const hideEditor = {
      transform: meta.editorHidden ? "translateX(28vw)" : "translateX(0)"
    }
    return (
      <div style={styles.dragGrid}>
        {/* <div
          style={{
            transform: `scale(${scale})`,
            transition: "transform 0ms linear"
          }}
          id="zoomGrid"
          onWheel={this.handleZoom}
        > */}
        <DialogueList {...this.props} gridSize={gridSize} />
        <ChoiceList {...this.props} gridSize={gridSize} />
        <LinkList dialogues={dialogues} choices={choices} />
        {/* </div> */}
        <div style={{ ...styles.buttonContainer, ...hideEditor }}>
          <FloatingActionButton
            mini={true}
            onClick={this.handleNewChoice}
            style={styles.button}
            secondary
          >
            <FontIcon className="material-icons">question_answer</FontIcon>
          </FloatingActionButton>
          <FloatingActionButton
            style={styles.button}
            onClick={this.handleNewDialogue}
            secondary
          >
            <FontIcon className="material-icons md-48">chat</FontIcon>
          </FloatingActionButton>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dialogues: state.dialogues,
    choices: state.choices,
    actors: state.actors,
    meta: state.meta
  }
}

export default connect(mapStateToProps, {
  newDialogue,
  updateDialogue,
  deleteDialogue,
  newChoice,
  updateChoice,
  deleteChoice,
  currentDialogue,
  toggleEditor
})(Tree)
