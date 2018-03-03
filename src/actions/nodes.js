export const updateNode = ({ id, payload, t }) => {
  switch (t) {
    case "dialogues":
      return {
        type: "UPDATE_DIALOGUE",
        id,
        payload
      }
    case "choices":
      return {
        type: "UPDATE_CHOICE",
        id,
        payload
      }
    default:
      return
  }
}

export const newNode = ({ id, payload, t }) => {
  switch (t) {
    case "dialogues":
      return {
        type: "NEW_DIALOGUE",
        id,
        payload
      }
    case "choices":
      return {
        type: "NEW_CHOICE",
        id,
        payload
      }
    default:
      return
  }
}
export const deleteNode = ({ id, t }) => {
  switch (t) {
    case "dialogues":
      return {
        type: "DELETE_DIALOGUE",
        id
      }
    case "choices":
      return {
        type: "DELETE_CHOICE",
        id
      }
    default:
      return
  }
}
