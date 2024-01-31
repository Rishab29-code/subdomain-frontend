import React from "react";
import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Uploaded from "./Pages/Uploaded";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/:comid" element={<Home />} />
        <Route path="/uploaded" element={<Uploaded />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
