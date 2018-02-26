export const newKey = key => {
  return {
    type: "NEW_KEY",
    payload: key
  }
}

export const deleteKey = index => {
  return {
    type: "DELETE_KEY",
    index
  }
}
