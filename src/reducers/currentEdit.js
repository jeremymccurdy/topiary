const currentEdit = (state = null, action) => {
  switch (action.type) {
    case "SELECT_EDIT":
      return {
        id: action.id,
        t: action.t
      }
    default:
      return state
  }
}

export default currentEdit
