import React from "react";
import "./styles.scss";

const downIcon = require("assets/images/deposit/feather-arrow-down-circle.png");
const upIcon = require("assets/images/deposit/feather-arrow-up-circle.png");

const FeatherArrowIcon = ({ isDown, custom }) => {
  const iconURL = Boolean(isDown) ? downIcon : upIcon;
  return (
    <img
      className={`arrow-icon ${isDown ? "icon-down" : "icon-up"} ${custom}`}
      src={iconURL}
      alt={isDown ? "icon down" : "icon up"}
    />
  );
};

export default FeatherArrowIcon;