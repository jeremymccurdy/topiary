export const newColor = color => {
  return {
    type: "NEW_KEY",
    color
  }
}

export const deleteColor = index => {
  return {
    type: "DELETE_COLOR",
    index
  }
}
