import { createStore, applyMiddleware } from "redux"
import { logger } from "redux-logger"
import { composeWithDevTools } from "remote-redux-devtools"
import reducers from "../reducers"

const initialState = {
  currentEdit: { t: "dialogues", id: "ujGXGykg" },
  dialogues: {
    ujGXGykg: {
      title: "Start",
      tags: ["Intro", "test"],
      body: "And so our adventure begins...",
      pos: [910, 90],
      bounds: [210],
      collapsed: false,
      actor: 0,
      conditions: "Game.Start == true",
      prev: [],
      next: [
        {
          t: "choices",
          id: "Ywdbg2Ox"
        },
        {
          t: "choices",
          id: "3EcmQcOF"
        },
        {
          t: "choices",
          id: "c2fPdCPh"
        }
      ]
    },
    pOm0BT2p: {
      title: "Home",
      tags: [],
      body: "You stay at home and do nothing.",
      pos: [600, 500],
      bounds: [210],
      collapsed: false,
      actor: 0,
      conditions: "",
      prev: [
        {
          t: "choices",
          id: "Ywdbg2Ox"
        }
      ],
      next: []
    },
    fOiYPfJo: {
      title: "Venture",
      tags: [],
      body: "You go out and die from a squirrel bite.",
      pos: [910, 500],
      bounds: [210],
      collapsed: false,
      actor: 0,
      conditions: "",
      prev: [{ t: "choices", id: "3EcmQcOF" }],
      next: []
    },
    lFqf3tkx: {
      title: "Cheat",
      tags: [],
      body: "You are a cheater! But well played.",
      pos: [1210, 500],
      bounds: [210],
      collapsed: false,
      actor: 0,
      conditions: "",
      prev: [{ t: "choices", id: "c2fPdCPh" }],
      next: []
    }
  },
  choices: {
    Ywdbg2Ox: {
      body: "I stay at home...",
      tags: ["coward"],
      prev: [{ t: "dialogues", id: "ujGXGykg" }],
      next: [{ t: "dialogues", id: "pOm0BT2p" }],
      pos: [600, 360],
      bounds: [210],
      collapsed: false,
      conditions: ""
    },
    "3EcmQcOF": {
      body: "I venture forth and begin my adventure!",
      tags: ["brave"],
      prev: [{ t: "dialogues", id: "ujGXGykg" }],
      next: [{ t: "dialogues", id: "fOiYPfJo" }],
      pos: [910, 360],
      bounds: [210],
      collapsed: false,
      conditions: ""
    },
    c2fPdCPh: {
      body: "I use cheat codes",
      tags: ["cheat"],
      prev: [{ t: "dialogues", id: "ujGXGykg" }],
      next: [{ t: "dialogues", id: "lFqf3tkx" }],
      pos: [1210, 360],
      bounds: [210],
      collapsed: false,
      conditions: "cheater == true"
    }
  },
  actors: [{ name: "Narrator", playable: false, color: "FFFFFF" }],
  colors: ["FFFFFF", "94E495", "85B7A1", "486B8D", "554A6E", "501D47"],
  keys: [],
  meta: { editorHidden: false, warning: false, warningMessage: "" }
}

export default createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(logger))
)
