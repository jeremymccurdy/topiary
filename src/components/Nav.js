import React, { Component } from "react"
import { Toolbar, ToolbarTitle, ToolbarGroup, TextField } from "material-ui"

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "70vw",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  textField: {
    marginRight: "30px",
    width: "60vw"
  },
  textStyle: {
    fontFamily: "Roboto Mono"
  }
}

class Nav extends Component {
  render() {
    return (
      <Toolbar style={styles.container}>
        <ToolbarGroup>
          <ToolbarTitle text="dTree" />
          <TextField
            name="scene"
            fullWidth
            underlineShow={false}
            style={styles.textField}
            textareaStyle={styles.textStyle}
            hintText="Scene"
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default Nav
