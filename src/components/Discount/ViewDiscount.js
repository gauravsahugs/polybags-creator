import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import DiscountContext from "../../context/DiscountContext";

const ViewDiscount = ({ id }) => {
  useDocumentTitle("View Discount");
  const navigate = useNavigate();

  /*------------- Extrusion Context from Context Api ---------------------*/
  const { loadDiscountDataInInputField, discountData } =
    useContext(DiscountContext);
  /*------------- Extrusion Context from Context Api ---------------------*/

  useEffect(() => {
    loadDiscountDataInInputField(id);
  }, [loadDiscountDataInInputField]);
  return (
    <>
      <div className="header">View Discount</div>
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>Discount Name</label>
            <input
              type="text"
              name="discountName"
              value={discountData.discountName}
              placeholder="Discount Name"
              disabled="disabled"
            />
          </div>
          <div className="colorcard">
            <label>Discount Amount (in percentage)</label>
            <input
              type="number"
              name="discountPercentage"
              value={discountData.discountPercentage}
              placeholder="Discount Amount (in percentage)"
              disabled="disabled"
            />
          </div>
          <div className="button btn-popup">
            <button
              className="btn cancel"
              onClick={() => navigate("/discount/all")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ViewDiscount;
