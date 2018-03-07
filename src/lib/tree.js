import store from "../store"
import * as actions from "../actions"

export default {
  deleteNode: ({ t, id }) => {
    store.getState()[t][id].prev.forEach(node => {
      const n = store.getState()[node.t][node.id].next
      store.dispatch(
        actions.updateNode({
          id: node.id,
          t: node.t,
          payload: { next: n.filter(e => e.id !== id) }
        })
      )
    })
    store.getState()[t][id].next.forEach(node => {
      const p = store.getState()[node.t][node.id].prev
      store.dispatch(
        actions.updateNode({
          id: node.id,
          t: node.t,
          payload: { prev: p.filter(e => e.id !== id) }
        })
      )
    })
    store.dispatch(actions.deleteNode({ id, t }))
  },
  setLink: ({ linkStatus, linkTo, linkFrom }) => {
    if (linkStatus) {
      return store.dispatch(actions.setLinkStatus({ linkStatus, linkFrom }))
    }
    if (linkTo === null) {
      return store.dispatch(
        actions.setLinkStatus({ linkStatus: false, linkFrom: null })
      )
    }
    const from = store.getState().meta.linkFrom
    const currentFrom = store.getState()[from.t][from.id]
    const currentTo = store.getState()[linkTo.t][linkTo.id]

    if (currentFrom.next.length > 0) {
      let warning
      if (currentFrom.next[0].t !== linkTo.t) {
        warning =
          "You may only link to dialogue nodes or choice nodes, not both."
      }
      if (currentFrom.next[0].t === "dialogues") {
        warning = "You may only link to one dialogue."
      }
      if (
        currentTo.prev.length > 0 &&
        currentTo.prev[0].t === "choices" &&
        linkTo.t === "choices"
      ) {
        warning = "You may not link choices together."
      }
      if (warning) {
        store.dispatch(
          actions.setLinkStatus({
            linkStatus: false,
            linkTo: {},
            linkFrom: {}
          })
        )
        return store.dispatch(
          actions.setWarning({
            warningMessage: "You may only link to one dialogue.",
            warning: true
          })
        )
      }
    }
    store.dispatch(
      actions.updateNode({
        t: from.t,
        id: from.id,
        payload: {
          next: [...currentFrom.next, { t: linkTo.t, id: linkTo.id }]
        }
      })
    )
    store.dispatch(
      actions.updateNode({
        t: linkTo.t,
        id: linkTo.id,
        payload: { prev: [...currentTo.prev, { t: from.t, id: from.id }] }
      })
    )
    store.dispatch(
      actions.setLinkStatus({ linkStatus: false, linkTo: {}, linkFrom: {} })
    )
  },
  deleteLink: ({ linkFrom, linkTo }) => {
    const next = store.getState()[linkFrom.t][linkFrom.id].next
    const prev = store.getState()[linkTo.t][linkTo.id].prev
    store.dispatch(
      actions.updateNode({
        t: linkFrom.t,
        id: linkFrom.id,
        payload: {
          next: next.reduce((acc, node) => {
            if (node.id !== linkTo.id) {
              acc.push(node)
            }
            return acc
          }, [])
        }
      })
    )
    store.dispatch(
      actions.updateNode({
        t: linkTo.t,
        id: linkTo.id,
        payload: {
          prev: prev.reduce((acc, node) => {
            if (node.id !== linkFrom.id) {
              acc.push(node)
            }
            return acc
          }, [])
        }
      })
    )
  },
  moveLink: ({ linkFrom, linkTo }) => {
    // hackey, better to break out and export each function seperately
    this.a.deleteLink({ linkFrom, linkTo })
    store.dispatch(actions.selectNode(linkFrom))
    this.a.setLink({ linkStatus: true, linkFrom })
  }
}
