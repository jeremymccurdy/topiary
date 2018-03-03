import { combineReducers } from "redux"

import currentNode from "./currentNode"
import actors from "./actors"
import dialogues from "./dialogues"
import choices from "./choices"
import keys from "./keys"
import colors from "./colors"
import meta from "./meta"

export default combineReducers({
  currentNode,
  dialogues,
  choices,
  actors,
  keys,
  colors,
  meta
})
