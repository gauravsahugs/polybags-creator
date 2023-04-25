import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const ViewStrios = ({ id }) => {
  const [editStriosData, setEditStriosData] = useState({
    striosName: "",
    striosCost: "",
    striosDescription: "",
  });
  useDocumentTitle("View Strios");

  const navigate = useNavigate();

  const loadStriosDataInInputField = async () => {
    const result = await axios.get(`${BACKEND_URL}/strio/${id}`);
    setEditStriosData({
      striosName: result.data.name,
      striosCost: result.data.cost,
      striosDescription: result.data.description,
    });
  };
  useEffect(() => {
    loadStriosDataInInputField();
  }, []);
  return (
    <>
      <div className="header">View Strios</div>
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>Strios Name</label>
            <input
              type="text"
              name="striosName"
              value={editStriosData.striosName}
              placeholder="Strios Name"
              disabled="disabled"
            />
          </div>
          <div className="colorcard">
            <label>Strios Cost </label>
            <input
              type="number"
              name="striosCost"
              value={editStriosData.striosCost}
              placeholder="Strios Amount "
              disabled="disabled"
            />
          </div>
          {/* <div className="colorcard">
            <label>Strios Description</label>
            <input
              type="text"
              name="striosDescription"
              value={editStriosData.striosDescription}
              placeholder="Strios Description"
              disabled="disabled"
            />
          </div> */}
          <div className="button btn-popup">
            <button
              className="btn cancel"
              onClick={() => navigate("/strios/all")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ViewStrios;
