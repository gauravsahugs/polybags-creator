import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../config";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import MandatoryFields from "../MandatoryFields";

const EditPrinting = ({ id }) => {
  const [editColorValues, setEditColorValues] = useState({
    nameOfColor: "",
    numberOfColor: "",
    costDescription: "",
    totalCostOfColor: "",
  });

  const navigate = useNavigate();
  useDocumentTitle("Edit Printing");

  const onChange = (e) => {
    setEditColorValues({
      ...editColorValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePrinting = (e) => {
    e.preventDefault();
    const ColorObject = {
      name: editColorValues.nameOfColor,
      description: editColorValues.costDescription,
      cost: editColorValues.totalCostOfColor,
      no_of_colors: editColorValues.numberOfColor,
    };
    axios
      .post(`${BACKEND_URL}/printing/update/${id}`, ColorObject)
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

    setEditColorValues({
      nameOfColor: "",
      numberOfColor: "",
      costDescription: "",
      totalCostOfColor: "",
    });
  };

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
      <div className="header">Edit Printing</div>
      <MandatoryFields />
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>
              Name of the Color<sup>*</sup>
            </label>
            <input
              type="text"
              value={editColorValues.nameOfColor}
              name="nameOfColor"
              onChange={onChange}
              placeholder="Name of the Color"
            />
          </div>
          <div className="colorcard">
            <label>
              Number of Color<sup>*</sup>
            </label>
            <input
              type="text"
              value={editColorValues.numberOfColor}
              name="numberOfColor"
              onChange={onChange}
              placeholder="Number of Color"
            />
          </div>
          {/* <div className="colorcard">
            <label>Cost Description</label>
            <input
              type="text"
              value={editColorValues.costDescription}
              name="costDescription"
              onChange={onChange}
              placeholder="Cost Description"
            />
          </div> */}
          <div className="colorcard">
            <label>
              Total cost of the Color/kg<sup>*</sup>
            </label>
            <input
              type="text"
              value={editColorValues.totalCostOfColor}
              name="totalCostOfColor"
              onChange={onChange}
              placeholder="Color Cost"
            />
          </div>
          <div className="button btn-popup">
            <button
              className="btn cancel"
              onClick={() => navigate("/printing/all")}
            >
              Back
            </button>
            <button className="btn add" onClick={handleUpdatePrinting}>
              Update Color
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditPrinting;
