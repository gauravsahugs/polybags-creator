import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import icons from "../../constants/icons";
import { InfinitySpin } from "react-loader-spinner";
import { BACKEND_URL } from "../../config";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Tooltip } from "@mui/material";

function ClientUserPanel() {
  const navigate = useNavigate();

  const allClientsURL = `${BACKEND_URL}/clients`;
  const { apiData: allClientsData, isLoading } = useFetch(allClientsURL, "get");

  const enableClientHandlerById = (id) => {
    axios.get(`${BACKEND_URL}/clients/enable/${id}`).then((response) => {
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
  const disableClientHandlerById = (id) => {
    axios.get(`${BACKEND_URL}/clients/disable/${id}`).then((response) => {
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
  const deleteClientById = (clientId) => {
    axios
      .get(`${BACKEND_URL}/clients/delete/${clientId}`)
      .then((response) => {
        toast.dark(response.data.message, {
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
    <div className="client-body">
      <div className="clientheading">
        <strong>Customer</strong>
      </div>
      <div className="clientbody">
        <div className="subbody">
          <div className="searchbar">
            <button
              className="btn add"
              onClick={() => navigate("/customer-reg")}
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
                  <th>Status</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>GST</th>
                  <th>Company</th>
                </tr>
              </thead>
              {allClientsData.map((eachClient, index) => {
                return (
                  <tbody key={eachClient.id}>
                    <tr>
                      {/* <td>{eachClient.id}</td> */}
                      <td>{index + 1}</td>
                      <td>
                        <div className="action__div">
                          <Tooltip title="Delete">
                            <img
                              className="delete__icon"
                              src={icons.deleteIcon}
                              alt="deleteIcon"
                              onClick={() => deleteClientById(eachClient.id)}
                            />
                          </Tooltip>
                          <Tooltip title="Edit">
                            <img
                              className="edit__icon"
                              src={icons.editIcon}
                              alt="editIcon"
                              onClick={() =>
                                navigate(`/client/edit/${eachClient.id}`)
                              }
                            />
                          </Tooltip>

                          <Tooltip title="Info">
                            <img
                              className="info__icon"
                              src={icons.infoIcon}
                              alt="infoIcon"
                              onClick={() =>
                                navigate(`/client/view/${eachClient.id}`)
                              }
                            />
                          </Tooltip>
                        </div>
                      </td>
                      <td>
                        {eachClient.isDisabled ? (
                          <button
                            onClick={() =>
                              enableClientHandlerById(eachClient.id)
                            }
                            className="deactive__button"
                          >
                            Enable
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              disableClientHandlerById(eachClient.id)
                            }
                            className="active__button"
                          >
                            Disable
                          </button>
                        )}
                      </td>
                      <td>
                        {eachClient.firstName}&nbsp;
                        {eachClient.lastName}
                      </td>
                      <td>{"+91" + eachClient.phone}</td>
                      <td>{eachClient.email}</td>
                      <td>{eachClient.gstin}</td>
                      <td>{eachClient.company}</td>
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

export default ClientUserPanel;
