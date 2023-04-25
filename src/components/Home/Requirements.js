import React, { useContext, useEffect } from "react";
import FilmContext from "../../context/FilmContext";
import PrintingContext from "../../context/PrintingContext";
import StriosContext from "../../context/StriosContext";
import TintContext from "../../context/TintContext";
import BagContext from "../../context/BagContext";
import ExtrusionContext from "../../context/ExtrusionContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { numberFormat } from "../numberFormat";

const Requirements = ({ quoteId, quotationFormData, setQuotationFormData }) => {
  const { allFilmsData } = useContext(FilmContext);
  const { allStriosData } = useContext(StriosContext);
  const { allPrintingData } = useContext(PrintingContext);
  const { allTintData } = useContext(TintContext);
  const { allExtrutionData } = useContext(ExtrusionContext);
  const { allBagData } = useContext(BagContext);

  useDocumentTitle("Requirements");

  const {
    isGuzzetSelected,
    isSteriosSelected,
    isPrintingSelected,
    isExtrusionSelected,
    isTintSelected,
    isBagShapeSelected,
    isBagMakingSelected,

    noOfPieces,
    additionalPiecesNumbers,
    additionalPieces,
    totalNoOfPieces,

    bagInputValue,

    leftGuzzetOfMaterial,
    rightGuzzetOfMaterial,

    widthOfMaterial,
    lengthOfMaterial,
    weightOfMaterial,
    thicknessOfMaterial,
    dimensions,

    filmID,
    costOfFilm,
    printID,
    costOfPrint,
    steriosID,
    costOfSterios,
    tintID,
    costOfTint,
    bagID,
    costOfBag,
    extrusionID,
    costOfExtrusion,
  } = quotationFormData;

  useEffect(() => {
    const totalWidth =
      Number(widthOfMaterial) +
      Number(leftGuzzetOfMaterial) +
      Number(rightGuzzetOfMaterial);

    const result1 =
      (totalWidth * Number(lengthOfMaterial) * Number(thicknessOfMaterial)) /
      3300;

    const numberOfPiecesPerKg = 1000 / result1;
    const additionalPiecesPerKg = numberOfPiecesPerKg * 1.1;

    const totalPieces = Number(numberOfPiecesPerKg) * Number(weightOfMaterial);
    const additionalPiecesNumber =
      Number(additionalPiecesPerKg) * Number(weightOfMaterial);

    const dimensions = Number(totalWidth) + " X " + Number(lengthOfMaterial);

    const estimatedCostOfMaterial =
      (Number(costOfFilm) +
        Number(costOfPrint) +
        Number(costOfExtrusion) +
        Number(costOfTint) +
        Number(costOfSterios) +
        Number(bagInputValue)) *
      Number(weightOfMaterial);

    setQuotationFormData({
      ...quotationFormData,
      noOfPieces: numberOfPiecesPerKg,
      totalNoOfPieces: totalPieces,
      estimatedCostValue: estimatedCostOfMaterial,
      dimensions: dimensions,
      additionalPieces: additionalPiecesPerKg,
      additionalPiecesNumbers: additionalPiecesNumber,
    });
  }, [
    widthOfMaterial,
    leftGuzzetOfMaterial,
    rightGuzzetOfMaterial,
    lengthOfMaterial,
    thicknessOfMaterial,
    weightOfMaterial,
  ]);

  return (
    <div className="container-req">
      <div className="container-requirement">
        <div className="requirement-header">Required Information</div>
        <div className="rows">
          <div className="dropdown__div">
            <div className="input-field">
              <label>
                Films<sup>*</sup>
              </label>
              <div className="cost__dropdown">
                <div className="dropdown-wrapper">
                  <select
                    className="textfield-pr"
                    name="filmID"
                    value={filmID}
                    onChange={(e) => {
                      const filmCost = allFilmsData.find(
                        (film) => film.id == e.target.value
                      ).cost;

                      setQuotationFormData({
                        ...quotationFormData,
                        filmID: e.target.value,
                        costOfFilm: filmCost,
                      });
                    }}
                  >
                    <option value="" selected disabled>
                      {!quoteId ? "----- Select -----" : filmID}
                    </option>
                    {allFilmsData.map((eachFilm) => {
                      return (
                        <option key={eachFilm.id} value={eachFilm.id}>
                          {eachFilm.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {!isNaN(costOfFilm) ? (
                  <div className="cost__text__radio__Btn">
                    <p>Film Cost</p>
                    <p> :</p>
                    <p>{numberFormat(costOfFilm)}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* ------------------------Extrusion--------- */}
            <div className="layercheck2">
              <label>Extrusion</label>
              <div className="radiobtn-container">
                <input
                  type="radio"
                  className="custom-radio-button"
                  name="isExtrutionSelected"
                  checked={isExtrusionSelected}
                  value={isExtrusionSelected}
                  onChange={() =>
                    setQuotationFormData({
                      ...quotationFormData,
                      isExtrusionSelected: true,
                    })
                  }
                />
                <label className="">Yes</label>
                <input
                  type="radio"
                  className="custom-radio-button"
                  name="isExtrutionSelected"
                  value={isExtrusionSelected}
                  checked={!isExtrusionSelected}
                  onChange={() =>
                    setQuotationFormData({
                      ...quotationFormData,
                      isExtrutionSelected: false,
                      extrusionID: "",
                    })
                  }
                />
                <label className="">No</label>
              </div>
            </div>
            {isExtrusionSelected ? (
              <>
                <label>
                  Select Extrusion<sup>*</sup>
                </label>
                <div className="cost__dropdown">
                  <div className="dropdown-wrapper">
                    <select
                      className="textfield-pr"
                      name="extrusionID"
                      value={extrusionID}
                      onChange={(e) => {
                        const extrusionCost = allExtrutionData.find(
                          (extrusion) => extrusion.id == e.target.value
                        ).cost;
                        setQuotationFormData({
                          ...quotationFormData,
                          extrusionID: e.target.value,
                          costOfExtrusion: extrusionCost,
                        });
                      }}
                    >
                      <option value="" selected disabled>
                        {/* "----- Select -----" */}
                        {!quoteId ? "----- Select -----" : extrusionID}
                      </option>
                      {allExtrutionData.map((eachExtrusion) => {
                        return (
                          <option
                            key={eachExtrusion.id}
                            value={eachExtrusion.id}
                          >
                            {eachExtrusion.cost}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {!isNaN(costOfExtrusion) ? (
                    <div className="cost__text__radio__Btn">
                      <p>Extrusion Cost</p>
                      <p> :</p>
                      <p>{numberFormat(costOfExtrusion)}</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="requirement-header"> Measurements</div>
        <div className="rows">
          <div className="row4">
            {/*----------------------- Width --------------------------*/}
            <div className="exinput">
              <label>
                Width<sup>*</sup>
              </label>
              <input
                type="text"
                name="widthOfMaterial"
                placeholder="Width"
                value={widthOfMaterial ? widthOfMaterial : ""}
                onChange={(e) =>
                  setQuotationFormData({
                    ...quotationFormData,
                    widthOfMaterial: e.target.value,
                  })
                }
              />
            </div>

            {/*----------------------- Length --------------------------*/}
            <div className="exinput">
              <label>
                Length<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Length"
                name="lengthOfMaterial"
                value={lengthOfMaterial ? lengthOfMaterial : ""}
                onChange={(e) =>
                  setQuotationFormData({
                    ...quotationFormData,
                    lengthOfMaterial: e.target.value,
                  })
                }
              />
            </div>

            {/*----------------------- Thickness --------------------------*/}
            <div className="exinput">
              <label>
                Thickness<sup>*</sup>
              </label>
              <input
                type="text"
                placeholder="Thickness"
                name="thicknessOfMaterial"
                value={thicknessOfMaterial ? thicknessOfMaterial : ""}
                onChange={(e) =>
                  setQuotationFormData({
                    ...quotationFormData,
                    thicknessOfMaterial: e.target.value,
                  })
                }
              />
            </div>

            {/*----------------------- Pieces --------------------------*/}
            <div className="exinput borderless-input">
              <label>Pieces/Kg</label>

              <input
                type="text"
                name="noOfPieces"
                // value={noOfPieces ? Number(noOfPieces.toFixed(1)) : '0'}
                value={
                  isBagShapeSelected
                    ? additionalPieces
                    : noOfPieces === Infinity
                    ? "0"
                    : Number(noOfPieces).toFixed(1)
                }
                disabled="disabled"
              />
            </div>
          </div>
          <div className="rows">
            {/*----------------------- Guzzet --------------------------*/}
            <div className="layercheck2">
              <>Guzzet</>
              <div className="radiobtn-container">
                <input
                  type="radio"
                  className="custom-radio-button"
                  name="isGuzzetSelected"
                  checked={isGuzzetSelected}
                  value={isGuzzetSelected}
                  onChange={(e) =>
                    setQuotationFormData({
                      ...quotationFormData,
                      isGuzzetSelected: true,
                    })
                  }
                />
                <label>Yes</label>

                <input
                  type="radio"
                  className="custom-radio-button"
                  name="isGuzzetSelected"
                  value={isGuzzetSelected}
                  checked={!isGuzzetSelected}
                  onChange={() =>
                    setQuotationFormData({
                      ...quotationFormData,
                      isGuzzetSelected: false,
                      leftGuzzetOfMaterial: "",
                      rightGuzzetOfMaterial: "",
                    })
                  }
                />
                <label>No</label>
              </div>
            </div>
            {isGuzzetSelected ? (
              <div className="guzzet__inputs">
                <div className="exinput">
                  <label>
                    Left Guzzet<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="leftGuzzetOfMaterial"
                    value={leftGuzzetOfMaterial ? leftGuzzetOfMaterial : ""}
                    placeholder="Left Guzzet"
                    onChange={(e) =>
                      setQuotationFormData({
                        ...quotationFormData,
                        leftGuzzetOfMaterial: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="exinput">
                  <label>
                    Right Guzzet<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="rightGuzzetOfMaterial"
                    placeholder="Right Guzzet"
                    value={rightGuzzetOfMaterial ? rightGuzzetOfMaterial : ""}
                    onChange={(e) =>
                      setQuotationFormData({
                        ...quotationFormData,
                        rightGuzzetOfMaterial: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            {/*----------------------- Weight --------------------------*/}
            <div className="row4 row5">
              <div className="exinput">
                <label>
                  Weight (kg)<sup>*</sup>
                </label>

                <input
                  type="text"
                  placeholder="Weight"
                  name="weightOfMaterial"
                  value={weightOfMaterial ? weightOfMaterial : ""}
                  onChange={(e) =>
                    setQuotationFormData({
                      ...quotationFormData,
                      weightOfMaterial: e.target.value,
                    })
                  }
                />
              </div>
              <div className="exinput borderless-input">
                <label>Total No. of Pieces</label>
                <input
                  type="text"
                  name="totalNoOfPieces"
                  disabled="disabled"
                  value={
                    isBagShapeSelected
                      ? additionalPiecesNumbers
                      : totalNoOfPieces
                      ? Math.round(totalNoOfPieces)
                      : "0"
                  }
                />
              </div>
              <div className="exinput borderless-input">
                <label>Dimensions</label>
                <input
                  type="text"
                  name="dimensions"
                  disabled="disabled"
                  value={
                    quotationFormData.dimensions
                      ? quotationFormData.dimensions
                      : "0"
                  }
                />
              </div>
            </div>
          </div>
          {/*----------------------- Printing --------------------------*/}

          <div className="layercheck2">
            <>Printing</>
            <div className="radiobtn-container">
              <input
                type="radio"
                className="custom-radio-button"
                name="isPrintingSelected"
                checked={isPrintingSelected}
                value={isPrintingSelected}
                onChange={() =>
                  setQuotationFormData({
                    ...quotationFormData,
                    isPrintingSelected: true,
                  })
                }
              />
              <label className="">Yes</label>

              <input
                type="radio"
                className="custom-radio-button"
                name="isPrintingSelected"
                value={isPrintingSelected}
                checked={!isPrintingSelected}
                onChange={() =>
                  setQuotationFormData({
                    ...quotationFormData,
                    isPrintingSelected: false,
                    printID: "",
                  })
                }
              />
              <label className="">No</label>
            </div>
          </div>
          {isPrintingSelected ? (
            <div className="einput">
              <label>
                Select Printing Color<sup>*</sup>
              </label>
              <div className="dropdown-wrapper">
                <select
                  className="textfield-pr"
                  name="printID"
                  value={printID}
                  onChange={(e) => {
                    const printCost = allPrintingData.find(
                      (print) => print.id == e.target.value
                    ).cost;
                    setQuotationFormData({
                      ...quotationFormData,
                      printID: e.target.value,
                      costOfPrint: printCost,
                    });
                  }}
                >
                  <option value="" selected disabled>
                    {" "}
                    {/* "----- Select -----" */}
                    {!quoteId ? "----- Select -----" : printID}
                  </option>
                  {allPrintingData.map((eachPrint) => (
                    <option key={eachPrint.id} value={eachPrint.id}>
                      {eachPrint.name}
                    </option>
                  ))}
                </select>
              </div>
              {printID ? (
                <div className="cost__text__radio__Btn">
                  <p>Print Cost</p>
                  <p> :</p>
                  <p>{numberFormat(costOfPrint)}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : null}
          {/*----------------------- Sterios --------------------------*/}

          <div className="layercheck2">
            <>Sterios</>
            <div className="radiobtn-container">
              <input
                type="radio"
                className="custom-radio-button"
                checked={isSteriosSelected}
                name="isSteriosSelected"
                value={isSteriosSelected}
                onChange={(e) =>
                  setQuotationFormData({
                    ...quotationFormData,
                    isSteriosSelected: true,
                  })
                }
              />
              <label className="isSteriosSelected">Yes</label>

              <input
                type="radio"
                className="custom-radio-button"
                name="isSteriosSelected"
                value={isSteriosSelected}
                checked={!isSteriosSelected}
                onChange={(e) =>
                  setQuotationFormData({
                    ...quotationFormData,
                    isSteriosSelected: false,
                    steriosID: "",
                  })
                }
              />
              <label className="isSteriosSelected">No</label>
            </div>
          </div>
        </div>
        {isSteriosSelected ? (
          <div className="einput">
            <label>
              Select Sterios <sup>*</sup>
            </label>
            <div className="dropdown-wrapper">
              <select
                className="textfield-pr"
                name="steriosID"
                value={steriosID}
                onChange={(e) => {
                  const steriosCost = allStriosData.find(
                    (sterios) => sterios.id == e.target.value
                  ).cost;
                  setQuotationFormData({
                    ...quotationFormData,
                    steriosID: e.target.value,
                    costOfSterios: steriosCost,
                  });
                }}
              >
                <option value="" selected disabled>
                  {" "}
                  {/* "----- Select -----" */}
                  {!quoteId ? "----- Select -----" : steriosID}
                </option>
                {allStriosData.map((eachPrint) => (
                  <option key={eachPrint.id} value={eachPrint.id}>
                    {eachPrint.name}
                  </option>
                ))}
              </select>
            </div>
            {steriosID ? (
              <div className="cost__text__radio__Btn">
                <p>Sterios Cost</p>
                <p> :</p>
                <p>{numberFormat(costOfSterios)}</p>
                {/* <p>    
									{steriosID === '' ? '' : numberFormat(steriosID)}
								</p> */}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        {/*-------------------------- Tint -----------------------------*/}
        <div className="layercheck2">
          <>Tint</>
          <div className="radiobtn-container">
            <input
              type="radio"
              className="custom-radio-button"
              name="isTintSelected"
              checked={isTintSelected}
              value={isTintSelected}
              onChange={(e) =>
                setQuotationFormData({
                  ...quotationFormData,
                  isTintSelected: true,
                })
              }
            />
            <label>Yes</label>
            <input
              type="radio"
              className="custom-radio-button"
              name="isTintSelected"
              value={isTintSelected}
              checked={!isTintSelected}
              onChange={() =>
                setQuotationFormData({
                  ...quotationFormData,
                  isTintSelected: false,
                  tintID: "",
                })
              }
            />
            <label>No</label>
          </div>
        </div>
        {isTintSelected ? (
          <div className="einput">
            <label>
              Select Tint Cost<sup>*</sup>
            </label>
            <div className="dropdown-wrapper">
              <select
                className="textfield-pr"
                name="tintID"
                value={tintID}
                onChange={(e) => {
                  const tintCost = allTintData.find(
                    (tint) => tint.id == e.target.value
                  ).cost;
                  setQuotationFormData({
                    ...quotationFormData,
                    tintID: e.target.value,
                    costOfTint: tintCost,
                  });
                }}
              >
                <option value="" selected disabled>
                  {" "}
                  {/* "----- Select -----" */}
                  {!quoteId ? "----- Select -----" : tintID}
                </option>
                {allTintData.map((eachPrint) => (
                  <option key={eachPrint.id} value={eachPrint.id}>
                    {eachPrint.name}
                  </option>
                ))}
              </select>
            </div>
            {tintID ? (
              <div className="cost__text__radio__Btn">
                <p>Tint Cost</p>
                <p> :</p>
                <p>{numberFormat(costOfTint)}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}

        {/*-------------------------- Bag -----------------------------*/}
        <div className="layercheck2">
          <>Bag Making</>
          <div className="radiobtn-container">
            <input
              type="radio"
              className="custom-radio-button"
              name="isBagSelected"
              checked={isBagMakingSelected}
              value={isBagMakingSelected}
              onChange={(e) =>
                setQuotationFormData({
                  ...quotationFormData,
                  isBagMakingSelected: true,
                })
              }
            />
            <label>Yes</label>

            <input
              type="radio"
              className="custom-radio-button"
              name="isBagSelected"
              value={isBagMakingSelected}
              checked={!isBagMakingSelected}
              onChange={() =>
                setQuotationFormData({
                  ...quotationFormData,
                  isBagMakingSelected: false,
                  isBagShapeSelected: false,
                  bagInputValue: "",
                  bagID: "",
                })
              }
            />
            <label>No</label>
          </div>
        </div>
      </div>
      {/*-------------------------- Bag shapes -----------------------------*/}
      {isBagMakingSelected ? (
        <div className="layercheck2">
          <>Bag Shapes</>
          <div className="radiobtn-container">
            <input
              type="radio"
              className="custom-radio-button checkmark"
              name="isAdditionalSelected"
              checked={isBagShapeSelected}
              value={isBagShapeSelected}
              onChange={() =>
                setQuotationFormData({
                  ...quotationFormData,
                  isBagShapeSelected: true,
                })
              }
            />
            <label className="">Yes</label>

            <input
              type="radio"
              className="custom-radio-button checkmark"
              name="isAdditionalSelected"
              value={isBagShapeSelected}
              checked={!isBagShapeSelected}
              onChange={() =>
                setQuotationFormData({
                  ...quotationFormData,
                  isBagShapeSelected: false,
                  bagID: "",
                })
              }
            />
            <label>No</label>
          </div>
        </div>
      ) : (
        ""
      )}

      {isBagShapeSelected ? (
        <div className="einput">
          <label>Select Bag Shapes</label>
          <div className="dropdown-wrapper">
            <select
              className="textfield-pr"
              name="printID"
              value={bagID}
              onChange={(e) => {
                const bagCost = allBagData.find(
                  (bag) => bag.id == e.target.value
                ).cost;
                setQuotationFormData({
                  ...quotationFormData,
                  bagID: e.target.value,
                  costOfBag: bagCost,
                });
              }}
            >
              <option value="" selected disabled>
                {" "}
                {/* "----- Select -----" */}
                {!quoteId ? "----- Select -----" : bagID}
              </option>
              {allBagData.map((eachBag) => (
                <option key={eachBag.id} value={eachBag.id}>
                  {eachBag.name}
                </option>
              ))}
            </select>
          </div>
          {bagID ? (
            <div className="cost__text__radio__Btn">
              <p>Bag Cost</p>
              <p> :</p>
              <p>{numberFormat(costOfBag)}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Requirements;
