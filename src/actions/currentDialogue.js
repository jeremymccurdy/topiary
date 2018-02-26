export const currentDialogue = index => {
  return {
    type: "SELECT_DIALOGUE",
    payload: index
  }
}
