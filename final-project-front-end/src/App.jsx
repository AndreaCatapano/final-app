import { BrowserRouter, Route, Routes } from "react-router-dom";

import LayoutDefault from "./Layout/LayoutDefault";
import Home from "./Pages/Home.jsx";
import Plants from "./Pages/PlantsPage/Plants.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutDefault />}>
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<Plants />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
