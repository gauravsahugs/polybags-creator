import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import MandatoryFields from "../MandatoryFields";

const AddNewAdminQuotation = () => {
  const navigate = useNavigate();
  useDocumentTitle("Add New Tint");
  const [tintValues, setTintValues] = useState({
    nameOfTint: "",
    cost: "",
  });

  const onChange = (e) => {
    setTintValues({
      ...tintValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddColor = (e) => {
    e.preventDefault();
    // setInputError(validate(clientFormData));
    const TintObject = {
      name: tintValues.nameOfTint,
      cost: tintValues.cost,
    };

    axios
      .post(`${BACKEND_URL}/tint/create`, TintObject)
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
    setTintValues({
      nameOfTint: "",
      cost: "",
    });
    navigate("/tint");
  };

  return (
    <div>
      <div className="header">Add New Quotation</div>
      <MandatoryFields />
      <form>
        <div className="colorcard">
          <label>
            Name <sup>*</sup>
          </label>
          <input
            type="text"
            value={tintValues.nameOfTint}
            name="nameOfTint"
            onChange={onChange}
            placeholder="Name of Tint"
          />
        </div>
        <div className="colorcard">
          <label>
            {" "}
            Cost <sup>*</sup>
          </label>
          <input
            type="text"
            value={tintValues.cost}
            name="cost"
            onChange={onChange}
            placeholder="2345.6"
          />
        </div>

        <div className="button ">
          <button
            className="btn cancel"
            onClick={() => navigate("/adminQuotation")}
          >
            Cancel
          </button>

          <button className="btn add" onClick={handleAddColor}>
            Add Tint
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddNewAdminQuotation;
