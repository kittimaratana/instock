import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound/NotFound";
import { Inventory } from "./pages/Inventory/Inventory";
import { Warehouses } from "./pages/Warehouses/Warehouses";
import { WarehouseDetails } from "./pages/WarehouseDetails/WarehouseDetails";
import { InventoryDetails } from "./pages/InventoryDetails/InventoryDetails";
import { AddWarehouse } from "./pages/AddWarehouse/AddWarehouse";
import { AddInventory } from "./pages/AddInventory/AddInventory";
import { EditInventory } from "./pages/EditInventory/EditInventory";
import { EditWarehousePage} from  "./pages/EditWarehouse/EditWarehouse";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
      <Routes>
        <Route path="/" element={<Warehouses />} />
        <Route path="warehouse/add-warehouse" element={<AddWarehouse />} />
        <Route path="warehouse/:warehouseId" element={<WarehouseDetails/>} />
        <Route path="warehouse/:warehouseId/edit" element={<EditWarehousePage/>} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/add-inventory" element={<AddInventory />} />
        <Route path="/inventory/:inventoryId" element={<InventoryDetails />} />
        <Route path="/inventory/:inventoryId/edit" element={<EditInventory/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
