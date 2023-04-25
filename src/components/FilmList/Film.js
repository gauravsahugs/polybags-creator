import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import icons from "../../constants/icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { numberFormat } from "../numberFormat";
import { BACKEND_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { Tooltip } from "@mui/material";
import { isActiveSearchBar, isActiveTable } from "../utility";
import HeaderTitle from "../HeaderTitle";
import moment from "moment";
function Film() {
  const navigate = useNavigate();
  const { active } = useParams();

  const allFilmsURL = `${BACKEND_URL}/films`;

  console.table(`🚀 ~> Film ~> allFilmsURL`, allFilmsURL);

  const { apiData: allFilmsData, isLoading } = useFetch(allFilmsURL, "get");

  const enableFilmHandlerById = (id) => {
    axios.get(`${BACKEND_URL}/film/enable/${id}`).then((response) => {
      toast.info(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const timer = () => {
        setTimeout(() => {
          navigate(0);
        }, 2100);
      };
      timer();
      clearTimeout(timer);
    });
  };
  const disableFilmHandlerById = (id) => {
    axios
      .get(`${BACKEND_URL}/film/disable/${id}`)
      .then((response) => {
        toast.info(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const timer = () => {
          setTimeout(() => {
            navigate(0);
          }, 2100);
        };
        timer();
        clearTimeout(timer);
      })
      .catch((error) => {
        if (error.message) {
          toast.error(error.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  const deleteFilmById = (filmId) => {
    axios
      .get(`${BACKEND_URL}/film/delete/${filmId}`)
      .then((response) => {
        toast.dark(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const timer = () => {
          setTimeout(() => {
            navigate(0);
          }, 2100);
        };
        timer();
        clearTimeout(timer);
      })
      .catch((error) => {
        if (error.message) {
          toast.error(error.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  return (
    <div className="cbody">
      <HeaderTitle headTitle="Film" />
      <div className="clientbody">
        <div className="subbody">
          {isActiveSearchBar(active) && (
            <div className="searchbar">
              <button
                className="btn add"
                onClick={() => navigate("/addnewfilm")}
              >
                <i
                  class="bi bi-plus-lg"
                  style={{ fontSize: 16, alignItems: "center" }}
                ></i>
                &nbsp; Add New
              </button>
              <div className="inputsearch">
                <icons.SearchIcon />
                <input type="text" />
              </div>
            </div>
          )}

          <div>
            {isLoading ? (
              <div className="loader">
                <InfinitySpin width="300" color="#213680" />
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Action</th>
                    <th>Status</th>
                    <th>Name</th>
                    <th>No of Layers</th>
                    <th>Total Price</th>
                    <th>Last Modified Date</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                {allFilmsData.map((eachFilm, index) => {
                  return (
                    isActiveTable(active, eachFilm.isDisabled) && (
                      <tbody key={eachFilm.id}>
                        <tr>
                          {/* <td>{eachFilm.id}</td> */}
                          <td>{index + 1}</td>
                          <td>
                            <div className="action__div">
                              <Tooltip title="Delete" arrow>
                                <img
                                  className="delete__icon"
                                  src={icons.deleteIcon}
                                  alt="deleteIcon"
                                  onClick={() => deleteFilmById(eachFilm.id)}
                                />
                              </Tooltip>
                              <Tooltip title="Edit" arrow>
                                <img
                                  className="edit__icon"
                                  src={icons.editIcon}
                                  alt="editIcon"
                                  onClick={() =>
                                    navigate(`/film/edit/${eachFilm.id}`)
                                  }
                                />
                              </Tooltip>
                              <Tooltip title="Info" arrow>
                                <img
                                  className="info__icon"
                                  src={icons.infoIcon}
                                  alt="infoIcon"
                                />
                              </Tooltip>
                            </div>
                          </td>
                          <td>
                            {eachFilm.isDisabled ? (
                              <button
                                onClick={() =>
                                  enableFilmHandlerById(eachFilm.id)
                                }
                                className="deactive__button"
                              >
                                Enable
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  disableFilmHandlerById(eachFilm.id)
                                }
                                className="active__button"
                              >
                                Disable
                              </button>
                            )}
                          </td>
                          <td>{eachFilm.name}</td>
                          <td>{eachFilm.phone}</td>
                          <td> {numberFormat(eachFilm.cost)}/kg</td>
                          <td>{moment(eachFilm.createdTS).format("lll")}</td>
                          <td>{moment(eachFilm.modifiedTS).format("lll")}</td>
                        </tr>
                      </tbody>
                    )
                  );
                })}
              </table>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Film;
