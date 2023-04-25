import React, { useState } from "react";
import QuotationHeader from "./QuotationHeader";
import CustomerRegistration from "./CustomerRegistration";
import Requirements from "./Requirements";
import Pricing from "./Pricing";
import quotationFormTitles from "../../data/quotationFormTitles";
import { useNavigate } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../../config";
import axios from "axios";
const Quotation = ({ quoteId = "", quoteData = {} }) => {
  const [page, setPage] = useState(0);

  const [quotationFormData, setQuotationFormData] = useState({
    isPrintingSelected: quoteData.isPrinting || false,
    isExtrusionSelected: quoteData.isExtrusion || false,
    isGuzzetSelected: quoteData.isGuzzet || false,
    isSteriosSelected: quoteData.isSterio || false,
    isTintSelected: quoteData.isTint || false,
    isBagMakingSelected: quoteData.isbagMaking || false,
    isBagShapeSelected: quoteData.isBagshape || false,
    isAdditionalSelected: quoteData.isAdditionalSelected || false,

    noOfPieces: quoteData.aprxCount || "",
    additionalPiecesNumbers: "",
    additionalPieces: "",
    totalNoOfPieces: quoteData.totalNoOfPieces || "",

    widthOfMaterial: quoteData.width || "",
    leftGuzzetOfMaterial: quoteData.leftGuzzet || "",
    rightGuzzetOfMaterial: quoteData.rightGuzzet || "",
    lengthOfMaterial: quoteData.length || "",
    thicknessOfMaterial: quoteData.thickness || "",
    weightOfMaterial: quoteData.estWeight || "",
    dimesions: "",

    bagInputValue: quoteData.bagMakingCost || "",

    productName: quoteData.productName || "",
    clientID: quoteData.client || "",
    clientFirstName: "",
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
    estimatedCostValue: quoteData.estimatedCost || "",
    costAfterDiscount: "",
    gst: "",
    grandTotalWithGST: quoteData.grandTotal || "",

    filmID: quoteData.film || "",
    costOfFilm: quoteData.filmCost || "",

    printID: quoteData.prints || "",
    costOfPrint: quoteData.printCost || "",

    steriosID: quoteData.sterio || "",
    costOfSterios: quoteData.sterioCost || "",

    tintID: quoteData.tint || "",
    costOfTint: quoteData.tintCost || "",

    bagId: quoteData.bag || "",
    costOfBag: quoteData.bagCost || "",

    extrusionID: quoteData.extrusion || "",
    costOfExtrusion: quoteData.extrusionCost || "",

    discountID: quoteData.discount || "",
    discountPercentage: quoteData.discountPercentage || "",
  });
  const navigate = useNavigate();
  const quotationFormSubmitHandler = (e) => {
    e.preventDefault();
    const quotationFormObject = {
      isPrinting: quotationFormData.isPrintingSelected,
      isbagMaking: quotationFormData.isBagMakingSelected,
      isBagshape: quotationFormData.isBagShapeSelected,
      isSterio: quotationFormData.isSteriosSelected,
      isGuzzet: quotationFormData.isGuzzetSelected,
      isTint: quotationFormData.isTintSelected,
      isExtrusion: quotationFormData.isExtrusionSelected,

      client: quotationFormData.client,
      firstName: quotationFormData.clientFirstName,
      middleName: quotationFormData.clientMiddleName,
      lastName: quotationFormData.clientLastName,
      pinCode: quotationFormData.clientPinCode,
      phone: quotationFormData.clientPhoneNumber,
      city: quotationFormData.clientCity,
      email: quotationFormData.clientEmail,
      state: quotationFormData.clientState,
      country: quotationFormData.clientCountry,
      gstin: quotationFormData.clientGST,
      address1: quotationFormData.clientFirstAddress,
      address2: quotationFormData.clientSecondAddress,
      company: quotationFormData.clientCompanyName,
      productName: quotationFormData.productName,

      film: Number(quotationFormData.filmID),
      filmCost: Number(quotationFormData.costOfFilm),

      prints: Number(quotationFormData.printID),
      printCost: Number(quotationFormData.costOfPrint),

      sterio: Number(quotationFormData.steriosID),
      sterio_cost: Number(quotationFormData.costOfSterios),

      tint: Number(quotationFormData.tintID),
      tint_cost: Number(quotationFormData.costOfTint),

      bag: Number(quotationFormData.bagID),
      bag_cost: Number(quotationFormData.costOfBag),

      extrusion: Number(quotationFormData.extrusionID),
      extrusionCost: Number(quotationFormData.costOfExtrusion),

      bagMakingCost: Number(quotationFormData.bagInputValue),

      leftGuzzet: Number(quotationFormData.leftGuzzetOfMaterial),
      rightGuzzet: Number(quotationFormData.rightGuzzetOfMaterial),

      length: Number(quotationFormData.lengthOfMaterial),
      width: Number(quotationFormData.widthOfMaterial),
      thickness: Number(quotationFormData.thicknessOfMaterial),
      dimesions: quotationFormData.dimesions,
      estWeight: Number(quotationFormData.weightOfMaterial),

      aprxCount: Math.round(quotationFormData.noOfPieces),
      totalNoOfPieces: quotationFormData.totalNoOfPieces,

      discount: Number(quotationFormData.discountID),
      discount_percentage: quotationFormData.discountPercentage,

      estimatedQuantity: quotationFormData.estimatedQuantity,
      estimatedCost: Number(quotationFormData.estimatedCostValue.toFixed(2)),
      costAfterDiscount: quotationFormData.costAfterDiscount,
      gst: quotationFormData.gst,
      grandTotal: Number(quotationFormData.grandTotalWithGST),
    };

    if (!quoteId) {
      axios
        .post(`${BACKEND_URL}/quote/create`, quotationFormObject)
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
              navigate("/quotation/all");
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

      setQuotationFormData({
        isPrintingSelected: false,
        isGuzzetSelected: false,
        isSteriosSelected: false,
        isExtrusionSelected: false,
        isTintSelected: false,
        isBagMakingSelected: false,
        isBagShapeSelected: false,
        widthOfMaterial: "",
        leftGuzzetOfMaterial: "",
        rightGuzzetOfMaterial: "",
        lengthOfMaterial: "",
        noOfPieces: "",
        thicknessOfMaterial: "",
        weightOfMaterial: "",
        totalNoOfPieces: "",
        printingSelectedValue: "",
        discountSelectedValue: "",
        estimatedQuantity: "",
        bagInputValue: "",
        productName: "",
        clientFirstName: "",
        clientPinCode: "",
        clientPhoneNumber: "",
        clientCity: "",
        clientState: "",
        clientCountry: "",
        clientFirstAddress: "",
        clientCompanyName: "",
        clientEmail: "",
        clientGST: "",
        estimatedCostValue: "",
        clientID: "",
        costOfFilm: "",
        filmID: "",
        printID: "",
        bagID: "",
        costOfBag: "",
        costOfPrint: "",
        steriosID: "",
        costOfSterios: "",
        tintID: "",
        costOfTint: "",
        extrusionID: "",
        costOfExtrusion: "",
        discountID: "",
        clientId: "",
      });
    } else {
      axios
        .post(`${BACKEND_URL}/quote/update/${quoteId}`, quotationFormObject)
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
              navigate("/quotation/all");
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

      setQuotationFormData({
        isPrintingSelected: false,
        isGuzzetSelected: false,
        isSteriosSelected: false,
        isTintSelected: false,
        isExtrusionSelected: false,
        isBagMakingSelected: false,
        isBagShapeSelected: false,
        widthOfMaterial: "",
        leftGuzzetOfMaterial: "",
        rightGuzzetOfMaterial: "",
        lengthOfMaterial: "",
        noOfPieces: "",
        thicknessOfMaterial: "",
        weightOfMaterial: "",
        totalNoOfPieces: "",
        printingSelectedValue: "",
        discountSelectedValue: "",
        estimatedQuantityValue: "",
        bagInputValue: "",
        productName: "",
        clientFirstName: "",
        clientPinCode: "",
        clientPhoneNumber: "",
        clientCity: "",
        clientState: "",
        clientCountry: "",
        clientFirstAddress: "",
        clientCompanyName: "",
        clientEmail: "",
        clientGST: "",
        estimatedCostValue: "",
        clientID: "",
        costOfFilm: "",
        filmID: "",
        printID: "",
        bagID: "",
        costOfBag: "",
        costOfPrint: "",
        steriosID: "",
        costOfSterios: "",
        tintID: "",
        costOfTint: "",
        extrusionID: "",
        costOfExtrusion: "",
        discountID: "",
        clientId: "",
      });
    }
  };

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <CustomerRegistration
          quoteId={quoteId}
          quotationFormData={quotationFormData}
          setQuotationFormData={setQuotationFormData}
        />
      );
    } else if (page === 1) {
      return (
        <Requirements
          quoteId={quoteId}
          quotationFormData={quotationFormData}
          setQuotationFormData={setQuotationFormData}
        />
      );
    } else {
      return (
        <Pricing
          quoteId={quoteId}
          quotationFormData={quotationFormData}
          setQuotationFormData={setQuotationFormData}
        />
      );
    }
  };
  const goToPreviousPage = () => {
    setPage((currentQuotationPage) => currentQuotationPage - 1);
  };

  const goToNextPage = () => {
    setPage((currentQuotationPage) => currentQuotationPage + 1);
    // let flag = false;
    // if (quotationFormData !== "") {
    //   flag = true;
    // }

    // if (flag !== false) {
    //   setQuotationFormData({
    //     ...quotationFormData,
    //   });
    //   setPage((currentQuotationPage) => currentQuotationPage + 1);
    // }
  };
  const navigateToQuotationPanel = () => {
    navigate("/quotation/all");
  };

  return (
    <div className="appbody-container">
      <QuotationHeader page={page} quotationFormTitles={quotationFormTitles} />

      <div className="container__quotation-form">
        <div> {PageDisplay()}</div>
        <div className="buttongroup">
          {page === 0 ? (
            <button
              className="button cancelbtn"
              onClick={navigateToQuotationPanel}
            >
              Cancel
            </button>
          ) : (
            <button className="button cancelbtn" onClick={goToPreviousPage}>
              Previous
            </button>
          )}

          {page === quotationFormTitles.length - 1 ? (
            <button
              className="button nextbtn"
              onClick={quotationFormSubmitHandler}
            >
              Save
            </button>
          ) : (
            <button className="button nextbtn" onClick={goToNextPage}>
              <span className="next__text">
                Next
                <HiArrowNarrowRight />
              </span>
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Quotation;
