import { createStore, applyMiddleware } from "redux"
import { logger } from "redux-logger"
import { composeWithDevTools } from "remote-redux-devtools"
import reducers from "../reducers"

const initialState = {
  currentDialogue: 0,
  dialogues: [
    {
      title: "Start",
      tags: ["Intro", "test"],
      body: "And so our adventure begins",
      pos: [0, -2400],
      actor: 0,
      conditions: "Game.Start == true"
    }
  ],
  actors: [{ name: "Narrator", playable: false, color: "FFFFFF" }],
  colors: ["FFFFFF", "94E495", "85B7A1", "486B8D", "554A6E", "501D47"],
  keys: []
}

export default createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(logger))
)
