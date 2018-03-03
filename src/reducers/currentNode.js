const currentNode = (state = null, action) => {
  switch (action.type) {
    case "SELECT_NODE":
      return {
        id: action.id,
        t: action.t
      }
    default:
      return state
  }
}

export default currentNode
