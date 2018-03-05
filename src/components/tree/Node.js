import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
  FontIcon,
  IconButton,
  Card,
  CardActions,
  CardHeader,
  CardText,
  Chip
} from "material-ui"
import { updateNode } from "../../actions"
import Corner from "./Corner"
import tree from "../../lib/tree"

const styles = {
  title: {
    paddingRight: 20
  },
  body: {
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
    padding: "2px 10px 5px",
    margin: "5px 0px 0px"
  },
  footer: {
    height: "16px",
    textAlign: "right",
    paddingRight: 10
  },
  button: {
    width: 14,
    height: 14,
    padding: 0,
    margin: 0
  },
  icon: {
    fontSize: 14
  },
  tagWrapper: {
    display: "flex",
    flexWrap: "wrap"
  },
  tagChip: {
    height: 20,
    margin: "2px 2px 5px",
    borderRadius: 8,
    padding: "0 8px"
  },
  tag: {
    fontSize: 11,
    lineHeight: "20px",
    padding: 0
  },
  divider: {
    margin: "5px 0px"
  },
  corner: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 0,
    padding: 0,
    transition: `transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms`
  }
}

class Node extends Component {
  static propTypes = {
    title: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    body: PropTypes.string,
    color: PropTypes.string,
    id: PropTypes.string.isRequired,
    t: PropTypes.string.isRequired,
    actor: PropTypes.string,
    dialogues: PropTypes.object,
    choices: PropTypes.object,
    currentNode: PropTypes.object,
    pos: PropTypes.array,
    bounds: PropTypes.array,
    next: PropTypes.array,
    updateNode: PropTypes.func.isRequired
  }
  static defaultProps = {
    title: "",
    tags: [],
    actor: "",
    color: "FFFFFF",
    body: "",
    currentNode: {}
  }
  state = {
    expanded: true,
    collapsed: false,
    widthAdjustment: 0
  }

  handleExpandChange = expanded => {
    this.setState({ expanded })
  }

  handleCollapse = (next, collapsePos) => {
    const { pos, updateNode } = this.props
    if (next) {
      next.forEach(n => {
        updateNode({
          id: n.id,
          t: n.t,
          payload: { collapsed: true }
        })
      })
    }
  }

  adjustWidth = (event, data) => {
    this.setState({ widthAdjustment: data.x })
  }

  updateWidth = () => {
    const { bounds, updateNode, id, t } = this.props
    updateNode({
      id,
      t,
      payload: { bounds: [bounds[0] + this.state.widthAdjustment] }
    })
    this.setState({ widthAdjustment: 0 })
  }

  currentNodeColor = () => {
    const { id, currentNode } = this.props
    return currentNode.id === id
      ? `linear-gradient(0deg, #43a047 10%, #FFFFFF 10%)`
      : "#FFFFFF"
  }

  render() {
    const { id, t, title, tags, body, color, actor, bounds, next } = this.props
    const { widthAdjustment } = this.state
    const chipTags = tags.map(tag => (
      <Chip key={tag} style={styles.tagChip} labelStyle={styles.tag}>
        {tag}
      </Chip>
    ))
    return (
      <Card
        initiallyExpanded
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
        style={{ width: `calc(${bounds[0]}px + ${widthAdjustment}px)` }}
      >
        <CardHeader
          title={title}
          subtitle={actor}
          showExpandableButton
          style={{
            fontWeight: "bold",
            padding: 10,
            backgroundColor: `#${color}`
          }}
          textStyle={styles.title}
          className={"draggable"}
        />
        <CardText style={styles.body} expandable>
          {tags && <div style={styles.tagWrapper}>{chipTags}</div>}
          {body}
        </CardText>
        <CardActions
          style={{
            ...styles.footer,
            background: this.currentNodeColor()
          }}
        >
          {this.state.expanded && (
            <IconButton
              style={styles.button}
              iconStyle={styles.icon}
              onClick={() => tree.deleteNode({ t, id })}
            >
              <FontIcon className="material-icons">delete</FontIcon>
            </IconButton>
          )}
          <IconButton
            style={styles.button}
            iconStyle={styles.icon}
            onClick={() =>
              tree.setLink({
                linkStatus: true,
                linkFrom: { t, id }
              })
            }
          >
            <FontIcon className="material-icons">arrow_forward</FontIcon>
          </IconButton>
          <IconButton
            style={styles.button}
            iconStyle={styles.icon}
            onClick={() => {
              this.setState({ collapsed: !this.state.collapsed })
              this.handleCollapse(next)
            }}
          >
            <FontIcon className="material-icons">layers</FontIcon>
          </IconButton>
        </CardActions>
        <Corner adjustWidth={this.adjustWidth} updateWidth={this.updateWidth} />
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    choices: state.choices,
    dialogues: state.dialogues,
    currentNode: state.currentNode
  }
}

export default connect(mapStateToProps, { updateNode })(Node)
