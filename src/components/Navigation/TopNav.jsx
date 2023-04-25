import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import icons from "../../constants/icons";
import { capitalizeCase } from "../capitalizeCase";

function TopNav({ isSidebarOpen, setIsSidebarOpen }) {
  const { auth, setAuth } = useContext(AuthContext);
  const userName = capitalizeCase(auth?.name);
  const navigate = useNavigate();
  return (
    <div className="top-nav-container">
      <div className="top-nav">
        <div className="logo">
          <img
            className="nav-logo"
            src="https://www.freeiconspng.com/thumbs/logo-design/logo-design-icon-symbol-4.png"
            alt="Sharadhi Logo"
          />
          Gk Polybags
        </div>
        <div className="nav-right">
          <i
            className="bi-list"
            onClick={() => setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen)}
          ></i>
          <div className="user-title">
            Welcome {userName}
            <button
              className="logout-btn"
              onClick={() => {
                //TODO : logout in backend and then clear on UI
                localStorage.clear();
                setAuth({
                  isLoggedIn: false,
                  isAdmin: false,
                  name: null,
                });
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
