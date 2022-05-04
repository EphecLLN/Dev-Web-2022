import React, {useState} from "react"
import {useEffect} from "react"
import {Graph} from "graphology"
import {SigmaContainer,
  useLoadGraph,
  useRegisterEvents,
  useSigma,} from "@react-sigma/core"
import {useLayoutForce, useWorkerLayoutForce} from "@react-sigma/layout-force"
import "@react-sigma/core/lib/react-sigma.min.css"

export const LoadGraph = () => {
  const sigma = useSigma()
  const load = useLoadGraph()
  const register = useRegisterEvents()
  const {positions} = useLayoutForce()
  const {start, kill} = useWorkerLayoutForce({
    isNodeFixed: "highlighted",
    settings: {
      gravity: 0.0003,
      attraction: 0.005,
      repulsion: 0.02,
      inertia: 0.4
    }
  })
  const [selected, selectNode] = useState(null)

  useEffect(() => {
    const RED = "#FA4F40"
    const BLUE = "#727EE0"
    const GREEN = "#5DB346"

    // Create a sample graph
    const graph = new Graph()
    graph.addNode(
      "John",
      {
        size: 15,
        label: "John",
        color: RED,
        x: 1,
        y: 1
      }
    )
    graph.addNode(
      "Mary",
      {
        size: 15,
        label: "Mary",
        color: RED,
        x: 1,
        y: 1
      }
    )
    graph.addNode(
      "Suzan",
      {
        size: 15,
        label: "Suzan",
        color: RED,
        x: 1,
        y: 1
      }
    )
    graph.addNode(
      "Nantes",
      {
        size: 15,
        label: "Nantes",
        color: BLUE,
        x: 1,
        y: 1
      }
    )
    graph.addNode(
      "New-York",
      {
        size: 15,
        label: "New-York",
        color: BLUE,
        x: 1,
        y: 1
      }
    )
    graph.addNode(
      "Sushis",
      {
        size: 7,
        label: "Sushis",
        color: GREEN,
        x: 1.7,
        y: 0.5
      }
    )
    graph.addNode(
      "Falafels",
      {
        size: 7,
        label: "Falafels",
        color: GREEN,
        x: -0.1,
        y: 3.2
      }
    )
    graph.addNode(
      "Kouign Amann",
      {
        size: 7,
        label: "Kouign Amann",
        color: GREEN,
        x: 1,
        y: 1.5
      }
    )

    graph.addEdge("John", "Mary", {label: "works with", size: 5})
    graph.addEdge("Mary", "Suzan", {label: "works with", size: 5})
    graph.addEdge("Mary", "Nantes", {label: "lives in", size: 5})
    graph.addEdge("John", "New-York", {label: "lives in", size: 5})
    graph.addEdge("Suzan", "New-York", {label: "lives in", size: 5})
    graph.addEdge("John", "Falafels", {label: "eats", size: 5})
    graph.addEdge("Mary", "Sushis", {label: "eats", size: 5})
    graph.addEdge("Suzan", "Kouign Amann", {label: "eats", size: 5})

    load(graph)
    start()

    let dragged = null
    let selected = null

    register({
      doubleClickNode: evt => {
        if  (selected !== null) {
          sigma.getGraph().removeNodeAttribute(selected, "highlighted")
        }
        selected = evt.node
        selectNode(selected)
        sigma.getGraph().setNodeAttribute(selected, "highlighted", true)
        // Prevent zoom
        evt.preventSigmaDefault()
      },
      clickStage: evt => {
        if (selected !== null) {
          sigma.getGraph().removeNodeAttribute(selected, "highlighted")
        }
        selectNode(null)
        selected = null
        // Prevent zoom
        evt.preventSigmaDefault()
      },
      downNode: evt => {
        dragged = evt.node
        sigma.getGraph().setNodeAttribute(dragged, "highlighted", true)
      },
      mouseup: () => {
        if (dragged !== null) {
          sigma.getGraph().removeNodeAttribute(dragged, "highlighted")
        }
        dragged = null
      },
      mousemove: evt => {
        if (dragged === null) {
          return
        }
        const pos = sigma.viewportToGraph(evt)

        sigma.getGraph().setNodeAttribute(dragged, "x", pos.x)
        sigma.getGraph().setNodeAttribute(dragged, "y", pos.y)

        // Prevent sigma to move camera:
        evt.preventSigmaDefault()
        evt.original.preventDefault()
        evt.original.stopPropagation()
      },
      mousedown: evt => {
        if (!sigma.getCustomBBox()) {
          sigma.setCustomBBox(sigma.getBBox())
        }
      }
    })

    return () => {
      kill()
    }
  }, [
    sigma,
    register,
    positions,
    start,
    kill,
    selectNode
  ])

  return (
    <div className="container is-center" style={{
      display: "block",
      border: "2px solid red",
      borderRadius: "5px",
      overflow: "auto",
    }}>
      {selected === null ? (<>
        <div className="row is-left">
          <p className="col" style={{margin: "2em"}}>
            {sigma.getGraph().nodes().length} Steps
          </p>
        </div>
        <div className="row is-left">
          <p className="col" style={{margin: "2em"}}>
            Double-click on a step to edit it
          </p>
        </div>
      </>) : (
        <div className="row is-left">
          <p className="col" style={{margin: "2em"}}>
            {JSON.stringify(selected)}
          </p>
        </div>
      )}
    </div>
  )
}

const Creation = () => {
  return (
    <div className="is-center">
      <SigmaContainer style={{
        display: "grid",
        gridAutoRows: "90vh",
        gridTemplateColumns: "90vh auto",
        gap: "3em",
        width: "90vw",
        height: "90vh",
      }}>
        <LoadGraph />
      </SigmaContainer>
    </div>
  )
}

export default Creation
