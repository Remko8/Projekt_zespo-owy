import React from "react";
import { useHistory } from "react-router-dom";
import "./goToMenuButton.scss";

const NewOrderBack = ({ children, name }) => {
  const history = useHistory();

  function handleClick() {
        history.push("/panel");
  }
  return (
    <div onClick={handleClick} className="NewOrderBack__block">
      {children}
    </div>
  );
};
export default NewOrderBack;
