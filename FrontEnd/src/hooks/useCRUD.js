import { useState, useEffect } from "react";
import api from "./api";

// Custom hook for CRUD operations
function useCRUD(actionType, productData, url) {
  // State to track loading, errors, and responses
  const [loadingCRUD, setLoadingCRUD] = useState(true);
  const [errorCRUD, setErrorCRUD] = useState(null);
  const [response, setResponse] = useState(null);


  useEffect(() => {
    // Check for invalid input conditions and exit if any are met
    if (!actionType || !url || (actionType !== "get" && !productData)) return;

    // Async function to handle CRUD operations
    const fetchData = async () => {
      setLoadingCRUD(true); // Set loading state to true before the request
      try {
        let res;
        // Handle different CRUD operations based on actionType
        switch (actionType) {
          case "get":
            // Send a GET request to the specified URL
            res = await api.get(url, { withCredentials: true });
            break;
          case "create":
            // Send a POST request with product data to the specified URL
          
            res = await api.post(url, productData, { withCredentials: true });
            break;
          case "delete":
            // Send a DELETE request to the specified URL
            res = await api.delete(url, null, { withCredentials: true });
         
            break;
          default:
            // Throw an error for invalid action types
            throw new Error("Invalid action type");
        }
     

        // Check for unsuccessful response status
        if (res.status !== 200) {
          throw new Error(res?.data || "Operation failed");
        }

        // Store the response and action type in the state
        setResponse({ res, actionType });
      } catch (err) {
        // Handle and store any errors that occur during the request
        if (err?.response?.data) {
          setErrorCRUD(err.response.data);
        } else {
          setErrorCRUD(err.message);
        }
      } finally {
        // Set loading state to false after the request completes
        setLoadingCRUD(false);
      }
    };

    // Call the fetchData function to perform the operation
    fetchData();
  }, [actionType, productData, url]); // Re-run effect when actionType, productData, or url changes

  // Function to reset the error and response states
  const reset = (fetchAgain) => {
    setErrorCRUD(null);
    setResponse(null);
    if (fetchAgain) {
      setLoadingCRUD(true);
    }
  };

  // Return the loading state, error state, response data, and reset function
  return { loadingCRUD, errorCRUD, response, reset };
}

export default useCRUD;
