import React, { useState } from "react";
import icons from "../../constants/icons";
import Modal from "react-modal";
import useFetch from "../../hooks/useFetch";
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
import ViewBagShape from "./ViewBagShape";
import EditBagShape from "./EditBagShape";
import AddNewBagShape from "./AddNewBagShape";

function BagShape() {
  const { active } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  useDocumentTitle("Bag Shape");
  const navigate = useNavigate();
  const allBagURL = `${BACKEND_URL}/bags`;
  const { apiData: allBagData, isLoading } = useFetch(allBagURL, "get");

  const [bagId, setBagId] = useState(0);

  const addBag = () => {
    setModalIsOpen(true);
  };

  const enableBagHandlerById = (id) => {
    axios.get(`${BACKEND_URL}/bag/enable/${id}`).then((response) => {
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
  const disableBagHandlerById = (id) => {
    axios
      .get(`${BACKEND_URL}/bag/disable/${id}`)
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
  const deleteBagById = (bagId) => {
    axios
      .get(`${BACKEND_URL}/bag/delete/${bagId}`)
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
          <HeaderTitle headTitle="Bag Shape" />
          <div className="clientbody">
            <div className="subbody">
              {isActiveSearchBar(active) && (
                <div className="searchbar">
                  <button className="btn add" onClick={addBag}>
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
                    <AddNewBagShape />
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
                        <th>Total Price</th>
                        <th>Last Modified Date</th>
                        <th>Created Date</th>
                      </tr>
                    </thead>
                    {allBagData.map((eachBag, index) => {
                      return (
                        isActiveTable(active, eachBag.isDisabled) && (
                          <tbody key={eachBag.id}>
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <div className="action__div">
                                  <Tooltip title="Delete">
                                    <img
                                      className="delete__icon"
                                      src={icons.deleteIcon}
                                      alt="deleteIcon"
                                      onClick={() => deleteBagById(eachBag.id)}
                                    />
                                  </Tooltip>
                                  <Tooltip title="Edit">
                                    <img
                                      className="edit__icon"
                                      src={icons.editIcon}
                                      alt="editIcon"
                                      onClick={() => {
                                        setBagId(eachBag.id);
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
                                        setBagId(eachBag.id);
                                        setViewModalIsOpen(true);
                                      }}
                                    />
                                  </Tooltip>
                                </div>
                              </td>
                              <td>
                                {eachBag.isDisabled ? (
                                  <button
                                    onClick={() =>
                                      enableBagHandlerById(eachBag.id)
                                    }
                                    className="deactive__button"
                                  >
                                    {" "}
                                    Enable
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      disableBagHandlerById(eachBag.id)
                                    }
                                    className="active__button"
                                  >
                                    Disable
                                  </button>
                                )}
                              </td>
                              <td>{eachBag.name}</td>
                              <td>
                                {numberFormat(eachBag.cost)}
                                /kg
                              </td>
                              <td>
                                {Moment(eachBag.modifiedTS).format("lll")}
                              </td>
                              <td>{Moment(eachBag.createdTS).format("lll")}</td>
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
            <EditBagShape id={bagId} />
          </Modal>
          <Modal
            className="modalbox small-modal"
            isOpen={viewModalIsOpen}
            shouldCloseOnOverlayClick
            ariaHideApp={false}
            onRequestClose={() => setViewModalIsOpen(false)}
          >
            <ViewBagShape id={bagId} />
          </Modal>

          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default BagShape;
