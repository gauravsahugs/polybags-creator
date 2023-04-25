import React, { useState, useContext } from "react";
import Modal from "react-modal";
import AddNewExtrution from "./AddNewExtrution";
import icons from "../../constants/icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { numberFormat } from "../numberFormat";
import { InfinitySpin } from "react-loader-spinner";
import { Tooltip } from "@mui/material";
import moment from "moment";
import ExtrusionContext from "../../context/ExtrusionContext";
import { isActiveSearchBar, isActiveTable } from "../utility";
import HeaderTitle from "../HeaderTitle";
import EditExtrution from "./EditExtrution";
import ViewExtrution from "./ViewExtrution";

function Extrution() {
  const { active } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [extrusionId, setExtrusionId] = useState();
  const addExtrution = () => {
    setModalIsOpen(true);
  };

  /*------------- Extrusion Context from Context Api ---------------------*/
  const {
    isLoading,
    allExtrutionData,
    deleteExtrusionById,
    enableExtrutionHandlerById,
    disableExtrutionHandlerById,
  } = useContext(ExtrusionContext);
  /*------------- Extrusion Context from Context Api ---------------------*/

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <InfinitySpin width="300" color="#213680" />
        </div>
      ) : (
        <div className="cbody">
          <HeaderTitle headTitle="Extrution" />
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
                    <AddNewExtrution />
                  </Modal>
                </div>
              )}
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Action</th>
                      <th>Status</th>
                      <th>Total Price</th>
                      <th>Created Date</th>
                      <th>Last Modified Date</th>
                    </tr>
                  </thead>
                  {allExtrutionData.map((eachExtrusion, index) => {
                    return (
                      isActiveTable(active, eachExtrusion.isDisabled) && (
                        <tbody key={eachExtrusion.id}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              <div className="action__div">
                                <Tooltip title="Delete" arrow>
                                  <img
                                    className="delete__icon"
                                    src={icons.deleteIcon}
                                    alt="deleteIcon"
                                    onClick={() =>
                                      deleteExtrusionById(eachExtrusion.id)
                                    }
                                  />
                                </Tooltip>
                                <Tooltip title="Edit" arrow>
                                  <img
                                    className="edit__icon"
                                    src={icons.editIcon}
                                    alt="editIcon"
                                    onClick={() => {
                                      setExtrusionId(eachExtrusion.id);
                                      setEditModalIsOpen(true);
                                    }}
                                  />
                                </Tooltip>
                                <Tooltip title="Info" arrow>
                                  <img
                                    className="info__icon"
                                    src={icons.infoIcon}
                                    alt="infoIcon"
                                    onClick={() => {
                                      setExtrusionId(eachExtrusion.id);
                                      setViewModalIsOpen(true);
                                    }}
                                  />
                                </Tooltip>
                              </div>
                            </td>
                            <td>
                              {eachExtrusion.isDisabled ? (
                                <button
                                  onClick={() =>
                                    enableExtrutionHandlerById(eachExtrusion.id)
                                  }
                                  className="deactive__button"
                                >
                                  Enable
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    disableExtrutionHandlerById(
                                      eachExtrusion.id
                                    )
                                  }
                                  className="active__button"
                                >
                                  Disable
                                </button>
                              )}
                            </td>
                            <td> {numberFormat(eachExtrusion.cost)}/kg</td>
                            <td>
                              {moment(eachExtrusion.createdTS).format("lll")}
                            </td>
                            <td>
                              {moment(eachExtrusion.modifiedTS).format("lll")}
                            </td>
                          </tr>
                        </tbody>
                      )
                    );
                  })}
                </table>
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
            <EditExtrution id={extrusionId} />
          </Modal>
          <Modal
            className="modalbox small-modal"
            isOpen={viewModalIsOpen}
            shouldCloseOnOverlayClick
            ariaHideApp={false}
            onRequestClose={() => setViewModalIsOpen(false)}
          >
            <ViewExtrution id={extrusionId} />
          </Modal>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default Extrution;
