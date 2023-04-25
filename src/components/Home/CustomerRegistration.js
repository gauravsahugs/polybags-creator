import React, { useContext, useEffect } from "react";
import ClientContext from "../../context/ClientContext";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import useDocumentTitle from "../../hooks/useDocumentTitle";

function CustomerRegistration({
  quoteId,
  quotationFormData,
  setQuotationFormData,
}) {
  const { allClientsData } = useContext(ClientContext);
  useDocumentTitle("Customer Registration");
  const {
    productName,
    clientFirstName,
    clientMiddleName,
    clientLastName,
    client,
    clientEmail,
    clientGST,
    clientPhoneNumber,
    clientPinCode,
    clientState,
    clientCity,
    clientCountry,
    clientFirstAddress,
    clientSecondAddress,
    clientCompanyName,
  } = quotationFormData;

  const loadClientDataInInputField = async () => {
    const result = await axios.get(`${BACKEND_URL}/clients/${client}`);
    setQuotationFormData((loadingQuotationFormData) => ({
      ...loadingQuotationFormData,
      clientFirstName: result.data.client.firstName,
      clientMiddleName: result.data.client.middleName,
      clientLastName: result.data.client.lastName,
      clientPinCode: result.data.client.pincode,
      clientPhoneNumber: result.data.client.phone,
      clientCity: result.data.client.city,
      clientEmail: result.data.client.email,
      clientState: result.data.client.state,
      clientCountry: result.data.client.country,
      clientGST: result.data.client.gstin,
      clientFirstAddress: result.data.client.address1,
      clientSecondAddress: result.data.client.address2,
      clientCompanyName: result.data.client.company,
    }));
  };
  const clientIDChangeHandler = (e) => {
    const getClientID = allClientsData.find(
      (client) => client.id == e.target.value
    ).id;

    setQuotationFormData({
      ...quotationFormData,
      client: getClientID,
    });
  };
  useEffect(() => {
    if (client) {
      loadClientDataInInputField();
    }
  }, [client]);
  return (
    <div className="container">
      <div className="container-customer">
        <div className="container2">
          <form>
            <div className="profile-head">Tell us what you need</div>
            <div className="">
              <div className="input-field">
                <label>
                  Product Name<sup>*</sup>
                </label>
                <input
                  className="textfield-product"
                  name="productName"
                  value={productName}
                  onChange={(e) => {
                    setQuotationFormData({
                      ...quotationFormData,
                      productName: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="profile-head">Quotation Receipents</div>
              <div className="input-field">
                <label>
                  Customer Name<sup>*</sup>
                </label>
                <div className="dropdown-wrapper">
                  <select
                    className="textfield-pr"
                    name="client"
                    value={client}
                    onChange={clientIDChangeHandler}
                  >
                    <option value="" selected disabled>
                      {!quoteId ? "----- Select -----" : client}
                    </option>
                    {allClientsData.map((eachClient) => (
                      <option
                        key={eachClient.id}
                        custID={eachClient.id}
                        value={eachClient.id}
                      >
                        {eachClient.firstName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="profile-info">Profile Information</div>
            <div className="input-field-row1">
              <div className="input-field">
                <label>
                  First Name<sup>*</sup>
                </label>
                <input
                  className="textfield-row1"
                  type="text"
                  disabled
                  placeholder="First Name"
                  name="clientFirstName"
                  value={clientFirstName}
                />
              </div>
              <div className="input-field">
                <label>
                  Middle Name<sup>*</sup>
                </label>
                <input
                  className="textfield-row1"
                  type="text"
                  disabled
                  placeholder="Middle Name"
                  value={clientMiddleName}
                />
              </div>
              <div className="input-field">
                <label>
                  Last Name<sup>*</sup>
                </label>
                <input
                  className="textfield-row1"
                  type="text"
                  disabled
                  placeholder="Last Name"
                  value={clientLastName}
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
                  disabled
                  placeholder="example@gmail.com"
                  value={clientEmail}
                />
              </div>
              <div className="input-field phone">
                <label>
                  Phone Number<sup>*</sup>
                </label>
                <div className="textfield2 phone-input-field phonif">
                  <p className="country-code" disabled>
                    +91
                  </p>
                  <input
                    className="phone-input"
                    type="text"
                    name="phoneNumber"
                    disabled
                    value={clientPhoneNumber}
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
                  disabled
                  placeholder="Company Name"
                  value={clientCompanyName}
                />
              </div>
              <div className="input-field">
                <label>
                  GST No.<sup>*</sup>
                </label>
                <input
                  className="textfield2"
                  type="text"
                  disabled
                  placeholder="GST Number"
                  value={clientGST}
                />
              </div>
            </div>
            <div className="heading Address">Address</div>
            <div className="input-field-row2">
              <div className="input-field">
                <label>
                  Address 1.<sup>*</sup>
                </label>
                <input
                  className="textfield-row1"
                  type="text"
                  disabled
                  placeholder="First Address"
                  value={clientFirstAddress}
                />
              </div>
              <div className="input-field">
                <label>
                  Address 2.<sup>*</sup>
                </label>
                <input
                  className="textfield-row1"
                  type="text"
                  disabled
                  placeholder="Second Address"
                  value={clientSecondAddress}
                />
              </div>
              <div className="input-field">
                <label>
                  Pincode<sup>*</sup>
                </label>
                <input
                  className="textfield-row1"
                  type="number"
                  disabled
                  placeholder="Pincode"
                  value={clientPinCode}
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
                  value={clientCity}
                  placeholder="City"
                  disabled
                />
              </div>
              <div className="input-field">
                <label>
                  State<sup>*</sup>
                </label>
                <input
                  className="textfield-row1"
                  type="text"
                  disabled
                  placeholder="State"
                  value={clientState}
                />
              </div>
              <div className="input-field">
                <label>
                  Country<sup>*</sup>
                </label>
                <input
                  className="textfield-row1"
                  type="text"
                  disabled
                  placeholder="Country"
                  value={clientCountry}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerRegistration;
