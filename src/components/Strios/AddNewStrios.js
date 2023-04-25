import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import MandatoryFields from "../MandatoryFields";
import striosSchema from "../../validation/striosSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const AddNewStrios = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(striosSchema),
  });
  const navigate = useNavigate();
  useDocumentTitle("Add Strios");

  const strioHandleSubmit = (data) => {
    axios
      .post(`${BACKEND_URL}/strio/create`, data)
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
      <div className="header">Add New Strios</div>
      <MandatoryFields />
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>
              Strios Name
              <sup>*</sup>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Strios Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="form__errors">{errors.name.message}</p>
            )}
          </div>
          <div className="colorcard">
            <label>
              Strios Cost <sup>*</sup>
            </label>
            <input
              type="number"
              name="cost"
              placeholder="Strios Cost"
              {...register("cost", { required: true })}
            />
            {errors.cost && (
              <p className="form__errors">{errors.cost.message}</p>
            )}
          </div>
          {/* <div className="colorcard">
            <label>
              Strios Description <sup>*</sup>
            </label>
            <input
              type="text"
              name="description"
              placeholder="Strios Description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="form__errors">{errors.description.message}</p>
            )}
          </div> */}
          <div className="button btn-popup">
            <button className="btn cancel">Cancel</button>
            <button
              className="btn add"
              onClick={handleSubmit(strioHandleSubmit)}
            >
              Add Strios
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddNewStrios;
