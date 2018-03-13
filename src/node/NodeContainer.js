import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Node from "./Node"
import { makeGetNode, makeConnectedNodes } from "../store/selectors"
import {
  updateNode,
  setCurrentLink,
  deleteAllLinks,
  deleteNode
} from "../store/actions"

class NodeContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    node: PropTypes.object,
    updateNode: PropTypes.func.isRequired,
    setCurrentLink: PropTypes.func.isRequired,
    deleteAllLinks: PropTypes.func.isRequired,
    deleteNode: PropTypes.func.isRequired,
    currentLink: PropTypes.object.isRequired
  }
  static defaultProps = {
    node: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentLink.status !== this.props.currentLink.status) {
      const { id, updateNode, node } = this.props
      if (nextProps.node.id === nextProps.currentLink.from) {
        nextProps.node.next.forEach(n => {
          updateNode({ id: n, payload: { linkable: false } })
        })
      }
      if (node.linkable === false) {
        updateNode({ id, payload: { linkable: true } })
      }
    }
  }

  render() {
    const {
      node,
      updateNode,
      setCurrentLink,
      deleteNode,
      deleteAllLinks
    } = this.props
    return (
      <Node
        {...{
          ...node,
          updateNode,
          setCurrentLink,
          deleteAllLinks,
          deleteNode
        }}
      />
    )
  }
}

const makeMapState = () => {
  const getNode = makeGetNode()
  const getConnected = makeConnectedNodes()
  return ({ nodes, actors, currentNode, currentLink, links }, { id }) => ({
    node: {
      ...getNode({ nodes, actors, currentNode }, { id }),
      ...getConnected({ links }, { id })
    },
    currentLink
  })
}

export default connect(makeMapState, {
  updateNode,
  deleteNode,
  setCurrentLink,
  deleteAllLinks
})(NodeContainer)
