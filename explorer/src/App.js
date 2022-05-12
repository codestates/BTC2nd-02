import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main.js";
import React, { useState } from "react";
import Nav from "./components/Nav";
import Blockpage from "./pages/blockpage.js";
import Txpage from "./pages/txpage.js";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route default path="/" element={<Main />} />
          <Route default path="/block" element={<Blockpage />} />
          <Route default path="/tx" element={<Txpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
