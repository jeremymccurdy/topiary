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
      pos: [2310, 90],
      actor: 0,
      conditions: "Game.Start == true",
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
      pos: [2000, 500],
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
      pos: [2310, 500],
      actor: 0,
      conditions: "",
      prev: [{ t: "choices", id: "3EcmQcOF" }],
      next: []
    },
    lFqf3tkx: {
      title: "Cheat",
      tags: [],
      body: "You are a cheater! But well played.",
      pos: [2610, 500],
      actor: 0,
      conditions: "",
      prev: [{ t: "choices", id: "c2fPdCPh" }],
      next: []
    }
  },
  choices: {
    Ywdbg2Ox: {
      body: "I stay at home...",
      tags: [],
      prev: [{ t: "dialogues", id: "ujGXGykg" }],
      next: [{ t: "dialogues", id: "pOm0BT2p" }],
      pos: [2000, 360]
    },
    "3EcmQcOF": {
      body: "I venture forth and begin my adventure!",
      tags: [],
      prev: [{ t: "dialogues", id: "ujGXGykg" }],
      next: [{ t: "dialogues", id: "fOiYPfJo" }],
      pos: [2310, 360]
    },
    c2fPdCPh: {
      body: "I use cheat codes",
      tags: [],
      prev: [{ t: "dialogues", id: "ujGXGykg" }],
      next: [{ t: "dialogues", id: "lFqf3tkx" }],
      pos: [2610, 360],
      conditions: "cheater == true"
    }
  },
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
