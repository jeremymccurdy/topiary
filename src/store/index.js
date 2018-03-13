import { createStore, applyMiddleware } from "redux"
import { logger } from "redux-logger"
import { composeWithDevTools } from "remote-redux-devtools"
import reducers from "./reducers"

const initialState = {
  FocusedNode: "ujGXGykg",
  FocusedLink: { status: false, from: "", to: "" },
  nodes: {
    ujGXGykg: {
      id: "ujGXGykg",
      type: "dialogue",
      title: "Start",
      tags: ["Intro", "test"],
      body: "And so our adventure begins...",
      pos: [910, 90],
      bounds: [210],
      linkable: true,
      collapsed: false,
      actor: 0,
      conditions: "Game.Start == true"
    },
    pOm0BT2p: {
      id: "pOm0BT2p",
      type: "dialogue",
      title: "Home",
      tags: [],
      body: "You stay at home and do nothing.",
      pos: [600, 500],
      bounds: [210],
      linkable: true,
      collapsed: false,
      actor: 0,
      conditions: ""
    },
    fOiYPfJo: {
      id: "fOiYPfJo",
      type: "dialogue",
      title: "Venture",
      tags: [],
      body: "You go out and die from a squirrel bite.",
      pos: [910, 500],
      bounds: [210],
      linkable: true,
      collapsed: false,
      actor: 0,
      conditions: ""
    },
    lFqf3tkx: {
      id: "lFqf3tkx",
      type: "dialogue",
      title: "Cheat",
      tags: [],
      body: "You are a cheater! But well played.",
      pos: [1210, 500],
      bounds: [210],
      linkable: true,
      collapsed: false,
      actor: 0,
      conditions: ""
    },
    Ywdbg2Ox: {
      id: "Ywdbg2Ox",
      type: "choice",
      body: "I stay at home...",
      tags: ["coward"],
      pos: [600, 360],
      bounds: [210],
      linkable: true,
      collapsed: false,
      conditions: ""
    },
    "3EcmQcOF": {
      id: "3EcmQcOF",
      type: "choice",
      body: "I venture forth and begin my adventure!",
      tags: ["brave"],
      pos: [910, 360],
      bounds: [210],
      linkable: true,
      collapsed: false,
      conditions: ""
    },
    c2fPdCPh: {
      id: "c2fPdCPh",
      type: "choice",
      body: "I use cheat codes",
      tags: ["cheat"],
      pos: [1210, 360],
      bounds: [210],
      linkable: true,
      collapsed: false,
      conditions: "cheater == true"
    }
  },
  links: [
    ["ujGXGykg", "Ywdbg2Ox"],
    ["ujGXGykg", "3EcmQcOF"],
    ["ujGXGykg", "c2fPdCPh"],
    ["Ywdbg2Ox", "pOm0BT2p"],
    ["3EcmQcOF", "fOiYPfJo"],
    ["c2fPdCPh", "lFqf3tkx"]
  ],
  actors: [{ name: "Narrator", playable: false, color: "FFFFFF" }],
  colors: ["FFFFFF", "94E495", "85B7A1", "486B8D", "554A6E", "501D47"],
  keys: [],
  editor: true,
  scale: 1,
  warning: { status: false, warningMessage: "" }
}

const store =
  process.env.NODE_ENV === "development"
    ? createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(logger))
      )
    : createStore(reducers, initialState)

export default store
