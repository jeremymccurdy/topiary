export const newLink = ({ from, to }) => ({
  type: "NEW_LINK",
  from,
  to
})

export const deleteLink = ({ from, to }) => ({
  type: "DELETE_LINK",
  from,
  to
})

export const deleteAllLinks = ({ id }) => ({
  type: "DELETE_ALL_LINKS",
  id
})

export const setCurrentLink = ({ status, from, to }) => ({
  type: "SET_CURRENT_LINK",
  status,
  from,
  to
})
