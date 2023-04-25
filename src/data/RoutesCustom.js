import AddNewClient from "../components/Client/AddNewClient";
import Client from "../components/Client/Client";
import EditClient from "../components/Client/EditClient";
import ViewClient from "../components/Client/ViewClient";
import ClientUserPanel from "../components/Home/ClientUserPanel";
import Dashboard from "../components/Home/Dashboard";
import AddNewFilm from "../components/FilmList/AddNewFilm";
import Film from "../components/FilmList/Film";
import Login from "../components/Login";
import EditPrinting from "../components/Printing/EditPrinting";
import Printing from "../components/Printing/Printing";
import ViewPrinting from "../components/Printing/ViewPrinting";
import Quotation from "../components/Home/Quotation";
import QuotationPanel from "../components/Home/QuotationPanel";
import Tint from "../components/Tint/Tint";
import EditTint from "../components/Tint/EditTint";
import ViewTint from "../components/Tint/ViewTint";
import Discount from "../components/Discount/Discount";
import EditDiscount from "../components/Discount/EditDiscount";
import ViewDiscount from "../components/Discount/ViewDiscount";
import ViewExtrution from "../components/Extrution/ViewExtrution";
import Extrution from "../components/Extrution/Extrution";
import Strios from "../components/Strios/Strios";
import EditStrios from "../components/Strios/EditStrios";
import ViewStrios from "../components/Strios/ViewStrios";
import EditExtrution from "../components/Extrution/EditExtrution";
import AdminQuotation from "../components/AdminQuotation/AdminQuotation";
import { Role } from "../constants/Role";
import EditFilm from "../components/FilmList/EditFilm";
import BagShape from "../components/BagShape/BagShape";
import EditBagShape from "../components/BagShape/EditBagShape";
import ViewBagShape from "../components/BagShape/ViewBagShape";
import EditQuotation from "../components/Home/EditQuotation";
import EditCustomer from "../components/Home/EditCustomer";
import ViewCustomer from "../components/Home/ViewCustomer";
import ViewQuotation from "../components/Home/ViewQuotation";

const RoutesCustom = [
  { visibility: Role.BASE, title: "Login", path: "/login", element: <Login /> },
  {
    visibility: Role.BASE,
    title: "Home",
    path: "/home",
    element: <Dashboard />,
  },
  {
    visibility: Role.BASE,
    title: "Quotation Panel",
    path: "/quotation-panel",
    element: <QuotationPanel />,
  },
  {
    visibility: Role.BASE,
    title: "Quotation",
    path: "/clientquotation",
    element: <Quotation />,
  },
  // {
  //   visibility: Role.ADMIN,
  //   title: "All Quote",
  //   path: "/quote/:quoteId",
  //   element: <EditQuotation />,
  // },
  {
    visibility: Role.BASE,
    title: "All Quote",
    path: "/quote/:quoteId",
    element: <ViewQuotation />,
  },

  {
    visibility: Role.ADMIN,
    title: "Edit Customer",
    path: "/client/edit/:clientId",
    element: <EditCustomer />,
  },
  {
    visibility: Role.ADMIN,
    title: "View Customer",
    path: "/client/view/:clientId",
    element: <ViewCustomer />,
  },
  {
    visibility: Role.BASE,
    title: "ClientUser Panel",
    path: "/clientuserpanel",
    element: <ClientUserPanel />,
  },
  {
    visibility: Role.BASE,
    title: "Add New Client",
    path: "/customer-reg",
    element: <AddNewClient />,
  },
  {
    visibility: Role.ADMIN,
    title: "All Film",
    path: "/film/:active",
    element: <Film />,
  },
  {
    visibility: Role.ADMIN,
    title: "All Film",
    path: "/film/edit/:filmId",
    element: <EditFilm />,
  },
  {
    visibility: Role.ADMIN,
    title: "Add New Film",
    path: "/addnewfilm",
    element: <AddNewFilm />,
  },
  {
    visibility: Role.ADMIN,
    title: "All Client",
    path: "/client/:active",
    element: <Client />,
  },
  {
    visibility: Role.ADMIN,
    title: "Edit Client",
    path: "/client/editClient/:id",
    element: <EditClient />,
  },
  {
    visibility: Role.ADMIN,
    title: "View Client",
    path: "/client/viewClient/:id",
    element: <ViewClient />,
  },
  {
    visibility: Role.ADMIN,
    title: "All Printing",
    path: "/printing/:active",
    element: <Printing />,
  },
  {
    visibility: Role.ADMIN,
    title: "Edit Printing",
    path: "/printing/editPrinting/:id",
    element: <EditPrinting />,
  },
  {
    visibility: Role.ADMIN,
    title: "View Printing",
    path: "/printing/viewPrinting/:id",
    element: <ViewPrinting />,
  },
  {
    visibility: Role.ADMIN,
    title: "All Tint",
    path: "/tint/:active",
    element: <Tint />,
  },
  {
    visibility: Role.ADMIN,
    title: "Edit Tint",
    path: "/tint/editTint/:id",
    element: <EditTint />,
  },
  {
    visibility: Role.ADMIN,
    title: "View Tint",
    path: "/tint/viewTint/:id",
    element: <ViewTint />,
  },
  {
    visibility: Role.ADMIN,
    title: "All Discount",
    path: "/discount/:active",
    element: <Discount />,
  },
  {
    visibility: Role.ADMIN,
    title: "Edit Discount",
    path: "/discount/editDiscount/:id",
    element: <EditDiscount />,
  },
  {
    visibility: Role.ADMIN,
    title: "View Discount",
    path: "/discount/viewDiscount/:id",
    element: <ViewDiscount />,
  },
  {
    visibility: Role.ADMIN,
    title: "All Extrution",
    path: "/extrution/:active",
    element: <Extrution />,
  },
  {
    visibility: Role.ADMIN,
    title: "View Extrution",
    path: "/extrution/viewExtrution/:id",
    element: <ViewExtrution />,
  },
  {
    visibility: Role.ADMIN,
    title: "Edit Extrution",
    path: "/extrution/editExtrution/:id",
    element: <EditExtrution />,
  },
  {
    visibility: Role.ADMIN,
    title: "All Strios",
    path: "/strios/:active",
    element: <Strios />,
  },
  {
    visibility: Role.ADMIN,
    title: "Edit Strios",
    path: "/strios/editStrios/:id",
    element: <EditStrios />,
  },
  {
    visibility: Role.ADMIN,
    title: "View Strios",
    path: "/strios/viewStrios/:id",
    element: <ViewStrios />,
  },
  {
    visibility: Role.ADMIN,
    title: "All Bag Shape",
    path: "/bagshape/:active",
    element: <BagShape />,
  },
  {
    visibility: Role.ADMIN,
    title: "Edit Bag Shape",
    path: "/bagshape/editBagShape/:id",
    element: <EditBagShape />,
  },
  {
    visibility: Role.ADMIN,
    title: "View Bag Shape",
    path: "/bagshape/viewBagShape/:id",
    element: <ViewBagShape />,
  },
  {
    visibility: Role.ADMIN,
    title: "Admin Quotation",
    path: "/quotation/:active",
    element: <AdminQuotation />,
  },
];

export default RoutesCustom;
