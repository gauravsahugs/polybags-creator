import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const EditClient = ({ id, modalMargin }) => {
  const [editClientFormData, setEditClientFormData] = useState({
    firstName: "",
    phoneNumber: "",
    address1: "",
    pinCode: "",
    city: "",
    state: "",
    company: "",
    country: "",
    modifiedBy: 1,
    middleName: "",
    lastName: "",
    email: "",
    gstNo: "",
    address2: "",
  });
  const navigate = useNavigate();
  useDocumentTitle("Edit Client");

  const handleAddClient = (e) => {
    e.preventDefault();
    const ClientObject = {
      firstName: editClientFormData.firstName,
      middleName: editClientFormData.middleName,
      lastName: editClientFormData.lastName,
      phone: editClientFormData.phoneNumber,
      address1: editClientFormData.address1,
      address2: editClientFormData.address2,
      pincode: editClientFormData.pinCode,
      city: editClientFormData.city,
      state: editClientFormData.state,
      company: editClientFormData.company,
      country: editClientFormData.country,
      gstin: editClientFormData.gstNo,
      modifiedBy: editClientFormData.modifiedBy,
      email: editClientFormData.email,
    };

    axios
      .post(`${BACKEND_URL}/clients/update/${id}`, ClientObject)
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
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setEditClientFormData({ ...editClientFormData, [name]: value });
  };

  useEffect(() => {
    const loadClientDataInInputField = async () => {
      const result = await axios.get(`${BACKEND_URL}/clients/${id}`);
      setEditClientFormData({
        firstName: result.data.client.firstName,
        middleName: result.data.client.middleName,
        lastName: result.data.client.lastName,
        phoneNumber: result.data.client.phone,
        address1: result.data.client.address1,
        address2: result.data.client.address2,
        company: result.data.client.company,
        email: result.data.client.email,
        pinCode: result.data.client.pincode,
        city: result.data.client.city,
        state: result.data.client.state,
        country: result.data.client.country,
        gstNo: result.data.client.gstin,
        modifiedBy: result.data.client.modifiedBy,
      });
    };

    loadClientDataInInputField();
  }, [id]);
  return (
    <div className="container">
      <div className="header">Edit Customer</div>
      <div
        className={
          !modalMargin ? "container-cust" : "container-cust cctopmargin"
        }
      >
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
                value={editClientFormData.firstName}
                onChange={onChange}
              />
            </div>
            <div className="input-field">
              <label>
                Middle Name<sup></sup>
              </label>
              <input
                // key={clientFormData.id}
                className="textfield-row1"
                type="text"
                placeholder="Middle Name"
                name="middleName"
                value={editClientFormData.middleName}
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
                value={editClientFormData.lastName}
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
                type="text"
                placeholder="abc@gmail.com"
                name="email"
                value={editClientFormData.email}
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
                  maxlength="10"
                  name="phoneNumber"
                  value={editClientFormData.phoneNumber}
                  onChange={onChange}
                  placeholder="9876543210"
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
                value={editClientFormData.company}
                name="company"
                onChange={onChange}
              />
            </div>
            <div className="input-field">
              <label>
                GST No.<sup>*</sup>
              </label>
              <input
                className="textfield2"
                type="text"
                maxlength="15"
                name="gstNo"
                value={editClientFormData.gstNo}
                onChange={onChange}
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
                value={editClientFormData.address1}
                name="address1"
                onChange={onChange}
              />
            </div>
            <div className="input-field">
              <label>
                Address 2<sup></sup>
              </label>
              <input
                className="textfield-row1"
                type="text"
                name="address2"
                value={editClientFormData.address2}
                onChange={onChange}
              />
            </div>
            <div className="input-field">
              <label>
                Pin Code<sup>*</sup>
              </label>{" "}
              <input
                className="textfield-row1"
                type="number"
                maxlength="6"
                name="pinCode"
                value={editClientFormData.pinCode}
                onChange={onChange}
                placeholder="500001"
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
                value={editClientFormData.city}
                name="city"
                onChange={onChange}
                placeholder="Hyderabad"
              />
            </div>
            <div className="input-field">
              <label>
                State<sup>*</sup>
              </label>
              <input
                className="textfield-row1"
                type="text"
                value={editClientFormData.state}
                name="state"
                onChange={onChange}
                placeholder="Telangana"
              />
            </div>
            <div className="input-field-row1">
              <div className="input-field">
                <label>
                  Country<sup>*</sup>
                </label>
                <input
                  className="textfield-row1"
                  type="text"
                  value={editClientFormData.country}
                  name="country"
                  onChange={onChange}
                  placeholder="Telangana"
                />
              </div>
            </div>
          </div>
          <div className="button btn-client">
            <button className="btn cancel">Back</button>
            <button className="btn add" onClick={handleAddClient}>
              Update Customer
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditClient;
