import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const ViewTint = ({ id }) => {
  const [viewTintValues, setViewTintValues] = useState({
    nameOfTint: "",
    tintCost: "",
  });
  useDocumentTitle("View Tint");
  const navigate = useNavigate();

  useEffect(() => {
    const loadTintDataInInputField = async () => {
      const result = await axios.get(`${BACKEND_URL}/tint/${id}`);
      setViewTintValues({
        tintCost: result.data.cost,
        nameOfTint: result.data.name,
      });
    };

    loadTintDataInInputField();
  }, [id]);

  return (
    <>
      <div className="header">Tint Information</div>
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>Name of Tint</label>
            <input
              type="text"
              value={viewTintValues.nameOfTint}
              name="nameOfTint"
              disabled="disabled"
            />
          </div>
          <div className="colorcard">
            <label> Cost</label>
            <input
              type="text"
              value={viewTintValues.tintCost}
              name="tintCost"
              disabled="disabled"
            />
          </div>
          <div className="button btn-popup">
            <button
              className="btn cancel"
              onClick={() => navigate("/tint/all")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ViewTint;
