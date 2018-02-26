import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  FontIcon,
  IconButton,
  Card,
  CardActions,
  CardHeader,
  CardText
} from "material-ui"

const styles = {
  container: {
    width: "200px"
  },
  title: {
    paddingRight: 20
  },
  body: {
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap"
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
  }
}

class Dialogue extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    deleteDialogue: PropTypes.func.isRequired
  }
  state = {
    expanded: true
  }

  handleExpandChange = expanded => {
    this.setState({ expanded })
  }

  render() {
    const { index, title, tags, body, deleteDialogue, color } = this.props
    return (
      <Card
        initiallyExpanded
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
        style={styles.container}
      >
        <CardHeader
          title={title}
          subtitle={tags}
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
      </Card>
    )
  }
}

export default Dialogue
