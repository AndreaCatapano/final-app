import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  <>
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/plants" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </>;
}

export default App;
