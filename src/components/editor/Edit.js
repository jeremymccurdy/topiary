import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { SelectField, TextField, MenuItem, Chip } from "material-ui"

import { updateDialogue } from "../../actions"

const styles = {
  textStyle: {
    fontFamily: "Roboto Mono"
  },
  tabContent: {
    margin: "20px"
  },
  tagWrapper: {
    // display: "inline-flex",
    // flexWrap: "wrap",
    width: "100%"
  },
  tagChip: {
    display: "inline-flex",
    flexWrap: "wrap",
    margin: "5px"
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

  state = {
    tagsField: ""
  }

  handleTitleUpdate = event => {
    this.props.updateDialogue({
      index: this.props.currentDialogue,
      dialogue: { title: event.target.value }
    })
  }
  handleTagsUpdate = event => {
    this.setState({ tagsField: this.state.tagsField + event.key })
    const { dialogues, currentDialogue, updateDialogue } = this.props
    const { tags } = dialogues[currentDialogue]
    if (event.key === "Enter") {
      updateDialogue({
        index: currentDialogue,
        dialogue: {
          tags: tags ? [...tags, event.target.value] : [event.target.value]
        }
      })
      this.setState({ tagsField: "" })
    }
  }

  handleDeleteTag = index => {
    const { dialogues, currentDialogue, updateDialogue } = this.props
    const { tags } = dialogues[currentDialogue]
    updateDialogue({
      index: currentDialogue,
      dialogue: {
        tags: tags.filter((tag, i) => i !== index)
      }
    })
  }

  handleActorUpdate = (event, index) => {
    this.props.updateDialogue({
      index: this.props.currentDialogue,
      dialogue: { actor: index }
    })
  }

  handleConditionsUpdate = event => {
    this.props.updateDialogue({
      index: this.props.currentDialogue,
      dialogue: { conditions: event.target.value }
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

    const chipTags =
      dialogues[currentDialogue] &&
      dialogues[currentDialogue].tags.map((tag, i) => (
        <Chip
          key={tag}
          style={styles.tagChip}
          // labelStyle={styles.tag}
          onRequestDelete={() => this.handleDeleteTag(i)}
        >
          {tag}
        </Chip>
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
          value={this.state.tagsField}
          onKeyPress={this.handleTagsUpdate}
        />
        <div style={styles.tagsWrapper}>{chipTags}</div>
        <TextField
          name="conditions"
          fullWidth
          textareaStyle={styles.textStyle}
          floatingLabelFixed
          floatingLabelText={<span>Conditions</span>}
          value={
            dialogues[currentDialogue] && dialogues[currentDialogue].conditions
          }
          onKeyPress={e => this.handleConditionsUpdate(e)}
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
