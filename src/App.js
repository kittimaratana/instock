import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound/NotFound";
import { Inventory } from "./pages/Inventory/Inventory";
import { Warehouses } from "./pages/Warehouses/Warehouses";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Warehouses />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}


export default App;
