import React from "react";
import { useParams } from "react-router-dom";

function HeaderTitle({ headTitle }) {
  const { active } = useParams();
  return (
    <div className="clientheading">
      <strong>{headTitle}</strong>
      <div className="heading-separator">&nbsp;&nbsp;{">"}&nbsp;&nbsp;</div>
      <div className="subHeadingTitle">{active}</div>
    </div>
  );
}

export default HeaderTitle;
