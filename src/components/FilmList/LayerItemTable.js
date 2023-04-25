import React from "react";

function LayerItemTable({
  updateRowData,
  rows,
  newFilm,
  addNewRow,
  layerId,
  updateLayerData,
}) {
  const getRoundVal = (val) => {
    return Math.round((val + Number.EPSILON) * 100) / 100;
  };

  const onChange = (e) => {
    updateRowData(e.target.dataset.identity, e.target.name, e.target.value);
    if (e.target.name === "qty" || e.target.name === "rate") {
      const layerQty = rows.reduce(
        (acc, curr) => acc + (curr.qty ? parseFloat(curr.qty) : 0),
        0
      );
      const layerCost = rows.reduce(
        (acc, curr) =>
          acc +
          (curr.qty && curr.rate
            ? parseFloat(curr.qty) * parseFloat(curr.rate)
            : 0),
        0
      );
      updateLayerData(layerId, "layerCost", getRoundVal(layerCost / layerQty));
    }
  };

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th className="th1">Name</th>
            <th className="th1">Qty(Kg)</th>
            <th className="th1">Rate(Rs/Kg)</th>
            <th className="th2">Total Cost(Rs)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((layerItem) => (
            <tr>
              <td className="td1">
                <input
                  data-identity={layerItem.rowId}
                  type="text"
                  value={layerItem.name}
                  name="name"
                  onChange={onChange}
                />
              </td>
              <td className="td1">
                <input
                  data-identity={layerItem.rowId}
                  type="text"
                  value={layerItem.qty}
                  name="qty"
                  onChange={onChange}
                />
              </td>
              <td className="td1">
                <input
                  data-identity={layerItem.rowId}
                  type="text"
                  value={layerItem.rate}
                  name="rate"
                  onChange={onChange}
                />
              </td>
              <td
                className="td2"
                // onChange={onChange}
              >
                <input
                  type="text"
                  // value={layerItem.rate && layerItem.qty && parseFloat(layerItem.rate) !== 0 ? getRoundVal(parseFloat(layerItem.qty)/parseFloat(layerItem.rate)) : 0}
                  value={
                    layerItem.rate && layerItem.qty
                      ? getRoundVal(
                          parseFloat(layerItem.qty) * parseFloat(layerItem.rate)
                        )
                      : 0
                  }
                  name="totalCost"
                  disabled
                />
              </td>
            </tr>
          ))}
          <tr>
            <th className="th1">Total</th>
            <th
              className="th1"
              // onChange={onChange}
            >
              <input
                type="text"
                value={rows.reduce(
                  (acc, curr) => acc + (curr.qty ? parseFloat(curr.qty) : 0),
                  0
                )}
                name="layerQuantityTotal"
                disabled
              />
            </th>
            <th className="th1"></th>
            <th
              className="th2"
              // onChange={onChange}
            >
              <input
                type="text"
                // value={getRoundVal(rows.reduce((acc, curr) => acc + parseFloat(curr.qty), 0)/rows.reduce((acc, curr) => acc + parseFloat(curr.rate), 0))}
                // value={getRoundVal(rows.reduce((acc, curr) => acc + ((curr.qty && curr.rate && parseFloat(curr.rate) !== 0) ? parseFloat(curr.qty)/parseFloat(curr.rate) : 0), 0))}
                value={getRoundVal(
                  rows.reduce(
                    (acc, curr) =>
                      acc +
                      (curr.qty && curr.rate
                        ? parseFloat(curr.qty) * parseFloat(curr.rate)
                        : 0),
                    0
                  )
                )}
                name="layerCostTotal"
                disabled
              />
            </th>
          </tr>
        </tbody>
      </table>
      <button className="btn add addrow" onClick={addNewRow}>
        <i
          class="bi bi-plus-lg"
          style={{ fontSize: 16, alignItems: "center" }}
        ></i>
        Add Row
      </button>
    </div>
  );
}

export default LayerItemTable;
