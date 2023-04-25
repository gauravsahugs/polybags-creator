import React, { useState, createContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import useFetch from "../hooks/useFetch";

const ExtrusionContext = createContext({});

export const ExtrusionProvider = ({ children }) => {
  const [extrutionData, setExtrutionData] = useState("");
  const navigate = useNavigate();
  const goBackToPage = () => {
    navigate("/extrution");
  };
  const allExtrutionURL = `${BACKEND_URL}/extrusions`;
  const {
    apiData: allExtrutionData,
    isLoading,
    errorOccurred,
  } = useFetch(allExtrutionURL, "get");

  const deleteExtrusionById = (extrusionId) => {
    axios
      .get(`${BACKEND_URL}/extrusion/delete/${extrusionId}`)
      .then((response) => {
        toast.dark(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    const timer = () => {
      setTimeout(() => {
        navigate(0);
      }, 2100);
    };
    timer();
    clearTimeout(timer);
  };
  const loadExtrutionDataInInputField = async (loadDataId) => {
    const result = await axios.get(`${BACKEND_URL}/extrusion/${loadDataId}`);
    setExtrutionData(result.data.cost);
  };
  const updateExtrution = (e, updateId) => {
    e.preventDefault();
    const ExtrutionObject = {
      cost: extrutionData,
    };
    axios
      .post(`${BACKEND_URL}/extrusion/update/${updateId}`, ExtrutionObject)
      .then((res) => {
        toast.dark(res.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const timer = () => {
          setTimeout(() => {
            navigate(0);
          }, 2100);
        };
        timer();
        clearTimeout(timer);
      })
      .catch((error) => {
        if (error.message) {
          toast.error(error.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });

    setExtrutionData("");
  };
  const enableExtrutionHandlerById = (enableId) => {
    axios
      .get(`${BACKEND_URL}/extrusion/enable/${enableId}`)
      .then((response) => {
        toast.info(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const timer = () => {
          setTimeout(() => {
            navigate(0);
          }, 2100);
        };
        timer();
        clearTimeout(timer);
      });
  };
  const disableExtrutionHandlerById = (disableId) => {
    axios
      .get(`${BACKEND_URL}/extrusion/disable/${disableId}`)
      .then((response) => {
        toast.info(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const timer = () => {
          setTimeout(() => {
            navigate(0);
          }, 2100);
        };
        timer();
        clearTimeout(timer);
      });
  };

  return (
    <ExtrusionContext.Provider
      value={{
        isLoading,
        goBackToPage,
        extrutionData,
        updateExtrution,
        setExtrutionData,
        allExtrutionData,
        deleteExtrusionById,
        enableExtrutionHandlerById,
        disableExtrutionHandlerById,
        loadExtrutionDataInInputField,
      }}
    >
      {children}
    </ExtrusionContext.Provider>
  );
};

export default ExtrusionContext;
