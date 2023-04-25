import React, { useState, createContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import useFetch from "../hooks/useFetch";

const ClientContext = createContext({});

export const ClientProvider = ({ children }) => {
  const [clientData, setClientData] = useState([]);
  const allClientsURL = `${BACKEND_URL}/clients`;
  const { apiData: allClientsData, isLoading } = useFetch(allClientsURL, "get");

  const loadClientDataInInputField = async ({ id }) => {
    const result = await axios.get(`${BACKEND_URL}/client/${id}`);

    setClientData({
      firstName: result.data.firstName,
      phoneNumber: result.data.phone,
      firstAddress: result.data.address1,
      pinCode: result.data.pincode,
      city: result.data.city,
      state: result.data.state,
      country: result.data.country,
    });
  };
  return (
    <ClientContext.Provider
      value={{
        clientData,
        allClientsData,
        isLoading,
        loadClientDataInInputField,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContext;
