import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound/NotFound";
import { Inventory } from "./pages/Inventory/Inventory";
import { Warehouses } from "./pages/Warehouses/Warehouses";
import { WarehouseDetails } from "./pages/WarehouseDetails/WarehouseDetails";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Warehouses />} />
        <Route path="warehouse/:warehouseId" element={<WarehouseDetails/>} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
