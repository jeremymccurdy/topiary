export const newDialogue = dialogue => {
  return {
    type: "NEW_DIALOGUE",
    payload: dialogue
  }
}

export const updateDialogue = ({ index, dialogue }) => {
  return {
    type: "UPDATE_DIALOGUE",
    index,
    dialogue
  }
}

export const deleteDialogue = index => {
  return {
    type: "DELETE_DIALOGUE",
    index
  }
}
