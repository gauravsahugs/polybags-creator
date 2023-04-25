import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../config";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import MandatoryFields from "../MandatoryFields";

const EditStrios = ({ id }) => {
  const [editStriosValues, setEditStriosValues] = useState({
    nameOfStrio: "",
    strioCost: "",
    strioDescription: "",
  });
  const onChange = (e) => {
    setEditStriosValues({
      ...editStriosValues,
      [e.target.name]: e.target.value,
    });
  };
  useDocumentTitle("Edit Strio");
  const navigate = useNavigate();

  const handleUpdateStrio = (e) => {
    e.preventDefault();
    const StrioUpdateObject = {
      name: editStriosValues.nameOfStrio,
      cost: editStriosValues.strioCost,
      description: editStriosValues.strioDescription,
    };
    axios
      .post(`${BACKEND_URL}/strio/update/${id}`, StrioUpdateObject)
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

    setEditStriosValues({
      nameOfStrio: "",
      strioCost: "",
      strioDescription: "",
    });
  };

  useEffect(() => {
    const loadTintDataInInputField = async () => {
      const result = await axios.get(`${BACKEND_URL}/strio/${id}`);
      setEditStriosValues({
        nameOfStrio: result.data.name,
        strioCost: result.data.cost,
        strioDescription: result.data.description,
      });
    };
    loadTintDataInInputField();
  }, [id]);

  return (
    <>
      <div className="header">Edit Strio</div>
      <MandatoryFields />
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>
              Name of Strio<sup>*</sup>
            </label>
            <input
              type="text"
              value={editStriosValues.nameOfStrio}
              name="nameOfStrio"
              onChange={onChange}
              placeholder="Name of Strio"
            />
          </div>
          <div className="colorcard">
            <label>
              {" "}
              Cost<sup>*</sup>
            </label>
            <input
              type="text"
              value={editStriosValues.strioCost}
              name="strioCost"
              onChange={onChange}
              placeholder="Strio Cost"
            />
          </div>
          {/* <div className="colorcard">
            <label>Strios Description</label>
            <input
              type="text"
              value={editStriosValues.strioDescription}
              name="strioDescription"
              onChange={onChange}
              placeholder="Strio Description"
            />
          </div> */}

          <div className="button btn-popup">
            <button
              className="btn cancel"
              onClick={() => navigate("/strios/all")}
            >
              Back
            </button>
            <button className="btn add" onClick={handleUpdateStrio}>
              Update Strio
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditStrios;
