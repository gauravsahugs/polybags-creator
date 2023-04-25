import React, { useContext, useState } from "react";
import SidebarItem from "./SidebarItem";
import SidebarItems from "../../data/Sidebar";
import { isRenderSpecificComponent } from "../../AppCustom";
import AuthContext from "../../context/AuthContext";

function SideBar() {
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState({
    openTitle: "none",
    isOpenTitle: false,
  });

  return (
    <div className="appbody-left">
      <div className="sidebar" id="mySidebar">
        {SidebarItems.map((item, index) =>
          isRenderSpecificComponent(auth, item.visibility) ? (
            <SidebarItem
              key={index}
              item={item}
              open={open}
              setOpen={setOpen}
            />
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
}

export default SideBar;
