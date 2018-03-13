import { createSelector } from "reselect"

const getNodeById = ({ nodes }, { id }) => nodes[id]
const getId = (_, { id }) => id
const getCurrentNode = ({ currentNode }) => currentNode
const getNodes = ({ nodes }) => nodes
const getActors = ({ actors }) => actors
const getLinks = ({ links }) => links

export const makeGetNode = () =>
  createSelector(
    [getNodeById, getActors, getCurrentNode],
    (node, actors, currentNode) => ({
      ...node,
      actor: node.actor !== undefined ? actors[node.actor].name : "",
      current: currentNode === node.id
    })
  )

export const makeGetNodeByCurrent = () =>
  createSelector([getNodes, getCurrentNode], (nodes, currentNode) => ({
    node: nodes[currentNode]
  }))

export const makeConnectedNodes = () =>
  createSelector([getId, getLinks], (id, links) =>
    links.reduce(
      (obj, link) => {
        if (link[0] === id) {
          obj.next = [...obj.next, link[1]]
        }
        if (link[1] === id) {
          obj.prev = [...obj.prev, link[0]]
        }
        return obj
      },
      { prev: [], next: [] }
    )
  )

export const makeGetNodeKeys = () =>
  createSelector([getNodes], nodes => Object.keys(nodes))
