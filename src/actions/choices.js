export const newChoice = choice => {
  return {
    type: "NEW_CHOICE",
    payload: choice
  }
}

export const updateChoice = ({ index, choice }) => {
  return {
    type: "UPDATE_CHOICE",
    index,
    choice
  }
}

export const deleteChoice = index => {
  return {
    type: "DELETE_CHOICE",
    index
  }
}
