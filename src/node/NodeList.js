import React, { Component } from "react"
import { connect } from "react-redux"
import Draggable from "react-draggable"
import PropTypes from "prop-types"
import NodeContainer from "./NodeContainer"
import {
  setCurrentNode,
  setCurrentLink,
  newLink,
  updateNode
} from "../store/actions"
import { gridSize } from "../lib/view"

const styles = {
  dragContainer: {
    width: "210px",
    position: "absolute"
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.1)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
}

class NodeList extends Component {
  static propTypes = {
    scale: PropTypes.number.isRequired,
    nodes: PropTypes.object.isRequired,
    currentLink: PropTypes.object.isRequired,
    currentNode: PropTypes.string.isRequired,
    setCurrentNode: PropTypes.func.isRequired,
    setCurrentLink: PropTypes.func.isRequired,
    newLink: PropTypes.func.isRequired,
    updateNode: PropTypes.func.isRequired
  }

  state = {
    xAdjust: 0,
    yAdjust: 0,
    nonLinkables: []
  }

  handleNodePositionAdjust(event, data) {
    const { scale } = this.props
    this.setState({
      xAdjust: data.deltaX / scale,
      yAdjust: data.deltaY / scale
    })
  }

  handleNodePositionUpdate(event, data, id) {
    this.props.updateNode({
      id,
      payload: { pos: [data.lastX, data.lastY] }
    })
    this.setState({ xAdjust: 0, yAdjust: 0 })
  }

  isCurrentNode = id => {
    return this.props.currentNode === id
  }

  render() {
    const {
      nodes,
      currentLink,
      setCurrentNode,
      setCurrentLink,
      newLink
    } = this.props
    return Object.values(nodes).map(n => {
      return (
        <Draggable
          key={n.id}
          position={{
            x: Math.round(n.pos[0] / gridSize) * gridSize,
            y: Math.round(n.pos[1] / gridSize) * gridSize
          }}
          handle=".draggable"
          grid={[gridSize, gridSize]}
          onMouseDown={() => {
            if (n.linkable) {
              if (currentLink.status) {
                newLink({
                  from: currentLink.from,
                  to: n.id
                })
                return setCurrentLink({ status: false })
              }
              setCurrentNode({ id: n.id })
            }
          }}
          onDrag={(e, data) => this.handleNodePositionAdjust(e, data)}
          onStop={(e, data) => this.handleNodePositionUpdate(e, data, n.id)}
        >
          <div
            id={n.id}
            style={{
              ...styles.dragContainer,
              zIndex: this.isCurrentNode(n.id) ? 10 : 1
            }}
          >
            <NodeContainer id={n.id} />
            <div
              style={{
                ...styles.overlay,
                display: n.linkable ? "none" : "block"
              }}
            />
          </div>
        </Draggable>
      )
    })
  }
}

const mapState = ({ scale, nodes, currentLink, currentNode }) => ({
  scale,
  nodes,
  currentLink,
  currentNode
})

export default connect(mapState, {
  setCurrentNode,
  setCurrentLink,
  newLink,
  updateNode
})(NodeList)
