import React from "react";
import icons from "../../constants/icons";
import useFetch from "../../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { numberFormat } from "../numberFormat";
import { BACKEND_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import moment from "moment";
import { InfinitySpin } from "react-loader-spinner";
import { Tooltip } from "@mui/material";
import HeaderTitle from "../HeaderTitle";
import { isActiveSearchBar, isActiveTable } from "../utility";

const AdminQuotation = () => {
  const { active } = useParams();
  const navigate = useNavigate();
  useDocumentTitle("Quotation");

  const allAdminQuotationURL = `${BACKEND_URL}/quotes`;

  const { apiData: allAdminQuotationData, isLoading } = useFetch(
    allAdminQuotationURL,
    "get"
  );

  const enableAdminQuotationHandlerById = (id) => {
    axios.get(`${BACKEND_URL}/quote/enable/${id}`).then((response) => {
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
  const disableAdminQuotationHandlerById = (id) => {
    axios
      .get(`${BACKEND_URL}/quote/disable/${id}`)
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
  const deleteAdminQuotationById = (quoteId) => {
    axios.get(`${BACKEND_URL}/quote/delete/${quoteId}`).then((response) => {
      toast.dark(response.data.message, {
        position: "top-right",
        autoClose: 2000,
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
  return (
    <div className="cbody">
      <HeaderTitle headTitle="Quotation" />
      <div className="clientbody">
        <div className="subbody">
          {isActiveSearchBar(active) && (
            <div className="searchbar">
              <button
                className="btn add"
                onClick={() => navigate("/clientquotation")}
              >
                <i
                  class="bi bi-plus-lg"
                  style={{ fontSize: 16, alignItems: "center" }}
                ></i>{" "}
                Add New
              </button>
              <div className="inputsearch">
                <icons.SearchIcon />
                <input type="text" />
              </div>
            </div>
          )}
          <div>
            {isLoading ? (
              <div className="loader">
                <InfinitySpin width="300" color="#213680" />
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Action</th>
                    <th>Status</th>
                    <th>Company</th>
                    <th>Product Name</th>
                    <th>Estimated Weight</th>
                    <th>Estimated Cost</th>
                    <th>Last Modified Date</th>
                  </tr>
                </thead>
                {allAdminQuotationData.map((eachQuote, index) => {
                  return (
                    isActiveTable(active, eachQuote.isDisabled) && (
                      <tbody key={eachQuote.id}>
                        <tr>
                          <td>{index + 1}</td>
                          {/* <td>{eachQuote.id}</td> */}
                          <td>
                            <div className="action__div">
                              <Tooltip title="Delete">
                                <img
                                  className="delete__icon"
                                  src={icons.deleteIcon}
                                  alt="deleteIcon"
                                  onClick={() =>
                                    deleteAdminQuotationById(eachQuote.id)
                                  }
                                />
                              </Tooltip>
                              {/* <Tooltip title="Edit">
                                <img
                                  className="edit__icon"
                                  src={icons.editIcon}
                                  alt="editIcon"
                                  onClick={() =>
                                    navigate(`/quote/${eachQuote.id}`)
                                  }
                                />
                              </Tooltip> */}
                              <Tooltip title="Info">
                                <img
                                  className="info__icon"
                                  src={icons.infoIcon}
                                  alt="infoIcon"
                                  onClick={() =>
                                    navigate(`/quote/${eachQuote.id}`)
                                  }
                                />
                              </Tooltip>
                            </div>
                          </td>
                          <td>
                            {eachQuote.isDisabled ? (
                              <button
                                onClick={() =>
                                  enableAdminQuotationHandlerById(eachQuote.id)
                                }
                                className="deactive__button"
                              >
                                Enable
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  disableAdminQuotationHandlerById(eachQuote.id)
                                }
                                className="active__button"
                              >
                                Disable
                              </button>
                            )}
                          </td>
                          <td>{eachQuote.company}</td>
                          <td>{eachQuote.productName}</td>
                          <td>{eachQuote.estWeight} Kg</td>
                          <td>{numberFormat(eachQuote.estimatedCost)}</td>
                          <td>{moment(eachQuote.modifiedTS).format("lll")}</td>
                        </tr>
                      </tbody>
                    )
                  );
                })}
              </table>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminQuotation;
