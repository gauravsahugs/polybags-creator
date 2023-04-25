import React from "react";
import { NavLink } from "react-router-dom";

function SidebarItem({ item, open, setOpen }) {
  if (item.childrens) {
    return (
      <div
        className={
          open.isOpenTitle && item.title === open.openTitle
            ? "sidebar-item open"
            : "sidebar-item"
        }
      >
        <div
          className="sidebar-title"
          onClick={() => {
            setOpen({
              openTitle: item.title,
              isOpenTitle:
                open.openTitle === item.title ? !open.isOpenTitle : true,
            });
          }}
        >
          <NavLink exact={true} to={item.path} className="sidebar-title">
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </NavLink>
          <i className="bi-chevron-down toggle-btn"></i>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <NavLink
          exact={true}
          to={item.path}
          className={({ isActive }) =>
            isActive ? "sidebar-item title-selected" : "sidebar-item plain"
          }
        >
          {item.title}
        </NavLink>
      </>
    );
  }
}

export default SidebarItem;
