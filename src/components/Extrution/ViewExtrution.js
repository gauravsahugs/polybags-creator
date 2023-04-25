import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ExtrusionContext from "../../context/ExtrusionContext";

const ViewExtrution = ({ id }) => {
  const navigate = useNavigate();

  /*------------- Extrusion Context from Context Api ---------------------*/
  const { loadExtrutionDataInInputField, extrutionData } =
    useContext(ExtrusionContext);
  /*------------- Extrusion Context from Context Api ---------------------*/

  useEffect(() => {
    loadExtrutionDataInInputField(id);
  }, [id]);

  return (
    <>
      <div className="header">View Extrution </div>
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>Extrution Cost </label>
            <input
              type="number"
              name="cost"
              value={extrutionData}
              disabled="disabled"
            />
          </div>
          <div className="button btn-popup">
            <button
              className="btn cancel"
              onClick={() => navigate("/extrution/all")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ViewExtrution;
