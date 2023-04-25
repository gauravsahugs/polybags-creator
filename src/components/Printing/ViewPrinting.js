import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const ViewPrinting = ({ id }) => {
  const [editColorValues, setEditColorValues] = useState({
    nameOfColor: "",
    numberOfColor: "",
    costDescription: "",
    totalCostOfColor: "",
  });
  const navigate = useNavigate();
  useDocumentTitle("View Printing");

  useEffect(() => {
    const loadPrintingDataInInputField = async () => {
      const result = await axios.get(`${BACKEND_URL}/printing/${id}`);
      setEditColorValues({
        nameOfColor: result.data.name,
        numberOfColor: result.data.no_of_colors,
        costDescription: result.data.description,
        totalCostOfColor: result.data.cost,
      });
    };
    loadPrintingDataInInputField();
  }, [id]);
  return (
    <>
      <div className="header">View Printing</div>
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>Name of the Color</label>
            <input
              type="text"
              value={editColorValues.nameOfColor}
              name="nameOfColor"
              disabled="disabled"
            />
          </div>
          <div className="colorcard">
            <label>Number of Color</label>
            <input
              type="text"
              name="numberOfColor"
              value={editColorValues.numberOfColor}
              disabled="disabled"
            />
          </div>
          {/* <div className="colorcard">
            <label>Cost Description</label>
            <input
              type="text"
              value={editColorValues.costDescription}
              name="costDescription"
              disabled="disabled"
            />
          </div> */}
          <div className="colorcard">
            <label>Total cost of the Color/kg</label>
            <input
              type="text"
              value={editColorValues.totalCostOfColor}
              name="totalCostOfColor"
              disabled="disabled"
            />
          </div>
          <div className="button btn-popup">
            <button
              className="btn cancel"
              onClick={() => navigate("/printing/all")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ViewPrinting;
