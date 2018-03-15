import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

const styles = {
  container: {
    backgroundColor: `rgba(0,0,0,0.6)`,
    position: "fixed",
    boxSizing: "border-box",
    borderRadius: "4px",
    zIndex: "99",
    margin: "0px",
    padding: "5px",
    color: "#FFFFFF",
    pointerEvents: "none"
  },
  tip: {
    display: "block",
    fontSize: "0.8em",
    whiteSpace: "pre-wrap"
  }
}

const positions = {
  top: bounds => {
    return {
      x: bounds.left + bounds.width / 2,
      y: bounds.top,
      transform: "translate(-50%, -120%)"
    }
  },
  bottom: bounds => {
    return {
      x: bounds.left + bounds.width / 2,
      y: bounds.bottom,
      transform: "translate(-50%, 5px)"
    }
  },
  left: bounds => {
    return {
      x: bounds.left,
      y: bounds.top + bounds.height / 2,
      transform: "translate(-120%, -50%)"
    }
  },
  right: bounds => {
    return {
      x: bounds.right,
      y: bounds.top + bounds.height / 2,
      transform: "translate(20%, -50%)"
    }
  }
}

class Tooltip extends Component {
  static propTypes = {
    nodes: PropTypes.object
  }

  static defaultProps = {
    nodes: {}
  }
  state = {
    position: "",
    tip: "",
    visible: false,
    x: 0,
    y: 0
  }

  componentDidMount() {
    this.addListeners()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  removeListeners = () => {
    const elems = document.querySelectorAll("[data-tip]")
    elems.forEach(elem => {
      elem.removeEventListener("mouseenter", this.listener(elem))
      elem.removeEventListener("mouseout", this.listener(elem))
    })
  }

  addListeners = () => {
    const elems = document.querySelectorAll("[data-tip]")
    const obsConfig = { childList: true, subtree: true }
    elems.forEach(elem => {
      elem.addEventListener("mouseenter", this.listener(elem))
      elem.addEventListener("mouseout", this.listener(elem))
      const observer = new MutationObserver(this.hide)
      observer.observe(elem.parentElement, obsConfig)
    })
  }

  componentDidUpdate(prevProps) {
    if (
      Object.keys(this.props.nodes).length !==
      Object.keys(prevProps.nodes).length
    ) {
      this.removeListeners()
      this.addListeners()
    }
  }

  listener = elem => {
    const handleVisibility = e => {
      const bounds = elem.getBoundingClientRect()
      const { x, y, transform } = elem.dataset.tippos
        ? positions[elem.dataset.tippos](bounds)
        : positions["top"](bounds)
      this.setState({
        visible: e.type === "mouseenter",
        tip: elem.dataset.tip,
        x,
        y,
        transform
      })
    }
    return handleVisibility
  }

  hide = () => {
    this.setState({ visible: false })
  }

  render() {
    const { tip, visible, x, y, transform } = this.state
    const fade = {
      transition: visible ? "opacity 600ms ease 200ms" : "none",
      opacity: visible ? 100 : 0,
      top: y,
      left: x,
      transform
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
      </div>
    )
  }
}

const mapState = ({ nodes }) => ({ nodes })
export default connect(mapState)(Tooltip)
