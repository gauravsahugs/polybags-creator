import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import ViewClient from "../Client/ViewClient";

const ViewCustomer = () => {
  const { clientId } = useParams();
  const [modalMargin, setModalMargin] = useState(clientId);
  const [clientData, setClientData] = useState({ loading: true, data: {} });
  useEffect(() => {
    if (clientId) {
      (async () => {
        try {
          const clientData = await axios.get(
            `${BACKEND_URL}/clients/${clientId}`
          );
          console.log(clientData.data, "quoteData", clientId);
          setClientData({ loading: false, data: clientData.data });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [clientId]);
  return (
    <div>
      {!clientData.loading ? (
        <ViewClient id={clientId} modalMargin={modalMargin} />
      ) : null}
    </div>
  );
};

export default ViewCustomer;
