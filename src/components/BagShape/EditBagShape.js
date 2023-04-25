import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../config";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import MandatoryFields from "../MandatoryFields";

const EditBagShape = ({ id }) => {
  const [editBagValues, setEditBagValues] = useState({
    nameOfBag: "",
    bagCost: "",
    bagShape: "",
  });
  const onChange = (e) => {
    setEditBagValues({
      ...editBagValues,
      [e.target.name]: e.target.value,
    });
  };
  useDocumentTitle("Edit Bag Shape");
  const navigate = useNavigate();

  const handleUpdateBag = (e) => {
    e.preventDefault();
    const BagUpdateObject = {
      name: editBagValues.nameOfBag,
      cost: editBagValues.bagCost,
      shape: editBagValues.bagShape,
    };
    axios
      .post(`${BACKEND_URL}/bag/update/${id}`, BagUpdateObject)
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

    setEditBagValues({
      nameOfBag: "",
      bagCost: "",
      bagShape: "",
    });
  };
  useEffect(() => {
    const loadBagDataInInputField = async () => {
      const result = await axios.get(`${BACKEND_URL}/bag/${id}`);
      setEditBagValues({
        nameOfBag: result.data.name,
        bagCost: result.data.cost,
        bagShape: result.data.shape,
      });
    };
    loadBagDataInInputField();
  }, [id]);

  return (
    <>
      <div className="header">Edit Bag Shape</div>
      <MandatoryFields />
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>
              Name of Bag<sup>*</sup>
            </label>
            <input
              type="text"
              value={editBagValues.nameOfBag}
              name="nameOfBag"
              onChange={onChange}
              placeholder="Name of Bag Shape"
              required
            />
          </div>
          <div className="colorcard">
            <label>
              Bag Shape<sup>*</sup>
            </label>
            <input
              type="text"
              value={editBagValues.bagShape}
              name="bagShape"
              onChange={onChange}
              placeholder="Shape"
              required
            />
          </div>
          <div className="colorcard">
            <label>
              {" "}
              Cost<sup>*</sup>
            </label>
            <input
              type="text"
              value={editBagValues.bagCost}
              name="bagCost"
              onChange={onChange}
              placeholder="Cost"
              required
            />
          </div>

          <div className="button btn-popup">
            <button
              className="btn cancel"
              onClick={() => navigate("/bagshape/all")}
            >
              Back
            </button>
            <button className="btn add" onClick={handleUpdateBag}>
              Update Bag Shape
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditBagShape;
