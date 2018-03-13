import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Link from "./Link"
import { setCurrentLink, deleteLink, setCurrentNode } from "../store/actions"
import { layers } from "../lib/view"

const styles = {
  linkCreator: {
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: layers.CURRENTARROW
  }
}

class LinkContainer extends Component {
  static propTypes = {
    links: PropTypes.array.isRequired,
    currentLink: PropTypes.object.isRequired,
    currentNode: PropTypes.string.isRequired,
    mouseEvent: PropTypes.object.isRequired,
    deleteLink: PropTypes.func.isRequired,
    setCurrentLink: PropTypes.func.isRequired,
    setCurrentNode: PropTypes.func.isRequired
  }

  state = {
    mounted: false
  }
  componentDidMount() {
    this.setState({ mounted: true })
  }

  isCurrentNode = from => {
    return this.props.currentNode === from
  }

  render() {
    const {
      links,
      currentLink,
      mouseEvent,
      setCurrentLink,
      setCurrentNode,
      deleteLink
    } = this.props
    const { mounted } = this.state
    const linkList = links.map(link => (
      <Link
        key={`${link[0]}-${link[1]}`}
        from={link[0]}
        to={link[1]}
        currentNode={this.isCurrentNode(link[0])}
        setCurrentLink={setCurrentLink}
        setCurrentNode={setCurrentNode}
        deleteLink={deleteLink}
      />
    ))

    return (
      <Fragment>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <marker
              id="arrowhead"
              viewBox="0 0 10 10"
              refX="10"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>
          {mounted && linkList}
        </svg>
        {currentLink.status && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            style={styles.linkCreator}
          >
            <defs>
              <marker
                id="arrowhead"
                viewBox="0 0 10 10"
                refX="10"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" />
              </marker>
            </defs>
            <Link
              from={currentLink.from}
              linking={currentLink.status}
              mouse={mouseEvent}
              currentNode={true}
              setCurrentLink={setCurrentLink}
              setCurrentNode={setCurrentNode}
              deleteLink={deleteLink}
              style={styles.linkCreator}
            />
          </svg>
        )}
      </Fragment>
    )
  }
}

const mapState = ({ links, currentLink, currentNode }) => ({
  links,
  currentLink,
  currentNode
})

export default connect(mapState, {
  setCurrentLink,
  setCurrentNode,
  deleteLink
})(LinkContainer)
