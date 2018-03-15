export const actors = (state = [], { type, index, actor, actors }) => {
  switch (type) {
    case "NEW_ACTOR":
      return [...state, actor]
    case "UPDATE_ACTOR":
      return Object.assign([...state], {
        [index]: Object.assign({}, state[index], {
          ...actor
        })
      })
    case "DELETE_ACTOR":
      return state.filter((actor, i) => i !== index)
    case "IMPORT_ACTORS":
      return actors
    default:
      return state
  }
}

export const colors = (state = [], { type, color, index }) => {
  switch (type) {
    case "NEW_COLOR":
      return [...state, color]
    case "DELETE_KEY":
      return state.filter((color, i) => i !== index)
    default:
      return state
  }
}
