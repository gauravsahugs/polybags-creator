import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const ViewBagShape = ({ id }) => {
  const [viewBagValues, setViewBagValues] = useState({
    nameOfBag: "",
    bagCost: "",
    bagShape: "",
  });
  useDocumentTitle("View Bag Shape");
  const navigate = useNavigate();

  useEffect(() => {
    const loadTintDataInInputField = async () => {
      const result = await axios.get(`${BACKEND_URL}/bag/${id}`);
      setViewBagValues({
        bagCost: result.data.cost,
        nameOfBag: result.data.name,
        bagShape: result.data.shape,
      });
    };

    loadTintDataInInputField();
  }, [id]);

  return (
    <>
      <div className="header">Bag Shape Information</div>
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>Name of Bag Shape</label>
            <input
              type="text"
              value={viewBagValues.nameOfBag}
              name="nameOfTint"
              disabled="disabled"
            />
          </div>
          <div className="colorcard">
            <label>Bag Shape</label>
            <input
              type="text"
              value={viewBagValues.bagShape}
              name="bagShape"
              disabled="disabled"
            />
          </div>
          <div className="colorcard">
            <label>Cost</label>
            <input
              type="text"
              value={viewBagValues.bagCost}
              name="tintCost"
              disabled="disabled"
            />
          </div>
          <div className="button btn-popup">
            <button
              className="btn cancel"
              onClick={() => navigate("/bagshape/all")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ViewBagShape;
