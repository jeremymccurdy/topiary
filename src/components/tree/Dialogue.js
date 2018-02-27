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
import Draggable from "react-draggable"

const styles = {
  container: {
    width: "210px"
  },
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

class Dialogue extends Component {
  static propTypes = {
    title: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    body: PropTypes.string,
    color: PropTypes.string,
    index: PropTypes.number.isRequired,
    actor: PropTypes.string,
    deleteDialogue: PropTypes.func.isRequired
  }
  static defaultProps = {
    title: "",
    tags: [],
    actor: "",
    color: "FFFFFF",
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

  render() {
    const {
      index,
      title,
      tags,
      body,
      deleteDialogue,
      color,
      actor
    } = this.props
    const chipTags = tags.map(tag => (
      <Chip key={tag} style={styles.tagChip} labelStyle={styles.tag}>
        {tag}
      </Chip>
    ))

    const corner = (
      <Draggable
        axis="x"
        grid={[30, 30]}
        onDrag={(e, d) => this.adjustWidth(e, d)}
      >
        <svg
          style={styles.corner}
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-labelledby="corner"
        >
          <title id="corner">corner</title>
          <polygon
            points="10 0, 10 10, 0 10"
            stroke="black"
            fill="black"
            strokeWidth="1"
          />
        </svg>
      </Draggable>
    )
    return (
      <Card
        initiallyExpanded
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
        style={{ width: `calc(210px + ${this.state.widthAdjustment}px)` }}
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
        <CardActions style={styles.footer}>
          {this.state.expanded && (
            <IconButton
              style={styles.button}
              iconStyle={styles.icon}
              onClick={() => deleteDialogue(index)}
            >
              <FontIcon className="material-icons">delete</FontIcon>
            </IconButton>
          )}
          <IconButton style={styles.button} iconStyle={styles.icon}>
            <FontIcon className="material-icons">linear_scale</FontIcon>
          </IconButton>
          <IconButton style={styles.button} iconStyle={styles.icon}>
            <FontIcon className="material-icons">layers</FontIcon>
          </IconButton>
        </CardActions>
        {corner}
      </Card>
    )
  }
}

export default Dialogue
