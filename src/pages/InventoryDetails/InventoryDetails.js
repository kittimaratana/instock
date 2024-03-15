import "./InventoryDetails.scss";
import InventoryDetailsTable from "../../components/InventoryDetailsTable/InventoryDetailsTable";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant-variables";

export const InventoryDetails = () => {
  const params = useParams();
  const inventoryId = params.inventoryId;
  const [inventoryInfo, setInventoryInfo] = useState({});
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/inventories/${inventoryId}`
        );
        console.log(response.data);
        setInventoryInfo(response.data);
        setHasError(false);
      } catch {
        setHasError(true);
      }
    };
    fetchInventory();
  }, [inventoryId]);

  if (hasError) {
    return <p>Unable to access Inventory right now. Please try again later.</p>;
  }
  
  return (
    <div className="inventoryDetails__center-wrap">
      <InventoryDetailsTable inventoryInfo={inventoryInfo} />
    </div>
  );
};
