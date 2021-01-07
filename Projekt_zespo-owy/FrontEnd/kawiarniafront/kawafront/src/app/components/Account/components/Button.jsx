import React, { useState } from "react";
import { kURL } from "../../../helpers/consts";
import getFetchHeader from "../../../helpers/getFetchHeader";
import useToken from "../../../hooks/useToken";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
const Button = ({ children, type, callback }) => {
  const history = useHistory();
  const token = useToken();
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.data);
  const [isClicked, setIsClicked] = useState(false);
  function handleClick() {
    switch (type) {
      case "save":
        if (!isClicked) {
          console.log(user);
          fetch(
            `${kURL}/users`,
            getFetchHeader("PUT", token, JSON.stringify(user))
          )
            .then((res) => res.json())
            .then((res) => {
              if (res.status) {
                switch (res.status) {
                  case 406:
                    toast.error(`${t("Incorrect")}  ${t("is")}`);
                    toast.error(t(res.message));
                    setIsClicked(false);
                    break;
                  case 200:
                    toast.success(t("Your changes has saved"), {
                      onClose: () => {
                        history.push("/panel");
                      },
                    });
                    break;
                  default:
                    break;
                }
              }
            })
            .catch((err) => toast.error(err));
        }

        break;
      case "remove":
        if (!isClicked) {
          callback(true);
        }
        setIsClicked(true);
        break;
      case "goBack":
        history.push("/panel");
        break;
      default:
        break;
    }
  }
  return (
    <button onClick={handleClick} className="account__button">
      {children}
    </button>
  );
};
export default Button;
