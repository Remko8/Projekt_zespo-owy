import React from "react";
import { useSelector, useDispatch } from "react-redux";
import orderActions from "../../../redux/order/actions";
import { toast } from "react-toastify";

const Button = ({ children, dataset, callbacks }) => {
  const data = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  function handleClick() {
    if (dataset) {
      const { houseNumber, place, zipcode } = dataset;
      if (
        (houseNumber.length !== 0 || null) &&
        (place.length !== 0 || null) &&
        (zipcode.length || null) !== 0
      ) {
        dispatch(orderActions.setOrderAdress(dataset));
      }else{
        dispatch(orderActions.setOrderAdress({}));
        toast.warning("Please, type correct adress!")
      }
    }
    if (callbacks) {
      callbacks.setPlace(data.place);
      callbacks.setZipcode(data.zipcode);
      callbacks.setRoad(data.road);
      callbacks.setHouseNumber(data.houseNumber);
      
    }
  }

  return (
    <button onClick={handleClick} className="adressSelector__button">
      {children}
    </button>
  );
};
export default Button;
