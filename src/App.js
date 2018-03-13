import React, { Component } from "react"
import { MuiThemeProvider, getMuiTheme } from "material-ui/styles/"
import Editor from "./app/Editor"
import Tree from "./app/Tree"
import Nav from "./app/Nav"
import Tooltip from "./app/Tooltip"

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#43a047",
    primary2Color: "#558b2f",
    accent1Color: "#33691e",
    primary3Color: "#81c784",
    pickerHeaderColor: "#009688"
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Tree />
          <Editor />
          <Nav />
          <Tooltip />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
