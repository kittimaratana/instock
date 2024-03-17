import "./InventoryDetails.scss";
import InventoryDetailsTable from "../../components/InventoryDetailsTable/InventoryDetailsTable";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant-variables";

// For displaying inventory details
export const InventoryDetails = () => {
  const params = useParams();
  const inventoryId = params.inventoryId;
  const [inventoryInfo, setInventoryInfo] = useState({});
  const [hasError, setHasError] = useState(false);

  // Fetch inventory details from the API using a GET request and updates the information when inventoryId changes
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/inventories/${inventoryId}`
        );
        setInventoryInfo(response.data);
        setHasError(false);
      } catch {
        setHasError(true);
      }
    };
    fetchInventory();
  }, [inventoryId]);
  // Displaying error message if there's an error fetching inventory details
  if (hasError) {
    return <p>Unable to access Inventory right now. Please try again later.</p>;
  }

  // Rendering the InventoryDetailsTable component with fetched inventory details
  return (
    <div className="inventoryDetails__center-wrap">
      <InventoryDetailsTable inventoryInfo={inventoryInfo} />
    </div>
  );
};
