import React from "react";
import { useHistory } from "react-router-dom";
import "./goToMenuButton.scss";

const GoToMenuButton = ({ children, name }) => {
  const history = useHistory();

  function handleClick() {
        history.push("/panel");
  }
  return (
    <div onClick={handleClick} className="signinbutton__block">
      {children}
    </div>
  );
};
export default GoToMenuButton;
