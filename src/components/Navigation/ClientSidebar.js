import React from "react";
import { NavLink } from "react-router-dom";

function ClientSidebar() {
  return (
    <div className="appbody-left">
      <div className="clientsidebar" id="mySidebar">
        <NavLink
          exact={true}
          to="/home"
          className={({ isActive }) =>
            isActive ? "clientsidebar-title-isactive" : "clientsidebar-item"
          }
        >
          <div className="panel-title">
            <i class="bi-grid-1x2" />
            Dashboard
          </div>
        </NavLink>
        <NavLink
          exact={true}
          to="/view-report"
          className={({ isActive }) =>
            isActive ? "clientsidebar-title-isactive" : "clientsidebar-item"
          }
        >
          <div className="panel-title">
            <i class="bi bi-clipboard2-pulse" />
            View Report
          </div>
        </NavLink>
        <NavLink
          exact={true}
          to="/help"
          className={({ isActive }) =>
            isActive ? "clientsidebar-title-isactive" : "clientsidebar-item"
          }
        >
          <div className="panel-title">
            {" "}
            <i class="bi-info-circle-fill" /> Help
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default ClientSidebar;
