import { combineReducers } from "redux"

import currentEdit from "./currentEdit"
import actors from "./actors"
import dialogues from "./dialogues"
import choices from "./choices"
import keys from "./keys"
import colors from "./colors"
import meta from "./meta"

export default combineReducers({
  currentEdit,
  dialogues,
  choices,
  actors,
  keys,
  colors,
  meta
})
