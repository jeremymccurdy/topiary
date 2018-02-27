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
      pos: [2310, 90],
      actor: 0,
      conditions: "Game.Start == true",
      next: ["choices[0]", "choices[1]", "choices[2]"]
    },
    {
      title: "Home",
      tags: [],
      body: "You stay at home and do nothing.",
      pos: [2000, 500],
      actor: 0,
      conditions: "",
      next: []
    },
    {
      title: "Venture",
      tags: [],
      body: "You go out and die from a squirrel bite.",
      pos: [2310, 500],
      actor: 0,
      conditions: "",
      next: []
    },
    {
      title: "Cheat",
      tags: [],
      body: "You are a cheater! But well played.",
      pos: [2610, 500],
      actor: 0,
      conditions: "",
      next: []
    }
  ],
  choices: [
    {
      body: "I stay at home...",
      tags: [],
      next: ["dialogues[1]"],
      pos: [2000, 360]
    },
    {
      body: "I venture forth and begin my adventure!",
      tags: [],
      next: ["dialogues[2]"],
      pos: [2310, 360]
    },
    {
      body: "I use cheat codes",
      tags: [],
      next: ["dialogues[3]"],
      pos: [2610, 360],
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
