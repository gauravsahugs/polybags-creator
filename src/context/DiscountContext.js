import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import useFetch from "../hooks/useFetch";

const DiscountContext = createContext({});

export const DiscountProvider = ({ children }) => {
  const [discountData, setDiscountData] = useState("");
  const navigate = useNavigate();
  const goBackToPage = () => {
    navigate("/discount");
  };
  const allDiscountURL = `${BACKEND_URL}/discounts`;
  const {
    apiData: allDiscountData,
    isLoading,
    errorOccurred,
  } = useFetch(allDiscountURL, "get");

  const deleteDiscountById = (discountId) => {
    axios
      .get(`${BACKEND_URL}/discount/delete/${discountId}`)
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
  const loadDiscountDataInInputField = async (loadDataId) => {
    const result = await axios.get(`${BACKEND_URL}/discount/${loadDataId}`);
    setDiscountData({
      discountName: result.data.name,
      discountPercentage: result.data.percentage,
    });
  };

  const updateDiscount = (e, updateId) => {
    e.preventDefault();
    const DiscountObject = {
      cost: discountData,
    };
    axios
      .post(`${BACKEND_URL}/discount/update/${updateId}`, DiscountObject)
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

    setDiscountData("");
  };
  const enableDiscountHandlerById = (enableId) => {
    axios.get(`${BACKEND_URL}/discount/enable/${enableId}`).then((response) => {
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

  const disableDiscountHandlerById = (disableId) => {
    axios
      .get(`${BACKEND_URL}/discount/disable/${disableId}`)
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
  };

  return (
    <DiscountContext.Provider
      value={{
        isLoading,
        goBackToPage,
        discountData,
        updateDiscount,
        setDiscountData,
        allDiscountData,
        deleteDiscountById,
        enableDiscountHandlerById,
        disableDiscountHandlerById,
        loadDiscountDataInInputField,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
};

export default DiscountContext;
