export * from "../node/NodeActions"
export * from "../editor/actor/ActorActions"
export * from "../editor/edit/EditActions"
export * from "../editor/key/KeyActions"
export * from "../link/LinkActions"
export * from "../nav/NavActions"

export const setWarning = ({ warningMessage, warning }) => ({
  type: "WARNING_MESSAGE",
  warning,
  warningMessage
})
