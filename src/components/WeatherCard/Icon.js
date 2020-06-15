import React from "react";
import styled from "@emotion/styled";

const Icon = (props) => {
  const Icon = styled.img`
    width: 40%;
  `;

  var icon = "";
  switch (props.condition) {
    case "Clear":
      icon = "";
      break;
    case "Clouds":
      icon = "";
      break;
    default:
      break;
  }

  return <Icon className="icon" src={icon} alt="weather icon" />;
};

export default Icon;
