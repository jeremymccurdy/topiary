import { saveAs } from "file-saver"

export const throttle = (callback, limit) => {
  let wait = false
  return () => {
    if (!wait) {
      callback.call()
      wait = true
      setTimeout(() => {
        wait = false
      }, limit)
    }
  }
}

export const loadState = id => {
  try {
    const serial = localStorage.getItem(id)
    if (!serial) return null
    return JSON.parse(serial)
  } catch (err) {
    return null
  }
}

export const saveState = state => {
  try {
    const serial = JSON.stringify(state)
    localStorage.setItem(state.id, serial)
  } catch (err) {
    return null
  }
}

export const saveFile = (scene, id) => {
  try {
    const blob = new Blob([localStorage.getItem(id)], {
      type: "text/plain;charset=utf-8"
    })
    saveAs(blob, `${scene.trim() || "untitled"}.topi.json`)
  } catch (err) {
    return null
  }
}

export const loadFile = (e, cb) => {
  try {
    const r = new FileReader()
    r.onload = e => {
      const obj = JSON.parse(e.target.result)
      localStorage.setItem(obj.id, e.target.result)
      cb()
    }
    r.readAsText(e.target.files[0])
  } catch (err) {
    return null
  }
}
