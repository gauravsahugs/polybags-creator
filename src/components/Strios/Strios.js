import React, { useState } from "react";
import Modal from "react-modal";
import AddNewStrios from "./AddNewStrios";
import useFetch from "../../hooks/useFetch";
import icons from "../../constants/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { numberFormat } from "../numberFormat";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import Moment from "moment";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { InfinitySpin } from "react-loader-spinner";
import { Tooltip } from "@mui/material";
import { isActiveSearchBar, isActiveTable } from "../utility";
import HeaderTitle from "../HeaderTitle";
import ViewStrios from "./ViewStrios";
import EditStrios from "./EditStrios";

const Strios = () => {
  const { active } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [striosId, setStriosId] = useState();
  const allStriosURL = `${BACKEND_URL}/strios`;
  const { apiData: allStriosData, isLoading } = useFetch(allStriosURL, "get");
  const navigate = useNavigate();
  useDocumentTitle("Strios");

  const addExtrution = () => {
    setModalIsOpen(true);
  };
  const enableStriosHandlerById = (id) => {
    axios.get(`${BACKEND_URL}/strio/enable/${id}`).then((response) => {
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
  const disableStriosHandlerById = (id) => {
    axios
      .get(`${BACKEND_URL}/strio/disable/${id}`)
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
  const deleteStriosById = (striosId) => {
    axios.get(`${BACKEND_URL}/strio/delete/${striosId}`).then((response) => {
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

  return (
    <div className="cbody">
      <HeaderTitle headTitle="Strios" />
      <div className="clientbody">
        <div className="subbody">
          {isActiveSearchBar(active) && (
            <div className="searchbar">
              <button className="btn add" onClick={addExtrution}>
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
                className="modalbox small-modal"
                isOpen={modalIsOpen}
                shouldCloseOnOverlayClick
                ariaHideApp={false}
                onRequestClose={() => setModalIsOpen(false)}
              >
                <AddNewStrios />
              </Modal>
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
                    <th>Name</th>
                    <th>Cost</th>
                    <th>Created Date</th>
                    <th>Last Modified Date</th>
                  </tr>
                </thead>
                {allStriosData.map((eachStrios, index) => {
                  return (
                    isActiveTable(active, eachStrios.isDisabled) && (
                      <tbody key={eachStrios.id}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <div className="action__div">
                              <Tooltip title="Delete">
                                <img
                                  className="delete__icon"
                                  src={icons.deleteIcon}
                                  alt="deleteIcon"
                                  onClick={() =>
                                    deleteStriosById(eachStrios.id)
                                  }
                                />
                              </Tooltip>
                              <Tooltip title="Edit">
                                <img
                                  className="edit__icon"
                                  src={icons.editIcon}
                                  alt="editIcon"
                                  onClick={() => {
                                    setStriosId(eachStrios.id);
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
                                    setStriosId(eachStrios.id);
                                    setViewModalIsOpen(true);
                                  }}
                                />
                              </Tooltip>
                            </div>
                          </td>
                          <td>
                            {eachStrios.isDisabled ? (
                              <button
                                onClick={() =>
                                  enableStriosHandlerById(eachStrios.id)
                                }
                                className="deactive__button"
                              >
                                Enable
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  disableStriosHandlerById(eachStrios.id)
                                }
                                className="active__button"
                              >
                                Disable
                              </button>
                            )}
                          </td>
                          <td>{eachStrios.name}</td>
                          <td> {numberFormat(eachStrios.cost)}/kg</td>
                          <td>{Moment(eachStrios.createdTS).format("lll")}</td>
                          <td>{Moment(eachStrios.modifiedTS).format("lll")}</td>
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
      <Modal
        className="modalbox small-modal"
        isOpen={editModalIsOpen}
        shouldCloseOnOverlayClick
        ariaHideApp={false}
        onRequestClose={() => setEditModalIsOpen(false)}
      >
        <EditStrios id={striosId} />
      </Modal>
      <Modal
        className="modalbox small-modal"
        isOpen={viewModalIsOpen}
        shouldCloseOnOverlayClick
        ariaHideApp={false}
        onRequestClose={() => setViewModalIsOpen(false)}
      >
        <ViewStrios id={striosId} />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Strios;
