import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { SelectField, TextField, MenuItem } from "material-ui"

import { updateDialogue } from "../../actions"

const styles = {
  textStyle: {
    fontFamily: "Roboto Mono"
  },
  tabContent: {
    margin: "20px"
  }
}

class EditTab extends Component {
  static propTypes = {
    actors: PropTypes.arrayOf(PropTypes.object),
    dialogues: PropTypes.arrayOf(PropTypes.object),
    currentDialogue: PropTypes.number,
    updateDialogue: PropTypes.func.isRequired
  }

  static defaultProps = {
    actors: [],
    dialogues: [],
    currentDialogue: 0
  }

  handleTitleUpdate = event => {
    this.props.updateDialogue({
      index: this.props.currentDialogue,
      dialogue: { title: event.target.value }
    })
  }
  handleTagsUpdate = event => {
    this.props.updateDialogue({
      index: this.props.currentDialogue,
      dialogue: { tags: event.target.value }
    })
  }
  handleActorUpdate = (event, index) => {
    this.props.updateDialogue({
      index: this.props.currentDialogue,
      dialogue: { actor: index }
    })
  }
  handleBodyUpdate = event => {
    this.props.updateDialogue({
      index: this.props.currentDialogue,
      dialogue: { body: event.target.value }
    })
  }

  render() {
    const { actors, dialogues, currentDialogue } = this.props
    const menuItems = actors.map((actor, i) => (
      <MenuItem key={actor.name + i} value={i} primaryText={actor.name} />
    ))

    return (
      <div style={styles.tabContent}>
        <TextField
          name="title"
          fullWidth
          textareaStyle={styles.textStyle}
          floatingLabelFixed
          floatingLabelText={<span>Title</span>}
          value={dialogues[currentDialogue] && dialogues[currentDialogue].title}
          onChange={e => this.handleTitleUpdate(e)}
        />
        <SelectField
          name="actor"
          fullWidth
          floatingLabelFixed
          floatingLabelText={<span>Actor</span>}
          value={dialogues[currentDialogue] && dialogues[currentDialogue].actor}
          onChange={this.handleActorUpdate}
        >
          {menuItems}
        </SelectField>
        <TextField
          name="tags"
          fullWidth
          textareaStyle={styles.textStyle}
          floatingLabelFixed
          floatingLabelText={<span>Tags</span>}
          value={dialogues[currentDialogue] && dialogues[currentDialogue].tags}
          onChange={e => this.handleTagsUpdate(e)}
        />
        <TextField
          name="body"
          multiLine
          fullWidth
          textareaStyle={styles.textStyle}
          floatingLabelFixed
          floatingLabelText={<span>Body</span>}
          value={dialogues[currentDialogue] && dialogues[currentDialogue].body}
          onChange={e => this.handleBodyUpdate(e)}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    actors: state.actors,
    dialogues: state.dialogues,
    currentDialogue: state.currentDialogue
  }
}

export default connect(mapStateToProps, { updateDialogue })(EditTab)
