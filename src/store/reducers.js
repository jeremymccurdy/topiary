import { combineReducers } from "redux"

import { nodes, currentNode } from "../node/NodeReducers"
import { actors, colors } from "../editor/actor/ActorReducers"
import { editor } from "../editor/edit/EditReducers"
import { links, currentLink } from "../link/LinkReducers"
import keys from "../editor/key/KeyReducers"

const warning = (state = null, action) => {
  switch (action.type) {
    case "WARNING_MESSAGE":
      return {
        ...state,
        ...action
      }
    default:
      return state
  }
}

const scale = (state = 1, { type, scale }) => {
  if (type === "UPDATE_SCALE") {
    return scale
  }
  return state
}

export default combineReducers({
  nodes,
  links,
  currentNode,
  currentLink,
  actors,
  keys,
  colors,
  scale,
  editor,
  warning
})
