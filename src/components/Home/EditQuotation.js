import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import Quotation from "./Quotation";

const EditQuotation = () => {
  const { quoteId } = useParams();
  const [quoteData, setQuoteData] = useState({ loading: true, data: {} });
  useEffect(() => {
    if (quoteId) {
      (async () => {
        try {
          const quoteData = await axios.get(`${BACKEND_URL}/quote/${quoteId}`);
          console.log(quoteData.data, "quoteData", quoteId);
          setQuoteData({ loading: false, data: quoteData.data });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [quoteId]);
  return (
    <div>
      {!quoteData.loading ? (
        <Quotation quoteId={quoteId} quoteData={quoteData.data} />
      ) : null}
    </div>
  );
};

export default EditQuotation;
