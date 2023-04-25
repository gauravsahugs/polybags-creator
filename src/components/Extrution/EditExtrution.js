import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import ExtrusionContext from "../../context/ExtrusionContext";
import MandatoryFields from "../MandatoryFields";

const EditExtrution = ({ id }) => {
  const navigate = useNavigate();
  useDocumentTitle("Edit Extrution ");
  /*------------- Extrusion Context from Context Api ---------------------*/
  const {
    loadExtrutionDataInInputField,
    extrutionData,
    setExtrutionData,
    updateExtrution,
  } = useContext(ExtrusionContext);
  /*------------- Extrusion Context from Context Api ---------------------*/

  const onChange = (e) => {
    setExtrutionData(e.target.value);
  };

  useEffect(() => {
    loadExtrutionDataInInputField(id);
  }, [id]);
  return (
    <>
      <div className="header">Edit Extrution </div>
      <MandatoryFields />
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>Extrution Cost </label>
            <input
              type="number"
              name="cost"
              value={extrutionData}
              onChange={onChange}
            />
          </div>
          <div className="button btn-popup">
            <button
              className="btn cancel"
              onClick={() => navigate("/extrution/all")}
            >
              Back
            </button>
            <button className="btn add" onClick={(e) => updateExtrution(e, id)}>
              Update Extrution
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditExtrution;
