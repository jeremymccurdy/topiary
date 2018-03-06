import React, { Component } from "react"

const styles = {
  wrapper: {
    position: "relative",
    display: "inline-block",
    zIndex: "98"
  },
  container: {
    backgroundColor: `rgba(0,0,0,0.6)`,
    position: "fixed",
    boxSizing: "border-box",
    borderRadius: "4px",
    zIndex: "99",
    marginBottom: "10px",
    padding: "5px",
    color: "#FFFFFF",
    textAlign: "center",
    pointerEvents: "none"
  },
  arrow: {
    position: "absolute",
    bottom: "-5px",
    widht: "5px",
    height: "5px",
    left: "50%",
    marginLeft: "-5px",
    borderLeft: "solid transparent 5px",
    borderRight: "solid transparent 5px",
    borderTop: "solid transparent 5px"
  },
  spacer: {
    position: "absolute",
    width: "100%",
    height: "20px",
    bottom: "-20px"
  },
  tip: {
    display: "inline-block",
    fontSize: "0.8em"
  }
}

export default class Tooltip extends Component {
  state = {
    position: "",
    tip: "",
    visible: false,
    x: 0,
    y: 0
  }

  componentDidMount() {
    const elems = document.querySelectorAll("[data-tip]")
    elems.forEach(elem => {
      elem.addEventListener("mouseenter", this.Listener(elem))
      elem.addEventListener("mouseleave", this.Listener(elem))
    })
  }

  componentWillUnmount() {
    const elems = document.querySelectorAll("[data-tip]")
    elems.forEach(elem => {
      elem.removeEventListener("mouseenter", this.Listener(elem))
      elem.removeEventListener("mouseleave", this.Listener(elem))
    })
  }
  Listener = elem => {
    const handleVisibility = e => {
      const bounds = elem.getBoundingClientRect()
      this.setState({
        visible: e.type === "mouseenter",
        tip: elem.dataset.tip,
        x: bounds.left + bounds.width / 2,
        y: bounds.top
      })
    }
    return handleVisibility
  }

  render() {
    const { tip, visible, x, y } = this.state
    const fade = {
      transform: "translateY(-120%) translateX(-50%)",
      transition: visible ? "opacity 600ms ease 200ms" : "none",
      opacity: visible ? 100 : 0,
      top: y,
      left: x
    }

    return (
      <div
        style={{
          ...styles.container,
          ...fade
        }}
      >
        <div style={styles.tip}>{tip}</div>
        <div style={styles.arrow} />
        <div style={styles.spacer} />
      </div>
    )
  }
}
