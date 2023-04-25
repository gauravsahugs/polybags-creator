import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const ViewClient = ({ id, modalMargin }) => {
  const [editClientFormData, setEditClientFormData] = useState({
    firstName: "",
    phoneNumber: "",
    firstAddress: "",
    pinCode: "",
    city: "",
    state: "",
    company: "",
    country: "",
    modifiedBy: 1,
    gstNo: "",
    middleName: "",
    lastName: "",
    email: "",
    address2: "",
  });
  const navigate = useNavigate();
  useDocumentTitle("View Client");

  useEffect(() => {
    const loadPrintingDataInInputField = async () => {
      const result = await axios.get(`${BACKEND_URL}/clients/${id}`);
      setEditClientFormData({
        firstName: result.data.client.firstName,
        middleName: result.data.client.middleName,
        lastName: result.data.client.lastName,
        phoneNumber: result.data.client.phone,
        address1: result.data.client.address1,
        address2: result.data.client.address2,
        pinCode: result.data.client.pincode,
        city: result.data.client.city,
        state: result.data.client.state,
        country: result.data.client.country,
        company: result.data.client.company,
        gstNo: result.data.client.gstin,
        email: result.data.client.email,
      });
    };
    loadPrintingDataInInputField();
  }, [id]);
  return (
    <div className="container">
      <div className="header">View Customer</div>
      <div
        className={
          !modalMargin ? "container-cust" : "container-cust cctopmargin"
        }
      >
        <form>
          <div className="profile-info">Profile Information</div>

          <div className="input-field-row1">
            <div className="input-field">
              <label>First Name</label>
              <input
                className="textfield-row1"
                type="text"
                name="firstName"
                value={editClientFormData.firstName}
                disabled="disabled"
              />
            </div>
            <div className="input-field">
              <label>Middle Name</label>
              <input
                // key={clientFormData.id}
                className="textfield-row1"
                type="text"
                name="middleName"
                value={editClientFormData.middleName}
                placeholder="Middle Name"
                disabled="disabled"
              />
            </div>
            <div className="input-field">
              {" "}
              <label>Last Name</label>
              <input
                className="textfield-row1"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={editClientFormData.lastName}
                disabled="disabled"
              />
            </div>
          </div>
          <div className="input-field-row2">
            <div className="input-field">
              <label>Email</label>
              <input
                className="textfield2"
                type="text"
                placeholder="example@gmail.com"
                name="email"
                value={editClientFormData.email}
                disabled="disabled"
              />
            </div>
            <div className="input-field phone">
              <label>Phone Number</label>
              <div className="textfield2 phone-input-field phonif">
                <p className="country-code" disabled="disabled">
                  +91
                </p>
                <input
                  className="phone-input"
                  type="text"
                  name="phoneNumber"
                  value={editClientFormData.phoneNumber}
                  placeholder="Phone Number"
                  disabled="disabled"
                />
              </div>
            </div>
          </div>
          <div className="input-field-row2">
            <div className="input-field">
              <label>Company Name</label>
              <input
                className="textfield2"
                type="text"
                value={editClientFormData.company}
                name="company"
                disabled="disabled"
              />
            </div>
            <div className="input-field">
              <label>GST No.</label>
              <input
                className="textfield2"
                type="text"
                name="gstNo"
                value={editClientFormData.gstNo}
                placeholder="GST No"
                disabled="disabled"
              />
            </div>
          </div>
          <div className="heading Address">Address</div>
          <div className="input-field-row1">
            <div className="input-field">
              <label>Address 1</label>
              <input
                className="textfield-row1"
                type="text"
                value={editClientFormData.address1}
                name="address1"
                disabled="disabled"
              />
            </div>
            <div className="input-field">
              <label>Address 2</label>
              <input
                className="textfield-row1"
                type="text"
                name="address2"
                value={editClientFormData.address2}
                disabled="disabled"
              />
            </div>
            <div className="input-field">
              <label>Pin Code</label>{" "}
              <input
                className="textfield-row1"
                type="number"
                name="pinCode"
                value={editClientFormData.pinCode}
                placeholder="500001"
                disabled="disabled"
              />
            </div>
          </div>
          <div className="input-field-row1">
            <div className="input-field">
              <label>City</label>
              <input
                className="textfield-row1"
                type="text"
                value={editClientFormData.city}
                name="city"
                placeholder="Hyderabad"
                disabled="disabled"
              />
            </div>
            <div className="input-field">
              <label>State</label>
              <input
                className="textfield-row1"
                type="text"
                value={editClientFormData.state}
                name="state"
                placeholder="Telangana"
                disabled="disabled"
              />
            </div>
            <div className="input-field">
              <label>Country</label>
              <input
                className="textfield-row1"
                type="text"
                value={editClientFormData.country}
                name="country"
                placeholder="India"
                disabled="disabled"
              />
            </div>
          </div>
          <div className="button btn-client">
            <button
              className="btn cancel"
              onClick={() => navigate("/client/all")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewClient;
