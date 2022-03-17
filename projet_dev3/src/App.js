import React from "react";
import "./App.css";
import Navbar from "./components/navbar/index";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Play from "./pages/team";
import Creation from "./pages/creation";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes path="/" exact component={Home} />
      <Routes path="/about" component={About} />
      <Routes path="/creation" component={Creation} />
      <Routes path="/play" component={Play} />
    </Router>
  );
}

export default App;
