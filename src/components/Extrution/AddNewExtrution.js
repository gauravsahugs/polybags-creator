import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import MandatoryFields from "../MandatoryFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import extrusionSchema from "../../validation/extrusionSchema";

function AddNewExtrution() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(extrusionSchema),
  });

  const navigate = useNavigate();
  useDocumentTitle("Add New Tint");

  const extrutionHandleSubmit = (data) => {
    axios
      .post(`${BACKEND_URL}/extrusion/create`, data)
      .then((res) => {
        toast.dark(res.data.message, {
          position: "top-center",
          autoClose: 1500,
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
            autoClose: 1500,
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
      <div className="header">Add New Extrution</div>
      <MandatoryFields />
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>
              Extrution Cost
              <sup>*</sup>
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
              onClick={() => navigate("/extrution/all")}
            >
              Cancel
            </button>
            <button
              className="btn add"
              onClick={handleSubmit(extrutionHandleSubmit)}
            >
              Add Extrution
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddNewExtrution;
