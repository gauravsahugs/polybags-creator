import "./components/style.css";
import "./App.css";
import TopNav from "./components/Navigation/TopNav";
import SideBar from "./components/Navigation/Sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import RoutesCustom from "./data/RoutesCustom";
import Dashboard from "./components/Home/Dashboard";
import { Role } from "./constants/Role";
import ClientSidebar from "./components/Navigation/ClientSidebar";

export const isRenderSpecificComponent = (auth, visibility) => {
  if (auth.isAdmin && (visibility === Role.ADMIN || visibility === Role.BASE))
    return true;
  else if (!auth.isAdmin && visibility === Role.BASE) return true;
  else if (visibility === Role.SUPER) return true;
  else return false;
};

function AppCustom() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const isRenderComponent =
      auth.isLoggedIn !== null && auth.isLoggedIn !== undefined
        ? auth.isLoggedIn
        : false;
    if (!isRenderComponent) navigate("/login");
  }, [auth.isLoggedIn, navigate]);
  return (
    <>
      {auth?.isLoggedIn && (
        <TopNav
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}

      {/* Admin panel */}
      <div className="appbody">
        {auth?.isLoggedIn && isSidebarOpen && (
          <>
            {auth.isAdmin ? (
              <SideBar className="appbody-sidebar" />
            ) : (
              <ClientSidebar className="appbody-sidebar" />
            )}
          </>
        )}
        <div className={isSidebarOpen ? "appbody-right" : "appbody-container"}>
          <Routes className="appbody-routes">
            {RoutesCustom.map((route) => (
              <Route
                key={route.path}
                exact
                path={route.path}
                element={
                  isRenderSpecificComponent(auth, route.visibility) ? (
                    route.element
                  ) : (
                    <Dashboard />
                  )
                }
              ></Route>
            ))}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default AppCustom;
