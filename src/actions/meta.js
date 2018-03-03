export const toggleEditor = editorHidden => {
  return {
    type: "TOGGLE_EDITOR",
    editorHidden
  }
}

export const setLinkStatus = ({ linkStatus, linkFrom, linkTo }) => {
  return {
    type: "LINK_STATUS",
    linkStatus,
    linkFrom,
    linkTo
  }
}

export const setWarning = ({ warningMessage, warning }) => {
  return {
    type: "WARNING_MESSAGE",
    warning,
    warningMessage
  }
}
