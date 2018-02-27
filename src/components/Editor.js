import React, { Component } from "react"
import {
  BottomNavigationItem,
  BottomNavigation,
  Paper,
  FontIcon,
  IconButton
} from "material-ui"
import EditTab from "./editor/Edit"
import ActorTab from "./editor/Actor"
import KeyTab from "./editor/Key"

const menuIcon = <FontIcon className="material-icons">menu</FontIcon>
const editIcon = <FontIcon className="material-icons">mode_edit</FontIcon>
const actorIcon = <FontIcon className="material-icons">group</FontIcon>
const keyIcon = <FontIcon className="material-icons">vpn_key</FontIcon>
const helpIcon = <FontIcon className="material-icons">help</FontIcon>
const settingsIcon = <FontIcon className="material-icons">settings</FontIcon>

const styles = {
  paper: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "30vw",
    height: "100vh",
    overflow: "hidden",
    transition: "transform 900ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 0ms"
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
  },
  menuButton: {
    left: "-25px",
    padding: 0
  }
}

class Editor extends Component {
  state = {
    editorTab: 0,
    hidden: false
  }

  select = index => this.setState({ editorTab: index })

  toggleEditor = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    const hide = {
      transform: this.state.hidden ? "translateX(28vw)" : "translateX(0)"
    }
    const tabs = [
      <EditTab key={0} />,
      <ActorTab key={1} />,
      <KeyTab key={2} />,
      <div key={3} style={styles.tabContent}>
        <h1>Help will go here</h1>
      </div>,
      <div key={4} style={styles.tabContent}>
        <h1>Settings...</h1>
        <p>eventually</p>
      </div>
    ]

    return (
      <Paper style={{ ...styles.paper, ...hide }}>
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
              icon={helpIcon}
              onClick={() => this.select(3)}
            />
            <BottomNavigationItem
              icon={settingsIcon}
              onClick={() => this.select(4)}
            />
          </BottomNavigation>
        </div>
        <IconButton iconStyle={styles.menuButton} onClick={this.toggleEditor}>
          {menuIcon}
        </IconButton>
      </Paper>
    )
  }
}

export default Editor
