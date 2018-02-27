import { combineReducers } from "redux"

import currentDialogue from "./currentDialogue"
import actors from "./actors"
import dialogues from "./dialogues"
import keys from "./keys"
import colors from "./colors"
import meta from "./meta"

export default combineReducers({
  currentDialogue,
  dialogues,
  actors,
  keys,
  colors,
  meta
})
