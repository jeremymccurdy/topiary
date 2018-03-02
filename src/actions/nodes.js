export const updateNode = ({ id, payload, t }) => {
  if (t === "dialogues") {
    return {
      type: "UPDATE_DIALOGUE",
      id,
      payload
    }
  }
  return {
    type: "UPDATE_CHOICE",
    id,
    payload
  }
}

export const newNode = ({ id, payload, t }) => {
  if (t === "dialogues") {
    return {
      type: "NEW_DIALOGUE",
      id,
      payload
    }
  }
  return {
    type: "NEW_CHOICE",
    id,
    payload
  }
}
export const deleteNode = ({ id, payload, t }) => {
  if (t === "dialogues") {
    return {
      type: "DELETE_DIALOGUE",
      id
    }
  }
  return {
    type: "DELETE_CHOICE",
    id
  }
}
