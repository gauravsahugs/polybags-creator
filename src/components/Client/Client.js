import React, { useState, useContext } from "react";
import Modal from "react-modal";
import AddNewClient from "./AddNewClient";
import icons from "../../constants/icons";
import { capitalizeCase } from "../capitalizeCase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { InfinitySpin } from "react-loader-spinner";
import { Tooltip } from "@mui/material";
import ClientContext from "../../context/ClientContext";
import { isActiveSearchBar, isActiveTable } from "../utility";
import HeaderTitle from "../HeaderTitle";
import EditClient from "./EditClient";
import ViewClient from "./ViewClient";

function Client() {
  const { active } = useParams();
  const navigate = useNavigate();
  useDocumentTitle("Client");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [clId, setClId] = useState();
  const [modalMargin, setModalMargin] = useState(false);

  const { allClientsData, isLoading } = useContext(ClientContext);

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
    <div className="cbody">
      <HeaderTitle headTitle="Customer" />
      <div className="clientbody">
        <div className="subbody">
          {isActiveSearchBar(active) && (
            <div className="searchbar">
              <button
                className="btn add"
                onClick={() => {
                  setModalIsOpen(true);
                  setModalMargin(true);
                }}
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
              <Modal
                className="modalbox large"
                isOpen={modalIsOpen}
                shouldCloseOnOverlayClick
                ariaHideApp={false}
                onRequestClose={() => setModalIsOpen(false)}
              >
                <AddNewClient modalMargin={modalMargin} />
              </Modal>
            </div>
          )}

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
                // console.log(eachPrint.id);
                return isActiveTable(active, eachClient.isDisabled) ? (
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
                              onClick={() => {
                                setClId(eachClient.id);
                                setEditModalIsOpen(true);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Info">
                            <img
                              className="info__icon"
                              src={icons.infoIcon}
                              alt="infoIcon"
                              onClick={() => {
                                setClId(eachClient.id);
                                setViewModalIsOpen(true);
                              }}
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
                        {capitalizeCase(`${eachClient.firstName}
											${capitalizeCase(eachClient.lastName)}`)}
                      </td>
                      <td>{"+91" + eachClient.phone}</td>
                      <td>{eachClient.email}</td>
                      <td>{eachClient.gstin}</td>
                      <td>{capitalizeCase(eachClient.company)}</td>
                    </tr>
                  </tbody>
                ) : (
                  ""
                );
              })}
            </table>
          )}
        </div>
      </div>
      <Modal
        className="modalbox large"
        isOpen={editModalIsOpen}
        shouldCloseOnOverlayClick
        ariaHideApp={false}
        onRequestClose={() => setEditModalIsOpen(false)}
      >
        <EditClient id={clId} />
      </Modal>
      <Modal
        className="modalbox large"
        isOpen={viewModalIsOpen}
        shouldCloseOnOverlayClick
        ariaHideApp={false}
        onRequestClose={() => setViewModalIsOpen(false)}
      >
        <ViewClient id={clId} />
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Client;
