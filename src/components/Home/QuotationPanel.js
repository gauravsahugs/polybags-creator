import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import icons from "../../constants/icons";
import { InfinitySpin } from "react-loader-spinner";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { numberFormat } from "../numberFormat";
import { BACKEND_URL } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlineDownload } from "react-icons/hi";
import moment from "moment";

function QuotationPanel() {
  const navigate = useNavigate();
  const allQuotesURL = `${BACKEND_URL}/quotes`;
  const { apiData: allClientsData, isLoading } = useFetch(allQuotesURL, "get");

  const downloadPDFById = (downloadId, clientName) => {
    axios({
      url: `${BACKEND_URL}/quote/getquote/${downloadId}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${clientName} quotation.pdf`);
        document.body.appendChild(link);
        link.click();
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
    <div className="client-body">
      <div className="clientheading">
        <strong>Quotation Panel</strong>
      </div>
      <div className="clientbody">
        <div className="subbody">
          <div className="searchbar">
            <button
              className="btn add"
              onClick={() => navigate("/clientquotation")}
            >
              <i
                class="bi bi-plus-lg"
                style={{ fontSize: 16, alignItems: "center" }}
              ></i>
              &nbsp; Add New
            </button>
            <div className="inputsearch">
              <icons.SearchIcon />
              <input type="text" />
            </div>
          </div>
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
                  <th>Company</th>
                  <th>Product Name</th>
                  <th>Status</th>
                  <th>Estimated Cost</th>
                  <th>Estimated Weight</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              {allClientsData.map((eachClient, index) => {
                return (
                  <tbody key={eachClient.id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <div className="action__div">
                          <Tooltip title="Info">
                            <img
                              className="info__icon"
                              src={icons.infoIcon}
                              alt="infoIcon"
                              onClick={() =>
                                navigate(`/quote/${eachClient.id}`)
                              }
                            />
                          </Tooltip>
                          {/* <Tooltip title="Edit">
                            <img
                              className="edit__icon"
                              src={icons.editIcon}
                              alt="editIcon"
                              onClick={() =>
                                navigate(`/quote/${eachClient.id}`)
                              }
                            />
                          </Tooltip>
                         
                          <img
                              className="delete__icon"
                              src={icons.deleteIcon}
                              alt="deleteIcon"
                            />  */}
                          <Tooltip title="Download">
                            <div className="delete__icon">
                              <HiOutlineDownload
                                onClick={() =>
                                  downloadPDFById(
                                    eachClient.id,
                                    eachClient.client
                                  )
                                }
                              />
                            </div>
                          </Tooltip>
                        </div>
                      </td>
                      <td>{eachClient.company}</td>
                      <td>{eachClient.productName}</td>
                      <td>{eachClient.status}</td>
                      <td>{numberFormat(eachClient.estimatedCost)}</td>
                      <td>{numberFormat(eachClient.estWeight)}</td>
                      <td>{moment(eachClient.createdTS).format("llll")}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default QuotationPanel;
