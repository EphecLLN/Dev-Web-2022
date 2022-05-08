import React, { useState } from "react"
import { ScenarioGraph } from "../components/scenario-graph"
import { ScenarioEditor } from "../components/scenario-editor"

const Creation = () => {
  const [selected, selectNode] = useState(null)

  return <div>
    <ScenarioGraph
      onNodeSelect={(node) => selectNode(node)}
    >
      <ScenarioEditor node={selected}/>
    </ScenarioGraph>
  </div>
}

export default Creation
