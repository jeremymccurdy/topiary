import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
  SelectField,
  TextField,
  MenuItem,
  FlatButton,
  Popover,
  Menu
} from "material-ui"
import {
  newActor,
  updateActor,
  deleteActor,
  importActors
} from "../../store/actions"

const styles = {
  textStyle: {
    fontFamily: "Roboto Mono",
    fontSize: 12
  },
  tabContent: {
    margin: "20px"
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
}

class ActorTab extends Component {
  static propTypes = {
    actors: PropTypes.arrayOf(PropTypes.object),
    colors: PropTypes.arrayOf(PropTypes.string),
    newActor: PropTypes.func.isRequired,
    updateActor: PropTypes.func.isRequired,
    deleteActor: PropTypes.func.isRequired,
    importActors: PropTypes.func.isRequired
  }
  static defaultProps = {
    actors: [],
    colors: []
  }
  state = {
    actorIndex: 0,
    playableValue: false,
    selectedIndex: 0,
    importMenu: false
  }

  handleNewActor = () => {
    const { newActor, actors } = this.props
    newActor({ actor: { name: "new", playable: false } })
    this.setState({ actorIndex: actors.length })
  }
  handleActorChange = (event, index) => {
    this.setState({ actorIndex: index })
  }

  handleImportMenu = e => {
    this.setState({ importMenu: true, anchorEl: e.currentTarget })
  }

  handleImportActors = id => {
    const actors = JSON.parse(localStorage.getItem(id)).actors
    this.props.importActors({ actors })
  }

  handleActorNameUpdate = event => {
    this.props.updateActor({
      index: this.state.actorIndex,
      actor: { name: event.target.value }
    })
  }

  handleActorColorUpdate = (event, index, color) => {
    this.props.updateActor({
      index: this.state.actorIndex,
      actor: { color }
    })
  }

  handleActorPlayableUpdate = (event, index, playable) => {
    this.props.updateActor({
      index: this.state.actorIndex,
      actor: { playable }
    })
  }
  handleActorDescriptionUpdate = event => {
    this.props.updateActor({
      index: this.state.actorIndex,
      actor: { description: event.target.value }
    })
  }

  renderImportMenu = () => {
    let existingScenes = []
    for (let i = 0; i < localStorage.length; i++) {
      const scene = JSON.parse(localStorage.getItem(localStorage.key(i))).scene
      existingScenes.push(
        <MenuItem
          primaryText={scene || "untitled scene"}
          onClick={() => this.handleImportActors(localStorage.key(i))}
        />
      )
    }
    return existingScenes.sort((a, b) => a.key > b.key)
  }

  render() {
    const { actors, deleteActor, colors } = this.props
    const { actorIndex, importMenu, anchorEl } = this.state
    const menuItems = actors.map((actor, i) => (
      <MenuItem key={actor.name + i} value={i} primaryText={actor.name} />
    ))
    return (
      <div style={styles.tabContent}>
        <FlatButton label="New" primary={true} onClick={this.handleNewActor} />
        <FlatButton
          label="Import"
          primary={true}
          onClick={this.handleImportMenu}
          data-tip={"Import actors from another scene"}
          data-tippos={"bottom"}
        />
        <Popover
          open={importMenu}
          anchorEl={anchorEl}
          onRequestClose={() => this.setState({ importMenu: false })}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          targetOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <Menu>{this.renderImportMenu()}</Menu>
        </Popover>

        <FlatButton
          label="Delete"
          primary={true}
          onClick={() => deleteActor(actorIndex)}
        />
        <SelectField
          name="Actors"
          value={actorIndex}
          onChange={this.handleActorChange}
          fullWidth
          floatingLabelFixed
          floatingLabelText={<span>Actor</span>}
        >
          {menuItems}
        </SelectField>

        <TextField
          name="Name"
          fullWidth
          textareaStyle={styles.textStyle}
          floatingLabelFixed
          floatingLabelText={<span>Name</span>}
          value={actors[actorIndex] && actors[actorIndex].name}
          onChange={e => this.handleActorNameUpdate(e)}
        />

        <SelectField
          name="Color"
          fullWidth
          floatingLabelFixed
          floatingLabelText={<span>Color</span>}
          labelStyle={{
            backgroundColor: `#${actors[actorIndex] &&
              actors[actorIndex].color}`,
            transform: "scale(0.8, 0.3) translate(-20px, 0)"
          }}
          // label={actors[actorIndex].color}
          onChange={this.handleActorColorUpdate}
        >
          {colors.map(color => (
            <MenuItem
              key={color}
              value={color}
              title={color}
              primaryText=""
              style={{ backgroundColor: `#${color}` }}
            />
          ))}
        </SelectField>

        <SelectField
          name="Playable"
          fullWidth
          floatingLabelFixed
          floatingLabelText={<span>Playable</span>}
          value={actors[actorIndex] && actors[actorIndex].playable}
          onChange={this.handleActorPlayableUpdate}
        >
          <MenuItem value={false} primaryText="No" />
          <MenuItem value={true} primaryText="Yes" />
        </SelectField>
        <TextField
          name="Description"
          fullWidth
          multiLine
          textareaStyle={styles.textStyle}
          floatingLabelFixed
          floatingLabelText={<span>Desciption</span>}
          value={(actors[actorIndex] && actors[actorIndex].description) || ""}
          onChange={e => this.handleActorDescriptionUpdate(e)}
        />
      </div>
    )
  }
}

const mapState = ({ actors, colors }) => ({
  actors,
  colors
})

export default connect(mapState, {
  newActor,
  updateActor,
  deleteActor,
  importActors
})(ActorTab)
