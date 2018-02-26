import React, { Component } from "react"
import { MuiThemeProvider, getMuiTheme } from "material-ui/styles/"
import Editor from "./components/Editor"
import Tree from "./components/Tree"

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
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
