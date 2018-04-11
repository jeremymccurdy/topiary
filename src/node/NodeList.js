import React, { Component } from "react"
import { connect } from "react-redux"
import Draggable from "react-draggable"
import PropTypes from "prop-types"
import NodeContainer from "./NodeContainer"
import {
  setFocusedNode,
  setFocusedLink,
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
    FocusedLink: PropTypes.object.isRequired,
    FocusedNode: PropTypes.string.isRequired,
    setFocusedNode: PropTypes.func.isRequired,
    setFocusedLink: PropTypes.func.isRequired,
    newLink: PropTypes.func.isRequired,
    updateNode: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired
  }

  state = {
    xAdjust: 0,
    yAdjust: 0,
    nonLinkables: [],
    dragging: false
  }

  handleNodePositionAdjust(event, data) {
    const { scale } = this.props
    this.setState({
      xAdjust: data.deltaX / scale,
      yAdjust: data.deltaY / scale,
      dragging: true
    })
  }

  handleNodePositionUpdate(event, data, id) {
    this.props.updateNode({
      id,
      payload: { pos: [data.lastX, data.lastY] }
    })
    this.setState({ xAdjust: 0, yAdjust: 0, dragging: false })
  }

  isFocusedNode = id => {
    return this.props.FocusedNode === id
  }

  isInSearch = (body, title, tags) => {
    const { search: { text, status } } = this.props
    if (!status || !text) return {}
    const t = text.toLowerCase()
    if (
      body.toLowerCase().includes(t) ||
      title.toLowerCase().includes(t) ||
      tags
        .join(" ")
        .toLowerCase()
        .includes(t)
    ) {
      return {
        boxShadow: `0 0 20px 5px rgba(0,40,0,0.5)`,
        borderRadius: "4px"
      }
    }
    return {}
  }

  render() {
    const {
      nodes,
      FocusedLink,
      setFocusedNode,
      setFocusedLink,
      newLink,
      FocusedNode
    } = this.props
    return Object.values(nodes).map(n => {
      let x, y
      if (n.collapsed.status) {
        x = n.collapsed.pos[0]
        y = n.collapsed.pos[1]
      } else {
        x = Math.round(n.pos[0] / gridSize) * gridSize
        y = Math.round(n.pos[1] / gridSize) * gridSize
      }
      return (
        <Draggable
          key={n.id}
          position={{
            x,
            y
          }}
          handle=".draggable"
          grid={[gridSize, gridSize]}
          onMouseDown={() => {
            if (n.linkable) {
              if (FocusedLink.status) {
                newLink({
                  from: FocusedLink.from,
                  to: n.id
                })
                return setFocusedLink({ status: false })
              }
              if (FocusedNode !== n.id) {
                setFocusedNode({ id: n.id })
              }
            }
          }}
          onDrag={(e, data) => this.handleNodePositionAdjust(e, data)}
          onStop={(e, data) => {
            if (this.state.xAdjust !== 0 || this.state.yAdjust !== 0)
              this.handleNodePositionUpdate(e, data, n.id)
          }}
        >
          <div
            id={n.id}
            style={{
              ...styles.dragContainer,
              ...this.isInSearch(n.body, n.title, n.tags),
              zIndex: this.isFocusedNode(n.id) ? 10 : 1,
              transition: this.state.dragging
                ? "none"
                : "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"
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

const mapState = ({ scale, nodes, FocusedLink, FocusedNode, search }) => ({
  scale,
  nodes,
  FocusedLink,
  FocusedNode,
  search
})

export default connect(mapState, {
  setFocusedNode,
  setFocusedLink,
  newLink,
  updateNode
})(NodeList)
