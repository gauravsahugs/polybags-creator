import React from "react";
import icons from "../../constants/icons";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="dash-body">
        <div className="dashboard-header">
          <div className="clientheading">
            <strong>Dashboard</strong>
          </div>
        </div>
        <div className="cards">
          <div className="card" onClick={() => navigate("/clientuserpanel")}>
            <div className="card-head">Customer</div>
            <div>
              <img className="dash-logo" src={icons.Client} alt="Client Logo" />
            </div>
          </div>
          <div className="card" onClick={() => navigate("/quotation-panel")}>
            <div className="card-head quotation-head">Quotation</div>
            <div className="card-icon">
              <img
                className="dash-logo"
                src={icons.Calculator}
                alt="Calculator Logo"
              />
            </div>
          </div>
          <div className="card">
            <div className="card-head">Order</div>
            <div className="card-icon">
              <img className="dash-logo" src={icons.Order} alt="Order Logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
