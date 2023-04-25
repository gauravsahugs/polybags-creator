import React, { createContext } from "react";
import { BACKEND_URL } from "../config";
import useFetch from "../hooks/useFetch";

const BagContext = createContext({});

export const BagProvider = ({ children }) => {
  const allBagURL = `${BACKEND_URL}/bags`;
  const { apiData: allBagData, isLoading } = useFetch(allBagURL, "get");
  return (
    <BagContext.Provider value={{ allBagData }}>{children}</BagContext.Provider>
  );
};

export default BagContext;
