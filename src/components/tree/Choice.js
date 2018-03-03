import React, { Component } from "react"
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
import Corner from "./Corner"
import tree from "../../lib/tree"

const styles = {
  container: {
    width: "210px"
  },
  title: {
    paddingRight: 20,
    display: "block",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
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
  }
}

class Dialogue extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
    body: PropTypes.string,
    id: PropTypes.string.isRequired,
    updateNode: PropTypes.func.isRequired,
    bounds: PropTypes.array,
    pos: PropTypes.array
  }

  static defaultProps = {
    tags: [],
    body: ""
  }
  state = {
    expanded: true,
    widthAdjustment: 0
  }

  handleExpandChange = expanded => {
    this.setState({ expanded })
  }

  adjustWidth = (event, data) => {
    this.setState({ widthAdjustment: data.x })
  }

  updateWidth = () => {
    const { bounds, updateNode, id } = this.props
    updateNode({
      id,
      t: "choices",
      payload: { bounds: [bounds[0] + this.state.widthAdjustment] }
    })
  }

  render() {
    const { id, tags, body } = this.props
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
        style={{ width: `calc(210px + ${this.state.widthAdjustment}px)` }}
      >
        <CardHeader
          showExpandableButton
          title={this.state.expanded ? "" : body}
          titleStyle={{
            ...styles.title,
            width: `calc(150px + ${this.state.widthAdjustment}px)`
          }}
          style={{
            padding: 10,
            height: 20
          }}
          className={"draggable"}
        />
        <CardText style={styles.body} expandable>
          {tags && <div style={styles.tagWrapper}>{chipTags}</div>}
          {body}
        </CardText>
        <CardActions style={styles.footer}>
          {this.state.expanded && (
            <IconButton
              style={styles.button}
              iconStyle={styles.icon}
              onClick={() => tree.deleteNode({ t: "choices", id })}
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
                linkFrom: { t: "choices", id }
              })
            }
          >
            <FontIcon className="material-icons">linear_scale</FontIcon>
          </IconButton>
          <IconButton style={styles.button} iconStyle={styles.icon}>
            <FontIcon className="material-icons">layers</FontIcon>
          </IconButton>
        </CardActions>
        <Corner adjustWidth={this.adjustWidth} />
      </Card>
    )
  }
}

export default Dialogue
