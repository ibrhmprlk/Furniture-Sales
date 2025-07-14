import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mobilya from "./pages/Mobilya";
import ShowMobilya from "./pages/ShowMobilya";
import Edit from "./pages/Edit";
import Delete from "./pages/Delete";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/web1/create" element={<Mobilya />} />
      <Route path="/web1/details/:id" element={<ShowMobilya />} />
      <Route path="/web1/edit/:id" element={<Edit />} />
      <Route path="/web1/delete/:id" element={<Delete />} />
    </Routes>
  );
}
