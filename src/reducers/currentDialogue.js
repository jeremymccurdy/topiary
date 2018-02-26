const currentDialogue = (state = null, action) => {
  switch (action.type) {
    case "SELECT_DIALOGUE":
      return action.payload
    default:
      return state
  }
}

export default currentDialogue
