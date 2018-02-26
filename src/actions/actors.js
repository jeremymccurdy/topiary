export const newActor = actor => {
  return {
    type: "NEW_ACTOR",
    payload: actor
  }
}

export const updateActor = ({ index, actor }) => {
  return {
    type: "UPDATE_ACTOR",
    index,
    actor
  }
}

export const deleteActor = index => {
  return {
    type: "DELETE_ACTOR",
    index
  }
}
