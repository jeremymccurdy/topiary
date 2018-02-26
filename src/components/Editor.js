import React, { Component } from "react"
import {
  BottomNavigationItem,
  BottomNavigation,
  Paper,
  FontIcon
} from "material-ui"
import EditTab from "./editor/Edit"
import ActorTab from "./editor/Actor"
import KeyTab from "./editor/Key"

const editIcon = <FontIcon className="material-icons">mode_edit</FontIcon>
const actorIcon = <FontIcon className="material-icons">group</FontIcon>
const keyIcon = <FontIcon className="material-icons">vpn_key</FontIcon>
const settingsIcon = <FontIcon className="material-icons">settings</FontIcon>

const styles = {
  paper: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "30vw",
    height: "100vh"
  },
  container: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 70,
    width: "30vw",
    height: "100vh - 70px",
    overflowY: "scroll"
  },
  textStyle: {
    fontFamily: "Roboto Mono"
  },
  tabContent: {
    margin: "20px"
  },
  tabs: {
    position: "fixed",
    width: "30vw",
    bottom: "0px",
    right: "0px",
    zIndex: 4
  }
}

class Editor extends Component {
  state = {
    editorTab: 0
  }

  select = index => this.setState({ editorTab: index })

  render() {
    const tabs = [
      <EditTab key={0} />,
      <ActorTab key={1} />,
      <KeyTab key={2} />,
      <div key={3} style={styles.tabContent}>
        <h1>Settings...</h1>
        <p>eventually</p>
      </div>
    ]

    return (
      <Paper style={styles.paper}>
        <div style={styles.container}>{tabs[this.state.editorTab]}</div>
        <div style={styles.tabs}>
          <BottomNavigation selectedIndex={this.state.editorTab}>
            <BottomNavigationItem
              icon={editIcon}
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              icon={actorIcon}
              onClick={() => this.select(1)}
            />
            <BottomNavigationItem
              icon={keyIcon}
              onClick={() => this.select(2)}
            />
            <BottomNavigationItem
              icon={settingsIcon}
              onClick={() => this.select(3)}
            />
          </BottomNavigation>
        </div>
      </Paper>
    )
  }
}

export default Editor
