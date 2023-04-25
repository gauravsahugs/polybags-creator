import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import { capitalizeCase } from "../capitalizeCase";

function ViewQuotation() {
  const { quoteId } = useParams();

  const [viewQuoteValues, setViewQuoteValues] = useState({
    noOfPieces: "",
    additionalPiecesNumbers: "",
    additionalPieces: "",
    totalNoOfPieces: "",

    widthOfMaterial: "",
    leftGuzzetOfMaterial: "",
    rightGuzzetOfMaterial: "",
    lengthOfMaterial: "",
    thicknessOfMaterial: "",
    weightOfMaterial: "",
    dimesions: "",

    bagInputValue: "",

    productName: "",
    client: "",
    clientName: "",
    clientPinCode: "",
    clientPhoneNumber: "",
    clientCity: "",
    clientState: "",
    clientCountry: "",
    clientFirstAddress: "",
    clientCompanyName: "",
    clientEmail: "",
    clientGST: "",

    estimatedQuantity: "",
    estimatedCostValue: "",
    grandTotalWithGST: "",
    costAfterDiscount: "",
    gst: "",

    filmID: "",
    costOfFilm: "",

    printID: "",
    costOfPrint: "",

    steriosID: "",
    costOfSterios: "",

    tintID: "",
    costOfTint: "",

    bagId: "",
    costOfBag: "",

    extrusionID: "",
    costOfExtrusion: "",

    discountID: "",
    discountPercentage: "",
  });

  useEffect(() => {
    const loadTintDataInInputField = async () => {
      const result = await axios.get(`${BACKEND_URL}/quote/${quoteId}`);
      console.log(result.data);

      const Name =
        capitalizeCase(result.data.firstName) +
        capitalizeCase(result.data.middleName) +
        capitalizeCase(result.data.lastName);

      const fullAddress =
        capitalizeCase(result.data.address1) +
        ", " +
        capitalizeCase(result.data.address2) +
        ", " +
        capitalizeCase(result.data.city) +
        ", " +
        capitalizeCase(result.data.state) +
        ", " +
        capitalizeCase(result.data.country) +
        ", Pincode " +
        result.data.pincode;

      setViewQuoteValues({
        noOfPieces: result.data.aprxCount,
        totalNoOfPieces: result.data.totalNoOfPieces,

        widthOfMaterial: result.data.width,
        leftGuzzetOfMaterial: result.data.leftGuzzet,
        rightGuzzetOfMaterial: result.data.rightGuzzet,
        lengthOfMaterial: result.data.length,
        thicknessOfMaterial: result.data.thickness,
        weightOfMaterial: result.data.estWeight,
        dimesions: result.data.dimesions,

        bagInputValue: result.data.bagMakingCost,

        productName: capitalizeCase(result.data.productName),
        clientName: Name,
        fullAddress: fullAddress,
        clientPinCode: result.data.pincode,
        clientPhoneNumber: result.data.phone,
        clientCity: result.data.city,
        clientState: result.data.state,
        clientCountry: result.data.country,
        clientFirstAddress: result.data.address1,
        clientCompanyName: result.data.company,
        clientEmail: result.data.email,
        clientGST: result.data.gstin,

        estimatedQuantity: result.data.estimatedQuantity,
        estimatedCostValue: result.data.estimatedCost,
        costAfterDiscount: result.data.costAfterDiscount,
        gst: result.data.gst,
        grandTotalWithGST: result.data.grandTotal,

        filmID: result.data.film,
        costOfFilm: result.data.filmCost,

        printID: result.data.print_name,
        costOfPrint: result.data.print_cost,

        steriosID: result.data.sterio_name,
        costOfSterios: result.data.sterio_cost,

        tintID: result.data.tint_name,
        costOfTint: result.data.tint_cost,

        bagId: result.data.bag_name,
        costOfBag: result.data.bag_cost,

        extrusionID: result.data.extrusion,
        costOfExtrusion: result.data.extrusionCost,

        discountID: result.data.discount_name,
        discountPercentage: result.data.discount_percentage,
      });
    };

    loadTintDataInInputField();
  }, [quoteId]);

  return (
    <div className="client-body">
      <div className="clientheading">
        <strong>Quotation Summary</strong>
      </div>

      <div className="container-viewquote">
        <div>
          <table className="quote-table">
            <tbody className="quote-tbody">
              <tr>
                <th>Quotation Summary</th>
              </tr>
              <tr>
                <td>Product Name:</td>
                <td>{viewQuoteValues.productName}</td>
              </tr>
              <tr>
                <th>Profile Information</th>
              </tr>
              <tr>
                <td>Customer Name:</td>
                <td>{viewQuoteValues.clientName}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{viewQuoteValues.clientEmail}</td>
              </tr>
              <tr>
                <td>Phone Number:</td>
                <td>{viewQuoteValues.clientPhoneNumber}</td>
              </tr>
              <tr>
                <td>Company Name:</td>
                <td>{viewQuoteValues.clientCompanyName}</td>
              </tr>
              <tr>
                <td>GST Number:</td>
                <td>{viewQuoteValues.clientGST}</td>
              </tr>
              <tr>
                <th>Address</th>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{viewQuoteValues.fullAddress}</td>
              </tr>
              {/* <tr>
                <td>Pincode:</td>
                <td>{viewQuoteValues.clientPinCode}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{viewQuoteValues.clientCity}</td>
              </tr>
              <tr>
                <td>State:</td>
                <td>{viewQuoteValues.clientState}</td>
              </tr>
              <tr>
                <td>Address1:</td>
                <td>{viewQuoteValues.clientFirstAddress}</td>
              </tr>
              <tr>
                <td>Address2:</td>
                <td>{viewQuoteValues.clientFirstAddress}</td>
              </tr> */}
              <tr>
                <th>Required Information</th>
              </tr>

              <tr>
                <td>Film cost:</td>
                <td>{viewQuoteValues.costOfFilm}</td>
              </tr>
              <tr>
                <th>Extrution</th>
              </tr>

              <tr>
                <td>Extrution cost:</td>
                <td>{viewQuoteValues.costOfExtrusion}</td>
              </tr>
              <tr>
                <th>Measurement (in)</th>
              </tr>
              <tr>
                <td>Width:</td>
                <td>{viewQuoteValues.widthOfMaterial}</td>
              </tr>
              <tr>
                <td>Length:</td>
                <td>{viewQuoteValues.lengthOfMaterial}</td>
              </tr>
              <tr>
                <td>Thickness:</td>
                <td>{viewQuoteValues.thicknessOfMaterial}</td>
              </tr>
              <tr>
                <td>Pieces / Kg:</td>
                <td>{viewQuoteValues.noOfPieces}</td>
              </tr>
              <tr>
                <th>Guzzet</th>
              </tr>
              <tr>
                <td>Left Guzzet:</td>
                <td>{viewQuoteValues.leftGuzzetOfMaterial}</td>
              </tr>
              <tr>
                <td>Right Guzzet:</td>
                <td>{viewQuoteValues.rightGuzzetOfMaterial}</td>
              </tr>
              <tr>
                <td>Weight(KG):</td>
                <td>{viewQuoteValues.weightOfMaterial}</td>
              </tr>
              <tr>
                <td>Total No. of Pieces:</td>
                <td>{viewQuoteValues.totalNoOfPieces}</td>
              </tr>
              <tr>
                <td>Dimension:</td>
                <td>{viewQuoteValues.dimesions}</td>
              </tr>
              <tr>
                <th>Printing</th>
              </tr>
              <tr>
                <td>Printing color:</td>
                <td>{viewQuoteValues.printID}</td>
              </tr>
              <tr>
                <td>Printing color cost:</td>
                <td>{viewQuoteValues.costOfPrint}</td>
              </tr>
              <tr>
                <th>Sterio</th>
              </tr>
              <tr>
                <td>Sterio Type:</td>
                <td>{viewQuoteValues.steriosID}</td>
              </tr>
              <tr>
                <td>Sterio cost:</td>
                <td>{viewQuoteValues.costOfSterios}</td>
              </tr>
              <tr>
                <th>Tint</th>
              </tr>
              <tr>
                <td>Tint:</td>
                <td>{viewQuoteValues.tintID}</td>
              </tr>
              <tr>
                <td>Tint Cost:</td>
                <td>{viewQuoteValues.costOfTint}</td>
              </tr>
              <tr>
                <th>Bag</th>
              </tr>
              <tr>
                <td>Bag Shape:</td>
                <td>{viewQuoteValues.bagId}</td>
              </tr>
              <tr>
                <td>Bag cost:</td>
                <td>{viewQuoteValues.costOfBag}</td>
              </tr>
              <tr>
                <th>Final Price Details</th>
              </tr>
              <tr>
                <td>Estimated Cost:</td>
                <td>{viewQuoteValues.estimatedCostValue}</td>
              </tr>
              <tr>
                <td>Estimated Quantity:</td>
                <td>{viewQuoteValues.estimatedQuantity}</td>
              </tr>
              <tr>
                <td>Selected Discount:</td>
                <td>{viewQuoteValues.discountPercentage}</td>
              </tr>
              <tr>
                <th>Price Summary</th>
              </tr>
              <tr>
                <td>Cost After Discount:</td>
                <td>{viewQuoteValues.costAfterDiscount}</td>
              </tr>
              <tr>
                <td>GST 18%:</td>
                <td>{viewQuoteValues.gst}</td>
              </tr>
              <tr>
                <td>Grand Total:</td>
                <td>{viewQuoteValues.grandTotalWithGST}</td>
              </tr>
            </tbody>
            {/* )
              })} */}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewQuotation;
