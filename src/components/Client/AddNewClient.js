import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../config";
import MandatoryFields from "../MandatoryFields";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";

function AddNewClient({ modalMargin }) {
  const [clientFormData, setClientFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    company: "",
    country: "",
    gstNo: "",
    modifiedBy: 1,
    email: "",
    address1: "",
    address2: "",
    pinCode: "",
    city: "",
    state: "",
  });

  const navigate = useNavigate();
  useDocumentTitle("Add Client");

  const onChange = (e) => {
    const { name, value } = e.target;
    setClientFormData({ ...clientFormData, [name]: value });
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    // setInputError(validate(clientFormData));
    const ClientObject = {
      firstName: clientFormData.firstName,
      middleName: clientFormData.middleName,
      lastName: clientFormData.lastName,
      phone: clientFormData.phoneNumber,
      address1: clientFormData.address1,
      address2: clientFormData.address2,
      pincode: clientFormData.pinCode,
      gstin: clientFormData.gstNo,
      city: clientFormData.city,
      state: clientFormData.state,
      company: clientFormData.company,
      country: clientFormData.country,
      email: clientFormData.email,
      modifiedBy: clientFormData.modifiedBy,
    };

    axios
      .post(`${BACKEND_URL}/clients/create`, ClientObject)
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
  };

  return (
    <div className="container">
      <div className="header">Add New Customer</div>
      <div
        className={
          modalMargin ? "container-cust" : "container-cust cctopmargin"
        }
      >
        <MandatoryFields />
        <form>
          <div className="profile-info">Profile Information</div>

          <div className="input-field-row1">
            <div className="input-field">
              <label>
                First Name<sup>*</sup>
              </label>
              <input
                className="textfield-row1"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={clientFormData.firstName}
                onChange={onChange}
              />
            </div>
            <div className="input-field">
              <label>
                Middle Name<sup></sup>
              </label>
              <input
                className="textfield-row1"
                type="text"
                placeholder="Middle Name"
                name="middleName"
                value={clientFormData.middleName}
                onChange={onChange}
              />
            </div>
            <div className="input-field">
              <label>
                Last Name<sup>*</sup>
              </label>
              <input
                className="textfield-row1"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={clientFormData.lastName}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="input-field-row2">
            <div className="input-field">
              <label>
                Email<sup>*</sup>
              </label>
              <input
                className="textfield2"
                type="email"
                placeholder="Email"
                name="email"
                value={clientFormData.email}
                onChange={onChange}
              />
            </div>
            <div className="input-field phone">
              <label>
                Phone Number<sup>*</sup>
              </label>
              <div className="textfield2 phone-input-field">
                <p className="country-code">+91</p>
                <input
                  className="phone-input"
                  type="text"
                  name="phoneNumber"
                  maxlength="10"
                  value={clientFormData.phoneNumber}
                  onChange={onChange}
                  placeholder="Phone Number"
                />
              </div>
            </div>
          </div>
          <div className="input-field-row2">
            <div className="input-field">
              <label>
                Company Name<sup>*</sup>
              </label>
              <input
                className="textfield2"
                type="text"
                onChange={onChange}
                value={clientFormData.company}
                name="company"
                placeholder="Company Name"
              />
            </div>
            <div className="input-field">
              <label>
                GST No.<sup>*</sup>
              </label>
              <input
                className="textfield2"
                type="text"
                name="gstNo"
                maxlength="15"
                value={clientFormData.gstNo}
                onChange={onChange}
                placeholder="GST No."
              />
            </div>
          </div>
          <div className="heading Address">Address</div>
          <div className="input-field-row1">
            <div className="input-field">
              <label>
                Address 1<sup>*</sup>
              </label>
              <input
                className="textfield-row1"
                type="text"
                value={clientFormData.address1}
                name="address1"
                onChange={onChange}
                placeholder="Address 1"
              />
            </div>
            <div className="input-field">
              <label>
                Address 2<sup></sup>
              </label>
              <input
                className="textfield-row1"
                type="text"
                value={clientFormData.address2}
                name="address2"
                onChange={onChange}
                placeholder="Address 2"
              />
            </div>
            <div className="input-field">
              <label>
                Pin Code<sup>*</sup>
              </label>
              <input
                className="textfield-row1"
                type="text"
                name="pinCode"
                maxlength="6"
                value={clientFormData.pinCode}
                onChange={onChange}
                placeholder="Pin Code"
              />
            </div>
          </div>
          <div className="input-field-row1">
            <div className="input-field">
              <label>
                City<sup>*</sup>
              </label>
              <input
                className="textfield-row1"
                type="text"
                value={clientFormData.city}
                name="city"
                onChange={onChange}
                placeholder="City"
              />
            </div>
            <div className="input-field">
              <label>
                State<sup>*</sup>
              </label>
              <input
                className="textfield-row1"
                type="text"
                value={clientFormData.state}
                name="state"
                onChange={onChange}
                placeholder="State"
              />
            </div>
            <div className="input-field">
              <label>
                Country<sup>*</sup>
              </label>
              <input
                className="textfield-row1"
                type="text"
                value={clientFormData.country}
                name="country"
                onChange={onChange}
                placeholder="Country"
              />
            </div>
          </div>
          <div className="button btn-client">
            <button
              className="btn cancel"
              onClick={() => {
                navigate("/home");
              }}
            >
              Cancel
            </button>
            <button className="btn add" onClick={handleAddClient}>
              Add Customer
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddNewClient;
