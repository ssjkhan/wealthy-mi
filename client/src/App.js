import React from "react";
import Auth from "./pages/Auth/Auth";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  return (
    <div className="App">
    <p>App</p>
      <Routes>
        <Route path="/test/auth" element={<Auth />} />

      </Routes>
    </div>
  );
}

export default App;
