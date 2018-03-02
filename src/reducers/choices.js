const choices = (state = [], action) => {
  switch (action.type) {
    case "NEW_CHOICE":
      return {
        ...state,
        [action.id]: action.payload
      }
    case "UPDATE_CHOICE":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.payload
        }
      }
    case "DELETE_CHOICE":
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

export default choices
