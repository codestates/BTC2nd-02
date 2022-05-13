import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main.js";
import React, { useState } from "react";
import Nav from "./components/Nav";
import Accountpage from "./pages/Accountpage";
import Txpage from "./pages/txpage";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/account" element={<Accountpage />} />
          <Route default path="/tx" element={<Txpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
