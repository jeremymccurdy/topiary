const actors = (state = [], action) => {
  switch (action.type) {
    case "NEW_ACTOR":
      return [...state, action.payload]
    case "UPDATE_ACTOR":
      return Object.assign([...state], {
        [action.index]: Object.assign({}, state[action.index], {
          ...action.actor
        })
      })
    case "DELETE_ACTOR":
      return state.filter((actor, i) => i !== action.payload)
    default:
      return state
  }
}

export default actors
