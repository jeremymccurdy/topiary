import React, { Component } from "react"
import Draggable from "react-draggable"
import PropTypes from "prop-types"
import Node from "./Node"
import tree from "../../lib/tree"

const styles = {
  dragContainer: {
    width: "210px",
    position: "absolute"
  }
}

export default class NodeList extends Component {
  static propTypes = {
    dialogues: PropTypes.object,
    choices: PropTypes.object,
    gridSize: PropTypes.number,
    actors: PropTypes.array,
    selectNode: PropTypes.func,
    updateNode: PropTypes.func,
    meta: PropTypes.object
  }

  handleNodePositionUpdate(event, data, id, t) {
    this.props.updateNode({
      id,
      t,
      payload: { pos: [data.lastX, data.lastY] }
    })
  }
  render() {
    const {
      dialogues,
      choices,
      gridSize,
      actors,
      selectNode,
      updateNode,
      meta
    } = this.props
    const nodes = { ...dialogues, ...choices }
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
          onMouseDown={e => {
            if (meta.linkStatus)
              return tree.setLink({ linkTo: { t: n.t, id: n.id } })
            selectNode({ t: n.t, id: n.id })
          }}
          onStop={(e, data) =>
            this.handleNodePositionUpdate(e, data, n.id, n.t)
          }
        >
          <div id={n.id} style={styles.dragContainer}>
            <Node
              id={n.id}
              t={n.t}
              title={n.title}
              tags={n.tags}
              body={n.body}
              actor={actors[n.actor] && actors[n.actor].name}
              color={actors[n.actor] && actors[n.actor].color}
              next={n.next}
              pos={n.pos}
              bounds={n.bounds}
              updateNode={updateNode}
              selectNode={selectNode}
            />
          </div>
        </Draggable>
      )
    })
  }
}
