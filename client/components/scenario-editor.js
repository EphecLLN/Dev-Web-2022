import React, { useState } from "react"
import { useSigma } from "@react-sigma/core"

function GenericEditor() {
  const sigma = useSigma()
  const graph = sigma.getGraph()

  return <>
    <div className="row is-left">
      <p className="col" style={{marginLeft: "2em", marginTop: "2em"}}>
        {graph.nodes().length} Steps
      </p>
    </div>
    <div className="row is-left">
      <p className="col" style={{marginLeft: "2em"}}>
        Double-click on a step to edit it
      </p>
    </div>
  </>
}

function ChoiceCreator({ className, source }) {
  const sigma = useSigma()
  const graph = sigma.getGraph()

  const [text, setText] = useState("")
  const [next, setNext] = useState(null)

  function submit(evt) {
    if (!next) return
    evt.preventDefault()

    if (!graph.hasNode(next)) {
      graph.addNode(next, {
        // Graphology attributes
        size: 5,
        color: "#727EE0",
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        // Custom attributes
        step: {
          text: "",
          choices: [],
        },
      })
    }
    graph.updateNodeAttribute(source, "size", (size) => size + 3)
    graph.updateNodeAttribute(source, "step", (step) => {
      step.choices.push({ next, text })
      return step
    })
    graph.addEdge(source, next, {
      size: 5,
      label: text,
      type: "arrow",
    })
  }

  return <form className={`container ${className}`} onSubmit={submit}>
    <input className="row button primary"
      type="button"
      value={graph.hasNode(next) ? "Add choice" : "Create next step"}
      onClick={submit}
    />
    <textarea className="row"
      rows="5"
      onInput={(evt) => setText(evt.target.value)}
      onSubmit={submit}
      style={{
        maxWidth: "100%"
      }}
    />
    <input
      className="row"
      type="text"
      onInput={(evt) => setNext(evt.target.value)}
      style={{
        maxWidth: "100%"
      }}
    />
  </form>
}

function NodeEditor({ node }) {
  const sigma = useSigma()
  const graph = sigma.getGraph()
  const step = graph.getNodeAttribute(node, "step")

  if (step === undefined) {
    if (graph.getNodeAttribute(node, "end")) {
      return <div className="row is-left">
        <h1 className="col" style={{margin: "2em"}}>The end</h1>
      </div>
    }
    return null
  }

  return <>
    <h1 className="row" style={{marginLeft: "2em"}}>{node}</h1>
    <p className="row" style={{marginLeft: "2em"}}>{step.text}</p>
    <h3 className="row" style={{marginLeft: "2em"}}>Choices:</h3>
    <div className="row is-center">
      <ChoiceCreator className="col" source={node}/>
      <div className="container col" style={{marginLeft: "2em"}}>
        {step.choices.map((choice, i) => {
          return <div key={i} className="row">
            <a className="col"
              onClick={() => {
                // TODO
                console.log(`TODO: select node ${choice.next}`)
              }}
            >
              {choice.text}
            </a>
          </div>
        })}
      </div>
    </div>
  </>
}

export const ScenarioEditor = ({ node }) => {
  return <div className="container is-center" style={{
    display: "block",
    border: "2px solid red",
    borderRadius: "5px",
    overflow: "auto",
  }}>
    {node === null ? <GenericEditor /> : <NodeEditor node={node}/>}
  </div>
}
