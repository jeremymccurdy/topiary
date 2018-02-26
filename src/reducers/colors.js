const colors = (state = [], action) => {
  switch (action.type) {
    case "NEW_COLOR":
      return [...state, action.color]
    case "DELETE_KEY":
      return state.filter((color, i) => i !== action.index)
    default:
      return state
  }
}

export default colors
