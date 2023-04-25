import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../config";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import MandatoryFields from "../MandatoryFields";

const EditTint = ({ id }) => {
  const [editTintValues, setEditTintValues] = useState({
    nameOfTint: "",
    tintCost: "",
  });
  const onChange = (e) => {
    setEditTintValues({
      ...editTintValues,
      [e.target.name]: e.target.value,
    });
  };
  useDocumentTitle("Edit Tint");
  const navigate = useNavigate();

  const handleUpdateTint = (e) => {
    e.preventDefault();
    const TintUpdateObject = {
      name: editTintValues.nameOfTint,
      cost: editTintValues.tintCost,
    };
    axios
      .post(`${BACKEND_URL}/tint/update/${id}`, TintUpdateObject)
      .then((res) => {
        toast.dark(res.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const timer = () => {
          setTimeout(() => {
            navigate(0);
          }, 2100);
        };
        timer();
        clearTimeout(timer);
      })
      .catch((error) => {
        if (error.message) {
          toast.error(error.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });

    setEditTintValues({
      nameOfTint: "",
      tintCost: "",
    });
  };

  useEffect(() => {
    const loadTintDataInInputField = async () => {
      const result = await axios.get(`${BACKEND_URL}/tint/${id}`);
      setEditTintValues({
        nameOfTint: result.data.name,
        tintCost: result.data.cost,
      });
    };
    loadTintDataInInputField();
  }, [id]);

  return (
    <>
      <div className="header">Edit Tint</div>
      <MandatoryFields />
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>
              Name of Tint<sup>*</sup>
            </label>
            <input
              type="text"
              value={editTintValues.nameOfTint}
              name="nameOfTint"
              onChange={onChange}
              placeholder="Name of Tint"
              required="true"
            />
          </div>
          <div className="colorcard">
            <label>
              Cost<sup>*</sup>
            </label>
            <input
              type="text"
              value={editTintValues.tintCost}
              name="tintCost"
              onChange={onChange}
              placeholder="Tint Cost"
              required
            />
          </div>

          <div className="button btn-popup">
            <button
              className="btn cancel"
              onClick={() => navigate("/tint/all")}
            >
              Back
            </button>
            <button className="btn add" onClick={handleUpdateTint}>
              Update Tint
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditTint;
