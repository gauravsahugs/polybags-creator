import axios from "axios";
import React from "react";

function country() {
  const cn = () => {
    axios
      .get("https://api.countrystatecity.in/v1/countries")
      .then((res) => console.log(res.data));
  };

  return <div>{cn}</div>;
}

export default country;
