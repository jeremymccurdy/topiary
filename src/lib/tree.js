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
  }
}
