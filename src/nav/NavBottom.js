import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
  FloatingActionButton,
  FontIcon,
  IconButton,
  TextField
} from "material-ui"
import { rnd } from "../lib/math"
import { gridSize } from "../lib/view"
import {
  toggleEditor,
  setFocusedNode,
  newNode,
  updateSearch
} from "../store/actions"

const styles = {
  icon: {
    width: 30,
    height: 30,
    stroke: "green",
    color: "green"
  },
  buttonContainer: {
    position: "fixed",
    left: "calc(70vw - 60px)",
    top: "calc(100vh - 160px)",
    transition: "transform 900ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 0ms",
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto"
  },
  button: {
    margin: "5px",
    boxShadow: "none",
    marginLeft: "auto"
  },
  searchContainer: {
    display: "inline"
  },
  searchField: {
    position: "fixed",
    left: "-10vw",
    width: "10vw"
  },
  textStyle: {
    textAlign: "right"
  }
}

class NavBottom extends Component {
  static propTypes = {
    toggleEditor: PropTypes.func.isRequired,
    setFocusedNode: PropTypes.func.isRequired,
    updateSearch: PropTypes.func.isRequired,
    newNode: PropTypes.func.isRequired,
    editor: PropTypes.bool.isRequired,
    scale: PropTypes.number.isRequired,
    search: PropTypes.object.isRequired
  }

  state = {
    redirect: "",
    searchVisible: false,
    searchText: ""
  }

  handleNewNode = type => {
    const { newNode, setFocusedNode, scale } = this.props
    const newId = rnd()
    const diffs =
      type === "dialogue"
        ? { actor: 0, body: "new dialogue" }
        : { body: "new choice" }
    const newPos = [
      Math.round(
        (window.pageXOffset + window.innerWidth / 2 - 100) / gridSize
      ) *
        gridSize *
        scale,
      Math.round(
        (window.pageYOffset + window.innerHeight / 2 - 50) / gridSize
      ) *
        gridSize *
        scale
    ]
    newNode({
      id: newId,
      payload: {
        id: newId,
        type,
        title: "untitled",
        tags: [],
        pos: newPos,
        linkable: true,
        collapsed: { status: false, pos: [], bounds: [] },
        conditions: "",
        bounds: [210],
        ...diffs
      }
    })
    setFocusedNode({ id: newId })
  }

  handleSearchButton = () => {
    const { search, updateSearch } = this.props
    updateSearch({ search: { status: !search.status } })
  }

  handleSearchText = e => {
    this.props.updateSearch({ search: { text: e.target.value } })
  }

  render() {
    const { search } = this.props
    const hideEditor = {
      transform: !this.props.editor ? "translateX(28vw)" : "translateX(0)"
    }
    return (
      <div style={{ ...styles.buttonContainer, ...hideEditor }}>
        <FloatingActionButton
          mini
          style={styles.button}
          onClick={() => this.handleNewNode("dialogue")}
          secondary
          data-tip={"New Dialogue"}
          data-tippos={"left"}
        >
          <FontIcon className="material-icons md-48">chat</FontIcon>
        </FloatingActionButton>

        <FloatingActionButton
          tooltip="Choice"
          mini
          onClick={() => this.handleNewNode("choice")}
          style={styles.button}
          secondary
          data-tip={"New Choice"}
          data-tippos={"left"}
        >
          <FontIcon className="material-icons">question_answer</FontIcon>
        </FloatingActionButton>
        <div style={styles.searchContainer}>
          <TextField
            name="search"
            fullWidth
            style={{
              ...styles.searchField,
              display: search.status ? "block" : "none"
            }}
            textareaStyle={styles.textStyle}
            hintText="Search"
            onChange={this.handleSearchText}
            value={search.text}
          />
          <IconButton
            onClick={this.handleSearchButton}
            // Fix styling
            data-tip={"Search"}
            data-tippos={"left"}
          >
            <FontIcon className="material-icons">search</FontIcon>
          </IconButton>
        </div>
      </div>
    )
  }
}

const mapState = ({ scale, editor, search }) => ({
  scale,
  editor,
  search
})

export default connect(mapState, {
  toggleEditor,
  newNode,
  setFocusedNode,
  updateSearch
})(NavBottom)
