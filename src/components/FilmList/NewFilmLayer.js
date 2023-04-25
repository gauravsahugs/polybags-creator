import React, { useEffect } from "react";
import LayerItemTable from "./LayerItemTable";
import { v4 as uuid } from "uuid";

function NewFilmLayer({
  layerData,
  updateLayerData,
  filmData,
  updateTotalCost,
}) {
  const { id: layerId, layerName, ratio, layerCost, rows } = layerData;

  const getRoundVal = (val) => {
    return Math.round((val + Number.EPSILON) * 100) / 100;
  };
  const onChange = (e) => {
    updateLayerData(layerId, [e.target.name], e.target.value);
  };

  const addNewRow = () => {
    const newRows = [...rows];
    newRows.push({ rowId: uuid(), name: "", qty: "0", rate: "0" });
    updateLayerData(layerId, "rows", newRows);
  };

  const updateRowData = (rowId, key, value) => {
    const newRows = rows.map((r) => {
      if (r.rowId === rowId) r[key] = value;
      return r;
    });
    updateLayerData(layerId, "rows", newRows);
  };

  useEffect(() => {
    updateTotalCost();
  }, [layerCost, ratio]);

  return (
    <div className="addinglayers">
      <div className="containeraddinglayer">
        <div className="addinglayer">
          <label>Name of the Layer</label>
          <input
            className="inputaddinglayer"
            type="text"
            value={layerName}
            name="layerName"
            onChange={onChange}
            placeholder=""
            required
          />
        </div>
        <div>
          <LayerItemTable
            className="table"
            addNewRow={addNewRow}
            updateRowData={updateRowData}
            updateLayerData={updateLayerData}
            rows={rows}
            newFilm={filmData}
            layerId={layerId}
          />
        </div>
      </div>
      <div className="totalcostlayer">
        <label>Total Cost/kg</label>
        <input
          type="text"
          value={layerCost}
          name="layerCost"
          className="layercost"
          onChange={onChange}
          placeholder=""
          disabled
          required
        />
        <label>Ratio</label>
        <input
          type="text"
          className="tcl-ratio"
          value={ratio}
          min="0"
          max="1"
          name="ratio"
          onChange={onChange}
          placeholder=""
          required
        />
        <label>Layer Cost</label>
        <input
          type="text"
          value={parseFloat(layerCost) * parseFloat(ratio)}
          name="layerCost"
          className="layercost"
          // onChange={onChange}
          disabled
          placeholder=""
          required
        />
      </div>
    </div>
  );
}

export default NewFilmLayer;
