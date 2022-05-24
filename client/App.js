import React from "react"
import "./App.css"
import Navbar from "./components/navbar"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./pages"
import About from "./pages/about"
import Play from "./pages/team"
import Creation from "./pages/creation"
import Footer from "./components/footer/footer"

function App() {
  return (
    <><Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/creation" component={Creation} />
        <Route path="/play" component={Play} />
      </Switch>
    </Router><Footer /></>
  )
}

export default App
