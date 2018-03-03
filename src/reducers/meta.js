const meta = (state = null, action) => {
  switch (action.type) {
    case "TOGGLE_EDITOR":
      return {
        ...state,
        editorHidden: action.editorHidden
      }
    case "LINK_STATUS":
      return {
        ...state,
        ...action
      }
    case "WARNING_MESSAGE":
      return {
        ...state,
        ...action
      }
    default:
      return state
  }
}

export default meta
