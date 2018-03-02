const dialogues = (state = {}, action) => {
  switch (action.type) {
    case "NEW_DIALOGUE":
      return {
        ...state,
        [action.id]: action.payload
      }
    case "UPDATE_DIALOGUE":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.payload
        }
      }
    case "DELETE_DIALOGUE":
      return Object.keys(state).reduce((acc, key) => {
        if (key !== action.id) {
          return { ...acc, [key]: state[key] }
        }
        return acc
      }, {})
    default:
      return state
  }
}

export default dialogues
