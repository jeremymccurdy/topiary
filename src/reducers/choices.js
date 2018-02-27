const choices = (state = [], action) => {
  switch (action.type) {
    case "NEW_CHOICE":
      return [...state, action.payload]
    case "UPDATE_CHOICE":
      return Object.assign([...state], {
        [action.index]: Object.assign({}, state[action.index], {
          ...action.choice
        })
      })
    case "DELETE_CHOICE":
      return state.filter((actor, i) => i !== action.index)
    default:
      return state
  }
}

export default choices
