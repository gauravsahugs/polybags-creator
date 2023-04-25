import React, { useState } from "react";
import NewFilmLayer from "./NewFilmLayer";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function isJson(item) {
  item = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}

function AddNewFilm({ filmId = "", filmData = {} }) {
  console.log(filmData, filmId, "inside");
  const [newFilmData, setNewFilmData] = useState({
    filmName: filmData.name || "",
    isLayered: filmData.isLayer || false,
    totalCost: filmData.cost || "",
    filmId: filmId || "",
  });
  const [layers, setLayers] = useState(
    filmData.description && isJson(filmData.description)
      ? JSON.parse(filmData.description)
      : []
  );
  const [saved, setSaved] = useState(false);

  const addNewLayer = () => {
    const existingLayers = [...layers];
    existingLayers.push({
      id: uuidv4(),
      layerName: "",
      ratio: 0,
      layerCost: 0,
      rows: [],
    });
    setLayers(existingLayers);
  };

  const updateLayerData = (layerId, key, value) => {
    const allLayers = [...layers];
    const requestedLayer = allLayers?.map((l) => {
      if (l.id === layerId) {
        delete l[key];
        l[key] = value;
      }
      return l;
    });
    setLayers(requestedLayer);
  };

  const updateTotalCost = () => {
    const totalCost = layers.reduce(
      (acc, curr) => acc + parseFloat(curr.layerCost) * parseFloat(curr.ratio),
      0
    );
    setNewFilmData((film) => ({ ...film, totalCost: totalCost }));
  };

  const onChange = (e) => {
    setNewFilmData((nfData) => ({
      ...nfData,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const saveFilmData = async () => {
    if (newFilmData.isLayered === true) {
      if (
        newFilmData.totalCost &&
        newFilmData.filmName &&
        layers.reduce((acc, curr) => acc + parseFloat(curr.ratio), 0) === 1
      ) {
        try {
          if (!filmId) {
            const data = await axios.post(
              "https://sharadhi-backend-1.arthashastra.ai/api/film/create",
              {
                name: newFilmData.filmName,
                cost: newFilmData.totalCost,
                description: JSON.stringify(layers),
                isLayer: newFilmData.isLayered,
              },
              { withCredentials: true }
            );
            console.log(data.result);
            setSaved(true);
          } else {
            const data = await axios.post(
              `https://sharadhi-backend-1.arthashastra.ai/api/film/update/${filmId}`,
              {
                name: newFilmData.filmName,
                cost: newFilmData.totalCost,
                description: JSON.stringify(layers),
                isLayer: newFilmData.isLayered,
              },
              { withCredentials: true }
            );
            console.log(data.result);
            setSaved(true);
          }
        } catch (err) {
          console.log(err);
          alert("Error in saving");
        }
      }
    } else {
      if (newFilmData.totalCost && newFilmData.filmName) {
        try {
          if (!filmId) {
            const data = await axios.post(
              "https://sharadhi-backend-1.arthashastra.ai/api/film/create",
              {
                name: newFilmData.filmName,
                cost: newFilmData.totalCost,
                description: 0,
                isLayer: newFilmData.isLayered,
              },
              { withCredentials: true }
            );
            console.log(data.result);
            setSaved(true);
          } else {
            const data = await axios.post(
              `https://sharadhi-backend-1.arthashastra.ai/api/film/update/${filmId}`,
              {
                name: newFilmData.filmName,
                cost: newFilmData.totalCost,
                description: 0,
                isLayer: newFilmData.isLayered,
              },
              { withCredentials: true }
            );
            console.log(data.result);
            setSaved(true);
          }
        } catch (err) {
          console.log(err);
          alert("Error in saving");
        }
      }
    }
  };
  let save = newFilmData.isLayered
    ? layers.reduce((acc, curr) => acc + parseFloat(curr.ratio), 0) !== 1 && 1
    : 1;

  console.log(newFilmData.isLayered);
  return (
    <>
      <div className="filmbody">
        <div className="clientheading">
          <strong>Add New Film</strong>
        </div>
        <div className="row1">
          <div className="filmname">
            <label>Name of the Film</label>
            <input
              className="inputfilmname"
              type="text"
              value={newFilmData.filmName}
              name="filmName"
              onChange={onChange}
              placeholder=""
              // required
            />
            <div />
            <div className="layercheck">
              <label className="layercheckrow">Does Layer Exist?</label>
              <label className="layercheckrow">Yes</label>
              <input
                className="custom-radio-button film-radio"
                type="radio"
                name="isyes"
                checked={newFilmData.isLayered}
                onChange={() =>
                  setNewFilmData((lay) => ({ ...lay, isLayered: true }))
                }
              />
              <label className="layercheckrow">No</label>
              <input
                className="custom-radio-button film-radio"
                defaultChecked={!newFilmData.isLayered}
                checked={!newFilmData.isLayered}
                type="radio"
                name="isyes"
                onChange={() =>
                  setNewFilmData((lay) => ({ ...lay, isLayered: false }))
                }
              />
            </div>
          </div>
          <div className="totalcostfilm">
            <label>Total Cost of the Film/kg</label>
            <input
              type="text"
              value={newFilmData.totalCost}
              name="totalCost"
              onChange={onChange}
              placeholder=""
              disabled={!newFilmData.isLayered ? false : true}
            />
            <button
              className={
                newFilmData.isLayered && save ? "addfilmbtn" : "addfilmbtn fbtn"
              }
              onClick={() => {
                saveFilmData();
                navigate(-1);
              }}
            >
              Save
            </button>
          </div>
        </div>
        {newFilmData.isLayered && (
          <div>
            {layers.map((ld) => (
              <NewFilmLayer
                layerData={ld}
                updateLayerData={updateLayerData}
                filmData={newFilmData}
                updateTotalCost={updateTotalCost}
              />
            ))}
            <button className="addlayerbtn" onClick={addNewLayer}>
              <i
                class="bi bi-plus-lg"
                style={{ fontSize: 16, alignItems: "center" }}
              ></i>
              Add Layer
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AddNewFilm;
