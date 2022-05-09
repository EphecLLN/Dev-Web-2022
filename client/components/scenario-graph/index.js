import React, {useState} from "react"
import {useEffect} from "react"
import {SigmaContainer,
  useLoadGraph,
  useRegisterEvents,
  useSigma,} from "@react-sigma/core"
import {useWorkerLayoutForce} from "@react-sigma/layout-force"
import "@react-sigma/core/lib/react-sigma.min.css"
import { scenario2graph } from "./convert"

export const LoadGraph = ({ onNodeSelect }) => {

  // Get sigma hooks
  const sigma = useSigma()
  const load = useLoadGraph()
  const register = useRegisterEvents()
  const {start, stop} = useWorkerLayoutForce({
    // Forbid the layout to move highlighted nodes
    isNodeFixed: "highlighted",
    settings: {
      gravity: 0.0003,
      attraction: 0.005,
      repulsion: 0.02,
      inertia: 0.4
    }
  })

  // Register our states
  const [scenarioId, _setScenarioId] = useState(1)
  const [graph, setGraph] = useState(null)

  // Fetch scenario from the API and (re)build the graph
  useEffect(() => {
    fetch(`/api_v0/scenario/${scenarioId}`)
      .catch(console.log)
      .then((response) => response.json())
      .then(({ scenario }) => {
        setGraph(scenario2graph(JSON.parse(scenario)))
        console.log(`initializing graph from scenario ${scenarioId} with:`)
        console.log(scenario)
        console.log(typeof scenario)
      })
  }, [ scenarioId ])

  // Load and animate the graph on creation, and register events
  useEffect(() => {
    // clear previous graph and load new one
    load(graph, true)
    // start the force layout worker
    start()
    // stop the worker on cleanup
    return stop
  }, [ graph ])

  // Register events when sigma (re)loads
  useEffect(() => {
    // These don't need to be a state, they're not influencing React's
    // rendering (only the graph's)
    let dragged = null
    let selected = null

    register({
      doubleClickNode: evt => {
        // Prevent zoom
        evt.preventSigmaDefault()
        if  (selected !== null) {
          // un-highlight previously selected node
          sigma.getGraph().removeNodeAttribute(selected, "highlighted")
        }
        selected = evt.node
        // highlight newly selected node
        sigma.getGraph().setNodeAttribute(selected, "highlighted", true)
        // dispatch event
        onNodeSelect(selected)
      },
      clickStage: evt => {
        if (selected !== null) {
          sigma.getGraph().removeNodeAttribute(selected, "highlighted")
        }
        onNodeSelect(null)
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
      mousedown: _evt => {
        if (!sigma.getCustomBBox()) {
          sigma.setCustomBBox(sigma.getBBox())
        }
      }
    })
    
  }, [ sigma ])

  return null
}

export const ScenarioGraph = ({ children, onNodeSelect }) => {
  return <SigmaContainer
    initialSettings={{
      renderEdgeLabels: true,
      labelColor: "#000000",
    }}
    style={{
      display: "grid",
      gridAutoRows: "90vh",
      gridTemplateColumns: "90vh auto",
      width: "100vw",
      height: "90vh",
    }}
  >
    <LoadGraph onNodeSelect={onNodeSelect}/>
    {children}
  </SigmaContainer>
}
