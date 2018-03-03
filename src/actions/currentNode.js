export const selectNode = ({ t, id }) => {
  return {
    type: "SELECT_NODE",
    id,
    t
  }
}
