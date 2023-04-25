import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MandatoryFields from "../MandatoryFields";
import discountSchema from "../../validation/discountSchema";

function AddNewDiscount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(discountSchema),
  });

  const navigate = useNavigate();
  useDocumentTitle("Add Discount");

  const discountHandleSubmit = (data) => {
    axios
      .post(`${BACKEND_URL}/discount/create`, data)
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
      <div className="header">Add New Discount</div>
      <MandatoryFields />
      <div className="modal-container">
        <form>
          {/*--------------------- Discount Name ---------------------*/}
          <div className="colorcard">
            <label>
              Discount Name <sup>*</sup>
            </label>
            <input
              type="text"
              placeholder="Discount Name"
              name="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="form__errors">{errors.name.message}</p>
            )}
          </div>

          {/*--------------------- Discount Amount ---------------------*/}
          <div className="colorcard">
            <label>
              Discount Amount (in percentage) <sup>*</sup>
            </label>
            <input
              type="number"
              name="percentage"
              placeholder="Discount Amount (in percentage)"
              {...register("percentage", {
                required: true,
                maxLength: 2,
              })}
            />

            {errors.percentage && (
              <p className="form__errors">{errors.percentage.message}</p>
            )}
          </div>

          {/*--------------------- Buttons ---------------------*/}
          <div className="button btn-popup">
            <button
              className="btn cancel"
              onClick={() => navigate("/discount/all")}
            >
              Cancel
            </button>
            <button
              className="btn add"
              onClick={handleSubmit(discountHandleSubmit)}
            >
              Add Discount
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddNewDiscount;
