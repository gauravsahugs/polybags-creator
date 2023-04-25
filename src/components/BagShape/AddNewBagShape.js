import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import MandatoryFields from "../MandatoryFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import bagSchema from "../../validation/bagSchema";

function AddNewBagShape() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(bagSchema),
  });

  const navigate = useNavigate();
  useDocumentTitle("Add New Bag Shape");

  const bagHandleSubmit = (data) => {
    axios
      .post(`${BACKEND_URL}/bag/create`, data)
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
    reset();
  };

  return (
    <>
      <div className="header">Add New Bag Shape</div>
      <MandatoryFields />
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>
              Name of Bag Shape<sup>*</sup>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name of Bag Shape"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="form__errors">{errors.name.message}</p>
            )}
          </div>
          <div className="colorcard">
            <label>
              Shape<sup>*</sup>
            </label>
            <input
              type="text"
              name="shape"
              placeholder="Shape"
              {...register("shape", { required: true })}
            />
            {errors.shape && (
              <p className="form__errors">{errors.shape.message}</p>
            )}
          </div>
          <div className="colorcard">
            <label>
              Cost<sup>*</sup>
            </label>
            <input
              type="number"
              name="cost"
              placeholder="Cost"
              {...register("cost", { required: true })}
            />
            {errors.cost && (
              <p className="form__errors">{errors.cost.message}</p>
            )}
          </div>
          <div className="button btn-popup">
            <button
              className="btn cancel"
              onClick={() => navigate("/bagshape/all")}
            >
              Cancel
            </button>

            <button className="btn add" onClick={handleSubmit(bagHandleSubmit)}>
              Add Bag Shape
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddNewBagShape;
