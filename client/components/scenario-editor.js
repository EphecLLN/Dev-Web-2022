import React  from "react"
import { useSigma } from "@react-sigma/core"

export const ScenarioEditor = ({ node }) => {
  const sigma = useSigma()

  return <div className="container is-center" style={{
    display: "block",
    border: "2px solid red",
    borderRadius: "5px",
    overflow: "auto",
  }}>
    {node === null ? (<>
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
          {JSON.stringify(node)}
        </p>
      </div>
    )}
  </div>
}
