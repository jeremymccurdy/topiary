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
      body: "And so our adventure begins...",
      pos: [0, -2400],
      actor: 0,
      conditions: "Game.Start == true",
      choices: [0, 1, 2]
    },
    {
      title: "Home",
      tags: [],
      body: "You stay at home and do nothing.",
      pos: [-300, -2000],
      actor: 0,
      conditions: "",
      choices: []
    },
    {
      title: "Venture",
      tags: [],
      body: "You go out and die from a squirrel bite.",
      pos: [0, -2000],
      actor: 0,
      conditions: "",
      choices: []
    },
    {
      title: "Cheat",
      tags: [],
      body: "You are a cheater! But well played.",
      pos: [300, -2000],
      actor: 0,
      conditions: "",
      choices: []
    }
  ],
  choices: [
    {
      body: "I stay at home...",
      dialogue: 1
    },
    {
      body: "I venture forth!",
      dialogue: 2
    },
    {
      body: "I use cheat codes",
      dialogue: 3,
      conditions: "cheater == true"
    }
  ],
  actors: [{ name: "Narrator", playable: false, color: "FFFFFF" }],
  colors: ["FFFFFF", "94E495", "85B7A1", "486B8D", "554A6E", "501D47"],
  keys: [],
  meta: { editorHidden: false }
}

export default createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(logger))
)
