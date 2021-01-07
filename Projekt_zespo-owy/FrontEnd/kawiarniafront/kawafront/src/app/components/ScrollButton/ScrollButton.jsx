import React from "react";
import { elementScrollIntoView } from "../../helpers";
import "./ScrollButton.scss";
function  ScrollButton({goTo}) {
  function handleClick() {
    elementScrollIntoView(goTo);
  }
  return (
    <button onClick={handleClick} className="scrollButton">
      &#129047;
    </button>
  );
}
export default ScrollButton;
