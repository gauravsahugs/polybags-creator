import React, { useState } from "react";
import Modal from "react-modal";
import AddNewPrinting from "./AddNewPrinting";
import useFetch from "../../hooks/useFetch";
import icons from "../../constants/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { numberFormat } from "../numberFormat";
import { BACKEND_URL } from "../../config";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { InfinitySpin } from "react-loader-spinner";
import { Tooltip } from "@mui/material";
import { isActiveSearchBar, isActiveTable } from "../utility";
import HeaderTitle from "../HeaderTitle";
import ViewPrinting from "./ViewPrinting";
import EditPrinting from "./EditPrinting";

function Printing() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [printingId, setPrintingId] = useState();
  useDocumentTitle("Saradhi Packaging | Printing");
  const { active } = useParams();

  const navigate = useNavigate();
  const allPrintingURL = `${BACKEND_URL}/printings`;

  const { apiData: allPrintingData, isLoading } = useFetch(
    allPrintingURL,
    "get"
  );

  const addPrinting = () => {
    setModalIsOpen(true);
  };
  const enableFilmHandlerById = (id) => {
    axios
      .get(`${BACKEND_URL}/printing/enable/${id}`)
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
  const disableFilmHandlerById = (id) => {
    axios
      .get(`${BACKEND_URL}/printing/disable/${id}`)
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
  const deletePrintById = (printId) => {
    axios
      .get(`${BACKEND_URL}/printing/delete/${printId}`)
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
      <HeaderTitle headTitle="Printing" />
      <div className="clientbody">
        <div className="subbody">
          {isActiveSearchBar(active) && (
            <div className="searchbar">
              <button className="btn add" onClick={addPrinting}>
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
                <AddNewPrinting />
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
                    <th>No.of Colors</th>
                    <th>Total Price</th>
                    <th>Last Modified Date</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                {allPrintingData.map((eachPrint, index) => {
                  // console.log(eachPrint.id);
                  return (
                    isActiveTable(active, eachPrint.isDisabled) && (
                      <tbody key={eachPrint.id}>
                        <tr>
                          {/* <td>{eachPrint.id}</td> */}
                          <td>{index + 1}</td>
                          <td>
                            <div className="action__div">
                              <Tooltip title="Delete">
                                <img
                                  className="delete__icon"
                                  src={icons.deleteIcon}
                                  alt="deleteIcon"
                                  onClick={() => deletePrintById(eachPrint.id)}
                                />
                              </Tooltip>
                              <Tooltip title="Edit">
                                <img
                                  className="edit__icon"
                                  src={icons.editIcon}
                                  alt="editIcon"
                                  onClick={() => {
                                    setPrintingId(eachPrint.id);
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
                                    setPrintingId(eachPrint.id);
                                    setViewModalIsOpen(true);
                                  }}
                                />
                              </Tooltip>
                            </div>
                          </td>
                          <td>
                            {eachPrint.isDisabled ? (
                              <button
                                onClick={() =>
                                  enableFilmHandlerById(eachPrint.id)
                                }
                                className="deactive__button"
                              >
                                Enable
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  disableFilmHandlerById(eachPrint.id)
                                }
                                className="active__button"
                              >
                                Disable
                              </button>
                            )}
                          </td>
                          <td>{eachPrint.name}</td>
                          <td>{eachPrint.no_of_colors}</td>
                          <td> {numberFormat(eachPrint.cost)}/kg</td>
                          <td>{moment(eachPrint.modifiedTS).format("lll")}</td>
                          <td>{moment(eachPrint.createdTS).format("lll")}</td>
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
        isOpen={viewModalIsOpen}
        shouldCloseOnOverlayClick
        ariaHideApp={false}
        onRequestClose={() => setViewModalIsOpen(false)}
      >
        <ViewPrinting id={printingId} />
      </Modal>
      <Modal
        className="modalbox small-modal"
        isOpen={editModalIsOpen}
        shouldCloseOnOverlayClick
        ariaHideApp={false}
        onRequestClose={() => setEditModalIsOpen(false)}
      >
        <EditPrinting id={printingId} />
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Printing;
