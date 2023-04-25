export const isActiveTable = (active, isDisabled) => {
  return active === "Active"
    ? isDisabled
    : active === "Deactive"
    ? !isDisabled
    : true;
};

export const isActiveSearchBar = (active) => {
  return active !== "Active" && active !== "Deactive";
};
