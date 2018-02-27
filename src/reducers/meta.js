const meta = (state = null, action) => {
  switch (action.type) {
    case "TOGGLE_EDITOR":
      return {
        ...state,
        editorHidden: action.editorHidden
      }
    default:
      return state
  }
}

export default meta
