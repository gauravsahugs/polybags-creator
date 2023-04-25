import React, { useState } from "react";
import Modal from "react-modal";
import AddNewTint from "./AddNewTint";
import useFetch from "../../hooks/useFetch";
import icons from "../../constants/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { numberFormat } from "../numberFormat";
import { BACKEND_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Moment from "moment";
import { InfinitySpin } from "react-loader-spinner";
import { Tooltip } from "@mui/material";
import { isActiveSearchBar, isActiveTable } from "../utility";
import HeaderTitle from "../HeaderTitle";
import ViewTint from "./ViewTint";
import EditTint from "./EditTint";

function Tint() {
  const { active } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  useDocumentTitle("Tint");
  const navigate = useNavigate();
  const allTintURL = `${BACKEND_URL}/tints`;
  const { apiData: allTintData, isLoading } = useFetch(allTintURL, "get");

  const [tintId, setTintId] = useState(0);

  const addTint = () => {
    setModalIsOpen(true);
  };

  const enableTintHandlerById = (id) => {
    axios.get(`${BACKEND_URL}/tint/enable/${id}`).then((response) => {
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
  const disableTintHandlerById = (id) => {
    axios
      .get(`${BACKEND_URL}/tint/disable/${id}`)
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
  const deleteTintById = (tintId) => {
    axios
      .get(`${BACKEND_URL}/tint/delete/${tintId}`)
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
    <>
      {isLoading ? (
        <div className="loader">
          <InfinitySpin width="300" color="#213680" />
        </div>
      ) : (
        <div className="cbody">
          <HeaderTitle headTitle="Tint" />
          <div className="clientbody">
            <div className="subbody">
              {isActiveSearchBar(active) && (
                <div className="searchbar">
                  <button className="btn add" onClick={addTint}>
                    <i
                      class="bi bi-plus-lg"
                      style={{ fontSize: 16, alignItems: "center" }}
                    ></i>
                    Add New
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
                    <AddNewTint />
                  </Modal>
                </div>
              )}

              <div>
                {isLoading ? (
                  <div className="loader">
                    <InfinitySpin width="300" color="#213680" />
                  </div>
                ) : (
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Action</th>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Total Price</th>
                        <th>Last Modified Date</th>
                        <th>Created Date</th>
                      </tr>
                    </thead>
                    {allTintData.map((eachTint, index) => {
                      return isActiveTable(active, eachTint.isDisabled) ? (
                        <tbody key={eachTint.id}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              <div className="action__div">
                                <Tooltip title="Delete">
                                  <img
                                    className="delete__icon"
                                    src={icons.deleteIcon}
                                    alt="deleteIcon"
                                    onClick={() => deleteTintById(eachTint.id)}
                                  />
                                </Tooltip>
                                <Tooltip title="Edit">
                                  <img
                                    className="edit__icon"
                                    src={icons.editIcon}
                                    alt="editIcon"
                                    onClick={() => {
                                      setTintId(eachTint.id);
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
                                      setTintId(eachTint.id);
                                      setViewModalIsOpen(true);
                                    }}
                                  />
                                </Tooltip>
                              </div>
                            </td>
                            <td>
                              {eachTint.isDisabled ? (
                                <button
                                  onClick={() =>
                                    enableTintHandlerById(eachTint.id)
                                  }
                                  className="deactive__button"
                                >
                                  Enable
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    disableTintHandlerById(eachTint.id)
                                  }
                                  className="active__button"
                                >
                                  Disable
                                </button>
                              )}
                            </td>
                            <td>{eachTint.name}</td>
                            <td>
                              {numberFormat(eachTint.cost)}
                              /kg
                            </td>
                            <td>{Moment(eachTint.modifiedTS).format("lll")}</td>
                            <td>{Moment(eachTint.createdTS).format("lll")}</td>
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
          </div>
          <Modal
            className="modalbox small-modal"
            isOpen={editModalIsOpen}
            shouldCloseOnOverlayClick
            ariaHideApp={false}
            onRequestClose={() => setEditModalIsOpen(false)}
          >
            <EditTint id={tintId} />
          </Modal>
          <Modal
            className="modalbox small-modal"
            isOpen={viewModalIsOpen}
            shouldCloseOnOverlayClick
            ariaHideApp={false}
            onRequestClose={() => setViewModalIsOpen(false)}
          >
            <ViewTint id={tintId} />
          </Modal>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default Tint;
