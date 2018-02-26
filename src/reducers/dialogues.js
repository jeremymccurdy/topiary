const dialogues = (state = [], action) => {
  switch (action.type) {
    case "NEW_DIALOGUE":
      return [...state, action.payload]
    case "UPDATE_DIALOGUE":
      return Object.assign([...state], {
        [action.index]: Object.assign({}, state[action.index], {
          ...action.dialogue
        })
      })
    case "DELETE_DIALOGUE":
      return state.filter((actor, i) => i !== action.index)
    default:
      return state
  }
}

export default dialogues
