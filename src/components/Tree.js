import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FontIcon, FloatingActionButton, Snackbar, Slider } from "material-ui"
import {
  newNode,
  updateNode,
  deleteNode,
  selectNode,
  toggleEditor,
  setWarning
} from "../actions"
import NodeList from "./tree/NodeList"
import ArrowList from "./tree/ArrowList"
import Arrow from "./tree/Arrow"
import rnd from "../lib/rnd"
import { dimensions } from "../lib/view"

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
    top: "calc(100vh - 100px)",
    transition: "transform 900ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 0ms",
    display: "inline",
    margin: 0
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
    backgroundColor: "white",
    display: "block",
    backgroundSize: `${gridSize}px ${gridSize}px`
  },
  arrowlink: {
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none"
  }
}

class Tree extends Component {
  static propTypes = {
    dialogues: PropTypes.objectOf(PropTypes.object),
    choices: PropTypes.objectOf(PropTypes.object),
    newNode: PropTypes.func.isRequired,
    updateNode: PropTypes.func.isRequired,
    deleteNode: PropTypes.func.isRequired,
    selectNode: PropTypes.func.isRequired,
    toggleEditor: PropTypes.func.isRequired,
    setWarning: PropTypes.func.isRequired,
    actors: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.shape({
      editorHidden: PropTypes.bool.isRequired
    })
  }
  static defaultProps = {
    dialogues: {},
    choices: {}
  }

  state = {
    scale: 1.0,
    mouseEvent: {}
  }

  handleMouse = e => {
    this.setState({ mouseEvent: { pageX: e.pageX, pageY: e.pageY } })
  }

  handleNewNode = t => {
    const { newNode, selectNode } = this.props
    const { scale } = this.state
    const newId = rnd()
    const diffs =
      t === "dialogues"
        ? { actor: 0, body: "new dialogue" }
        : { body: "new choice" }
    const newPos = [
      Math.round(
        (window.pageXOffset + window.innerWidth / 2 - 100) / gridSize
      ) *
        gridSize *
        scale,
      Math.round(
        (window.pageYOffset + window.innerHeight / 2 - 50) / gridSize
      ) *
        gridSize *
        scale
    ]
    newNode({
      id: newId,
      t,
      payload: {
        id: newId,
        t,
        title: "untitled",
        tags: [],
        pos: newPos,
        bounds: [210],
        prev: [],
        next: [],
        ...diffs
      }
    })
    selectNode({ id: newId, t })
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

  handleZoomSlider = (e, v) => {
    this.setState({ scale: v })
  }

  render() {
    const { meta, dialogues, choices, setWarning } = this.props
    const { scale, mouseEvent } = this.state
    const boundary = dimensions(
      [...Object.values(dialogues), ...Object.values(choices)],
      scale
    )
    const hideEditor = {
      transform: meta.editorHidden ? "translateX(28vw)" : "translateX(0)"
    }
    return (
      <div onMouseMove={this.handleMouse}>
        <div
          style={{
            transform: `scale(${scale})`,
            transition: "transform 0ms linear"
          }}
          id="zoomGrid"
          onWheel={this.handleZoom}
        >
          <div
            style={{
              ...styles.dragGrid,
              width: boundary.width,
              height: boundary.height,
              backgroundImage: `linear-gradient(to right, #EEEEEE ${1 /
                scale}px, transparent ${1 /
                scale}px), linear-gradient(to bottom, #EEEEEE ${1 /
                scale}px, transparent ${1 / scale}px)`
            }}
          >
            {meta.linkStatus && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                style={styles.arrowlink}
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
                <Arrow
                  from={this.props[meta.linkFrom.t][meta.linkFrom.id]}
                  linking={meta.linkStatus}
                  mouse={mouseEvent}
                />
              </svg>
            )}
            <NodeList {...this.props} {...this.state} gridSize={gridSize} />
            <ArrowList dialogues={dialogues} choices={choices} />
          </div>
        </div>
        <div style={{ ...styles.buttonContainer, ...hideEditor }}>
          <FloatingActionButton
            mini={true}
            onClick={() => this.handleNewNode("choices")}
            style={styles.button}
            secondary
          >
            <FontIcon className="material-icons">question_answer</FontIcon>
          </FloatingActionButton>
          <FloatingActionButton
            style={styles.button}
            onClick={() => this.handleNewNode("dialogues")}
            secondary
          >
            <FontIcon className="material-icons md-48">chat</FontIcon>
          </FloatingActionButton>
          <br />
          <Slider
            min={0.2}
            max={1}
            step={zoomStep}
            value={scale}
            onChange={this.handleZoomSlider}
            sliderStyle={{ marginTop: "5px" }}
          />
        </div>
        <Snackbar
          message={meta.warningMessage}
          open={meta.warning}
          action={"ok"}
          onRequestClose={() =>
            setWarning({ warning: false, warningMessage: "" })
          }
          onActionClick={() =>
            setWarning({ warning: false, warningMessage: "" })
          }
        />
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
  newNode,
  updateNode,
  deleteNode,
  selectNode,
  toggleEditor,
  setWarning
})(Tree)
