import React, { useContext, useEffect } from "react";
import { numberFormat } from "../numberFormat";
import DiscountContext from "../../context/DiscountContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";

function Pricing({ quoteId, quotationFormData, setQuotationFormData }) {
  const {
    discountPercentage,
    estimatedCostValue,
    estimatedQuantity,
    totalNoOfPieces,
    isAdditionalSelected,
    additionalPiecesNumbers,
    discountID,
    grandTotalWithGST,
    weightOfMaterial,
    gst,
    costAfterDiscount,
  } = quotationFormData;
  const { allDiscountData } = useContext(DiscountContext);
  useDocumentTitle("Final Pricing");

  const grandTotal =
    (Number(estimatedCostValue) * (100 - Number(discountPercentage))) / 100;
  const totalGST = grandTotal * 0.18;
  const grandTotalGST = grandTotal + totalGST;

  useEffect(() => {
    setQuotationFormData({
      ...quotationFormData,
      estimatedQuantity: isAdditionalSelected
        ? additionalPiecesNumbers
        : totalNoOfPieces,
      estimatedCostValue: estimatedCostValue,
      discountPercentage: discountPercentage,
      costAfterDiscount: grandTotal,
      gst: totalGST,
      grandTotalWithGST: grandTotalGST,
    });
  }, [estimatedQuantity, estimatedCostValue, totalNoOfPieces, grandTotalGST]);
  return (
    <div className="pricing-body">
      <div className="container-pricing">
        <div className="pricing-header">Final Price Details</div>
        <div className="estimatedrow">
          <div className="einput">
            <label>
              Estimated Cost <sup>*</sup>
            </label>
            <input
              type="text"
              disabled
              name="estimatedCostValue"
              value={
                estimatedCostValue ? numberFormat(estimatedCostValue) : "0"
              }
            />
          </div>
          <div className="einput">
            <label>
              Estimated Quantity (Per {weightOfMaterial} Kg)<sup>*</sup>
            </label>

            <input
              type="text"
              disabled
              name="estimatedQuantityValue"
              value={estimatedQuantity ? Math.round(estimatedQuantity) : "0"}
            />
          </div>
        </div>
        <div className="discount-row einput">
          <label>
            Discount <sup>*</sup>
          </label>
          <div className="dropdown-wrapper">
            <select
              className="textfield-pr"
              name="discountID"
              value={discountID}
              onChange={(e) => {
                const discountPercentage = allDiscountData.find(
                  (eachDiscount) => eachDiscount.id == e.target.value
                ).percentage;
                setQuotationFormData({
                  ...quotationFormData,
                  discountID: e.target.value,
                  discountPercentage: discountPercentage,
                });
              }}
            >
              <option value="" selected disabled>
                {!quoteId ? "----- Select -----" : discountID}
              </option>
              {allDiscountData.map((eachDiscount) => (
                <option key={eachDiscount.id} value={eachDiscount.id}>
                  {eachDiscount.name}
                </option>
              ))}
            </select>
          </div>
          {discountID ? (
            <div className="cost__text__radio__Btn">
              <p>Discount</p>
              <p> :</p>
              <p>{`${discountPercentage}%`}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="total-amount">
          <div className="quotation-sum">Quotation Summary</div>
          <div className="total-amount-row">
            <div className="grandtotal-row">
              Cost After Discount {`${discountPercentage}%`}
            </div>
            <div className="grandtotal-row green">
              {numberFormat(costAfterDiscount)}
            </div>
          </div>
          <div className="total-amount-row">
            <div className="grandtotal-row">GST 18%</div>
            <div className="grandtotal-row green">{numberFormat(gst)}</div>
          </div>
          <div className="total-amount-row">
            <div className="grandtotal-amount">Grand Total</div>
            <div className="grandtotal-amount">
              {numberFormat(grandTotalWithGST)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
