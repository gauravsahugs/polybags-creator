import React, { useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import DiscountContext from "../../context/DiscountContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import MandatoryFields from "../MandatoryFields";

const EditDiscount = ({ id }) => {
  const navigate = useNavigate();
  useDocumentTitle("Edit Discount ");

  /*------------- Discount Context from Context Api ---------------------*/
  const {
    loadDiscountDataInInputField,
    discountData,
    setDiscountData,
    updateDiscount,
  } = useContext(DiscountContext);
  /*------------- Discount Context from Context Api ---------------------*/

  const onChange = (e) => {
    setDiscountData({ ...discountData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadDiscountDataInInputField(id);
  }, [loadDiscountDataInInputField]);

  return (
    <>
      <div className="header">Edit Discount</div>
      <MandatoryFields />
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>
              Discount Name<sup>*</sup>
            </label>
            <input
              type="text"
              name="discountName"
              value={discountData.discountName}
              onChange={onChange}
              placeholder="Discount Name"
            />
          </div>
          <div className="colorcard">
            <label>
              Discount Amount (in percentage)<sup>*</sup>
            </label>
            <input
              type="number"
              name="discountPercentage"
              value={discountData.discountPercentage}
              onChange={onChange}
              placeholder="Discount Amount (in percentage)"
            />
          </div>
          <div className="button btn-popup">
            <button
              className="btn cancel"
              onClick={() => navigate("/discount/all")}
            >
              Back
            </button>
            <button className="btn add" onClick={(e) => updateDiscount(e, id)}>
              Update Discount
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditDiscount;
