import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import {
  Toolbar,
  ToolbarTitle,
  ToolbarGroup,
  TextField,
  FontIcon,
  IconButton
} from "material-ui"
import { updateScene } from "../store/actions"
import { saveState } from "../store/localStorage"
import { focusedStore } from "../app/Scene"
import NavBottom from "./NavBottom"

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "30vw",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  textField: {
    marginRight: "30px",
    width: "30vw"
  },
  textStyle: {
    fontFamily: "Roboto Mono"
  },
  title: {
    color: "#558b2f"
  }
}

class Nav extends Component {
  static propTypes = {
    updateScene: PropTypes.func.isRequired,
    scene: PropTypes.string.isRequired
  }

  state = {
    redirect: ""
  }

  handleSceneUpdate = e => {
    this.props.updateScene({ scene: e.target.value })
  }

  render() {
    const { scene } = this.props
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <Fragment>
        <Toolbar style={styles.container}>
          <ToolbarGroup>
            <IconButton
              tooltip="Home"
              onClick={() => {
                saveState(focusedStore.getState())
                this.setState({ redirect: "/" })
              }}
            >
              <FontIcon className="material-icons">home</FontIcon>
            </IconButton>
            <ToolbarTitle text="topiary" style={styles.title} />
            <TextField
              name="scene"
              fullWidth
              style={styles.textField}
              textareaStyle={styles.textStyle}
              hintText="Scene"
              onChange={this.handleSceneUpdate}
              value={scene}
            />
          </ToolbarGroup>
        </Toolbar>
        <NavBottom />
      </Fragment>
    )
  }
}

const mapState = ({ scene }) => ({ scene })

export default connect(mapState, { updateScene })(Nav)
