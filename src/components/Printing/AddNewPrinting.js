import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import MandatoryFields from "../MandatoryFields";
import printingSchema from "../../validation/printingSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function AddNewColor() {
  useDocumentTitle("Add New Printing");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(printingSchema),
  });

  const navigate = useNavigate();

  const printingHandleSubmit = (data) => {
    console.table(`🚀 ~> printingHandleSubmit ~> data`, data);
    axios
      .post(`${BACKEND_URL}/printing/create`, data)
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
      <div className="header">Add New Color</div>
      <MandatoryFields />
      <div className="modal-container">
        <form>
          <div className="colorcard">
            <label>
              Name of the Color
              <sup>*</sup>
            </label>
            <input
              type="text"
              name="nameOfColor"
              placeholder="Name of the Color"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="form__errors">{errors.name.message}</p>
            )}
          </div>
          <div className="colorcard">
            <label>
              Number of Color <sup>*</sup>
            </label>
            <input
              type="number"
              name="no_of_colors"
              placeholder="Number of Color"
              {...register("no_of_colors", { required: true })}
            />
            {errors.no_of_colors && (
              <p className="form__errors">{errors.no_of_colors.message}</p>
            )}
          </div>
          {/* <div className="colorcard">
            <label>
              Cost Description <sup>*</sup>
            </label>
            <input
              type="text"
              name="description"
              placeholder="Cost Description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="form__errors">{errors.description.message}</p>
            )}
          </div> */}
          <div className="colorcard">
            <label>
              Total Cost of the Color / Kg
              <sup>*</sup>
            </label>
            <input
              type="number"
              name="cost"
              placeholder="Total Cost of the Color / Kg"
              {...register("cost", { required: true })}
            />
            {errors.cost && (
              <p className="form__errors">{errors.cost.message}</p>
            )}
          </div>
          <div className="button btn-popup">
            <button
              className="btn cancel"
              onCLick={() => navigate("/printing/all")}
            >
              Cancel
            </button>
            <button
              className="btn add"
              onClick={handleSubmit(printingHandleSubmit)}
            >
              Add Color
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddNewColor;
