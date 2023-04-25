import { Role } from "../constants/Role";

const SidebarItems = [
  {
    title: "Dashboard",
    icon: "bi-grid-1x2",
    visibility: Role.ADMIN,
    childrens: [
      {
        title: "Home",
        icon: "bi-house-fill",
        path: "/home",
      },
      {
        title: "View Report",
        icon: "bi-house-fill",
        path: "/view-report",
      },
      {
        title: "Help",
        icon: "bi-info-circle-fill",
        path: "/help",
      },
    ],
  },
  {
    title: "Customer",
    icon: "bi-person",
    visibility: Role.ADMIN,
    childrens: [
      {
        title: "All Customer",
        path: "/client/All",
      },
      {
        title: "Active Customer",
        path: "/client/Active",
      },
      {
        title: "Deactive Customer",
        path: "/client/Deactive",
      },
    ],
  },
  {
    title: "Films",
    icon: "bi bi-stack",
    visibility: Role.ADMIN,
    childrens: [
      {
        title: "Add New Film",
        path: "/addnewfilm",
      },
      {
        title: "All Film",
        path: "/film/All",
      },
      {
        title: "Active Film",
        path: "/film/Active",
      },
      {
        title: "Deactive Film",
        path: "/film/Deactive",
      },
    ],
  },
  {
    title: "Printing type",
    icon: "bi-printer",
    visibility: Role.ADMIN,
    childrens: [
      {
        title: "All Printing type",
        path: "/printing/All",
      },
      {
        title: "Active Colors",
        path: "/printing/Active",
      },
      {
        title: "Deactive Colors",
        path: "/printing/Deactive",
      },
    ],
  },
  {
    title: "Tint",
    icon: "bi bi-palette",
    visibility: Role.ADMIN,
    childrens: [
      {
        title: "All Tint",
        path: "/tint/All",
      },
      {
        title: "Active Tint",
        path: "/tint/Active",
      },
      {
        title: "Deactive Tint",
        path: "/tint/Deactive",
      },
    ],
  },
  {
    title: "Discount",
    icon: "bi-percent",
    visibility: Role.ADMIN,
    childrens: [
      {
        title: "All Discount",
        path: "/discount/All",
      },
      {
        title: "Active Discount",
        path: "/discount/Active",
      },
      {
        title: "Deactive Discount",
        path: "/discount/Deactive",
      },
    ],
  },
  {
    title: "Extrution",
    icon: "bi-box-seam",
    visibility: Role.ADMIN,
    childrens: [
      {
        title: "All Extrution",
        path: "/extrution/All",
      },
      {
        title: "Active Extrution",
        path: "/extrution/Active",
      },
      {
        title: "Deactive Extrution",
        path: "/extrution/Deactive",
      },
    ],
  },
  {
    title: "Strios",
    icon: "bi-palette2",
    visibility: Role.ADMIN,
    childrens: [
      {
        title: "All Strios",
        path: "/strios/All",
      },
      {
        title: "Active Strios",
        path: "/strios/Active",
      },
      {
        title: "Deactive Strios",
        path: "/strios/Deactive",
      },
    ],
  },
  {
    title: "Quotation",
    icon: "bi bi-layout-text-sidebar-reverse",
    visibility: Role.ADMIN,
    childrens: [
      {
        title: "All Quotation",
        path: "/quotation/All",
      },
      {
        title: "Active Quotation",
        path: "/quotation/Active",
      },
      {
        title: "Deactive Quotation",
        path: "/quotation/Deactive",
      },
    ],
  },
  {
    title: "Bag Shape",
    icon: "bi bi-bag",
    visibility: Role.ADMIN,
    childrens: [
      {
        title: "All Bag Shape",
        path: "/bagshape/All",
      },
      {
        title: "Active Bag Shape",
        path: "/bagshape/Active",
      },
      {
        title: "Deactive Bag Shape",
        path: "/bagshape/Deactive",
      },
    ],
  },
];

export default SidebarItems;
