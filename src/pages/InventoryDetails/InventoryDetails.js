// The user must be able to view the details for a specific inventory item
// when an item is clicked from the list view.
// The user must have the ability to navigate to the edit item functionality from this view.
// They should also be able to navigate back to the inventory list.
// Create the UI and functionality for displaying the details of a specific inventory item.

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

  // if (hasError) {
  //   return (
  //     <p>Unable to access warehouses right now. Please try again later.</p>
  //   );
  // }

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

  return (
    <div className="inventoryDetails__center-wrap">
      <InventoryDetailsTable inventoryInfo={inventoryInfo} />
    </div>
  );
};
