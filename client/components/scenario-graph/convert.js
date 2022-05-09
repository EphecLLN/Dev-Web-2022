import { Graph } from "graphology"

function getSize({ choices }) {
  return 10 + (3 * (choices.length ?? 0))
}

export const scenario2graph = ({ steps }) => {
  const RED = "#FA4F40"
  const BLUE = "#727EE0"
  //const GREEN = "#5DB346"

  const graph = new Graph({
    multi: true,
    type: "directed",
    allowSelfLoops: true
  })

  if (!steps) return

  // Create nodes
  Object.entries(steps).forEach(([id, step]) => {
    console.log(`Adding node ${id} to graph with step:`)
    console.log(step)
    graph.addNode(id, {
      // Graphology attributes
      size: getSize(step),
      color: BLUE,
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      // Custom attributes
      step,
    })
  })

  // Adding the "end" node
  graph.addNode("0", {
    // Graphology attributes
    size: 10,
    color: RED,
    x: Math.random() - 0.5,
    y: Math.random() - 0.5,
    // Custom attributes
    end: true,
  })

  // Create links
  Object.entries(steps).forEach(([id, step]) => {
    console.log(`Adding edges from ${id}:`)
    step.choices.forEach((choice) => {
      console.log(`    linking to ${choice.next} with choice:`)
      console.log(choice)
      graph.addEdge(id, `${choice.next}`, {
        size: 5,
        //color: "#000000",
        label: choice.text,
        type: "arrow",
      })
    })
    console.log("done")
  })

  return graph
}

