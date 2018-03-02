export const currentEdit = ({ t, id }) => {
  return {
    type: "SELECT_EDIT",
    id,
    t
  }
}
