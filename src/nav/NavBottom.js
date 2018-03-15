import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FloatingActionButton, Slider, FontIcon } from "material-ui"
import { rnd } from "../lib/math"
import { gridSize } from "../lib/view"
import { toggleEditor, setFocusedNode, newNode } from "../store/actions"

const styles = {
  icon: {
    width: 30,
    height: 30,
    stroke: "green",
    color: "green"
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
  }
}

class NavBottom extends Component {
  static propTypes = {
    toggleEditor: PropTypes.func.isRequired,
    setFocusedNode: PropTypes.func.isRequired,
    newNode: PropTypes.func.isRequired,
    editor: PropTypes.bool.isRequired,
    scale: PropTypes.number.isRequired
  }

  state = {
    redirect: ""
  }

  handleZoomSlider = (e, v) => {
    this.setState({ scale: v })
  }

  handleNewNode = type => {
    const { newNode, setFocusedNode, scale } = this.props
    const newId = rnd()
    const diffs =
      type === "dialogue"
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
      payload: {
        id: newId,
        type,
        title: "untitled",
        tags: [],
        pos: newPos,
        linkable: true,
        collapsed: false,
        bounds: [210],
        ...diffs
      }
    })
    setFocusedNode({ id: newId })
  }

  render() {
    const { scale } = this.props
    const hideEditor = {
      transform: !this.props.editor ? "translateX(28vw)" : "translateX(0)"
    }
    return (
      <div style={{ ...styles.buttonContainer, ...hideEditor }}>
        <FloatingActionButton
          mini={true}
          onClick={() => this.handleNewNode("choice")}
          style={styles.button}
          secondary
          data-tip={"New Choice"}
        >
          <FontIcon className="material-icons">question_answer</FontIcon>
        </FloatingActionButton>
        <FloatingActionButton
          style={styles.button}
          onClick={() => this.handleNewNode("dialogue")}
          secondary
          data-tip={"New Dialogue"}
        >
          <FontIcon className="material-icons md-48">chat</FontIcon>
        </FloatingActionButton>
        <br />

        <Slider
          min={0.2}
          max={1}
          // step={zoomStep}
          value={scale}
          onChange={this.handleZoomSlider}
          sliderStyle={{ marginTop: "5px" }}
        />
      </div>
    )
  }
}

const mapState = ({ scale, editor }) => ({
  scale,
  editor
})

export default connect(mapState, {
  toggleEditor,
  newNode,
  setFocusedNode
})(NavBottom)
