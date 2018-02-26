const keys = (state = [], action) => {
  switch (action.type) {
    case "NEW_KEY":
      return [...state, action.payload]
    case "DELETE_KEY":
      return state.filter((key, i) => i !== action.index)
    default:
      return state
  }
}

export default keys
