import React, { useContext, useState } from "react";
import Modal from "react-modal";
import AddNewDiscount from "./AddNewDiscount";
import icons from "../../constants/icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { capitalizeCase } from "../capitalizeCase";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { InfinitySpin } from "react-loader-spinner";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { isActiveSearchBar, isActiveTable } from "../utility";
import HeaderTitle from "../HeaderTitle";
import EditDiscount from "./EditDiscount";
import ViewDiscount from "./ViewDiscount";
import DiscountContext from "../../context/DiscountContext";

function Discount() {
  const { active } = useParams();
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [discId, setDiscId] = useState(0);

  useDocumentTitle("Discount");
  const addDiscount = () => {
    setAddModalIsOpen(true);
  };
  /*------------- Discount Context from Context Api ---------------------*/
  const {
    isLoading,
    allDiscountData,
    deleteDiscountById,
    enableDiscountHandlerById,
    disableDiscountHandlerById,
  } = useContext(DiscountContext);
  /*------------- Discount Context from Context Api ---------------------*/

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <InfinitySpin width="300" color="#213680" />
        </div>
      ) : (
        <div className="cbody">
          <HeaderTitle headTitle="Discount" />
          <div className="clientbody">
            <div className="subbody">
              {isActiveSearchBar(active) && (
                <div className="searchbar">
                  <button className="btn add" onClick={addDiscount}>
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
                    isOpen={addModalIsOpen}
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick
                    onRequestClose={() => addModalIsOpen(false)}
                  >
                    <AddNewDiscount />
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
                      <th>Name</th>
                      <th>Discount Value</th>
                      <th>Last Modified Date</th>
                      <th>Created Date</th>
                    </tr>
                  </thead>
                  {allDiscountData.map((eachDiscount, index) => {
                    return (
                      isActiveTable(active, eachDiscount.isDisabled) && (
                        <tbody key={eachDiscount.id}>
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
                                      deleteDiscountById(eachDiscount.id)
                                    }
                                  />
                                </Tooltip>
                                <Tooltip title="Edit" arrow>
                                  <img
                                    className="edit__icon"
                                    src={icons.editIcon}
                                    alt="editIcon"
                                    onClick={() => {
                                      setDiscId(eachDiscount.id);
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
                                      setDiscId(eachDiscount.id);
                                      setViewModalIsOpen(true);
                                    }}
                                  />
                                </Tooltip>
                              </div>
                            </td>
                            <td>
                              {eachDiscount.isDisabled ? (
                                <button
                                  onClick={() =>
                                    enableDiscountHandlerById(eachDiscount.id)
                                  }
                                  className="deactive__button"
                                >
                                  Enable
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    disableDiscountHandlerById(eachDiscount.id)
                                  }
                                  className="active__button"
                                >
                                  Disable
                                </button>
                              )}
                            </td>
                            <td>{capitalizeCase(eachDiscount.name)}</td>
                            <td>{eachDiscount.percentage}%</td>
                            <td>
                              {moment(eachDiscount.modifiedTS).format("lll")}
                            </td>
                            <td>
                              {moment(eachDiscount.createdTS).format("lll")}
                            </td>
                          </tr>
                        </tbody>
                      )
                    );
                  })}
                </table>
              </div>
            </div>
            <Modal
              className="modalbox small-modal"
              isOpen={editModalIsOpen}
              ariaHideApp={false}
              shouldCloseOnOverlayClick
              onRequestClose={() => setEditModalIsOpen(false)}
            >
              <EditDiscount id={discId} />
            </Modal>
            <Modal
              className="modalbox small-modal"
              isOpen={viewModalIsOpen}
              ariaHideApp={false}
              shouldCloseOnOverlayClick
              onRequestClose={() => setViewModalIsOpen(false)}
            >
              <ViewDiscount id={discId} />
            </Modal>
            <ToastContainer />
          </div>
        </div>
      )}
    </>
  );
}

export default Discount;
