import React from "react";
function QuotationHeader({ page, quotationFormTitles }) {
  return (
    <div className="appbody-main">
      <div className="quotation-header">
        <div className="clientheading">
          <strong>Quotation</strong>
        </div>
      </div>
      <ul className="head-list-quote">
        {quotationFormTitles.map((eachQuotationFormTitle, index) => (
          <li
            key={eachQuotationFormTitle.titleID}
            className={
              index === page || index <= page
                ? "head-list-selected headlist"
                : "headlist"
            }
          >
            <div className="quotation__titles">
              <i class="bi bi-check-circle"></i>
              {eachQuotationFormTitle.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuotationHeader;
