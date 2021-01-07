import React, { useState, useEffect } from "react";
import "./AdressSelector.scss";
import { Wrapper, Container, Button, Input, Field } from "./components";
import { useDispatch, useSelector } from "react-redux";
import orderActions from "../../redux/order/actions";
import { elementScrollIntoView } from "../../helpers";
import { useTranslation } from "react-i18next";
export default function AdressSelector() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const adress = useSelector((state) => state.order.adress);
  const latLng = useSelector((state) => state.order.latLng);
  const [houseNumber, setHouseNumber] = useState("");
  const [road, setRoad] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [place, setPlace] = useState("");
  const houseregex = new RegExp("^[0-9]{1,}[A-z]{1}|^[0-9]{1,}");
  const placeregex = new RegExp("^([A-z]|[ęóąśłżźćńĘÓĄŚŁŻŹĆŃ]){1,}");
  const zipcoderegex = new RegExp("^[0-9]{2}-?[0-9]{3}");
  const shouldAbleNextButton =
    houseregex.test(houseNumber) &&
    placeregex.test(place) &&
    zipcoderegex.test(zipcode);

  const shouldAbleNextButton2 =
    (houseNumber.length !== 0 || null) &&
    (place.length !== 0 || null) &&
    (zipcode.length || null) !== 0

  const dataset = {
    houseNumber,
    road,
    zipcode,
    place,
  };
  const callbacks = {
    setHouseNumber,
    setRoad,
    setZipcode,
    setPlace,
  };

  useEffect(() => {
    return () => {
      dispatch(orderActions.setOrderAdress({}));
    };
  }, [dispatch]);
  useEffect(() => {
    if (Object.keys(adress).length !== 0 || latLng) {
      elementScrollIntoView(".payment");
    }
  }, [adress, latLng]);
  return (
    <Wrapper>
      <Container>
        <Input
          name="houseNumber"
          value={houseNumber}
          callback={setHouseNumber}
        />
        <Input name="road" value={road} callback={setRoad} />
        <Input name="zipcode" value={zipcode} callback={setZipcode} />
        <Input name="place" value={place} callback={setPlace} />
      </Container>
      <Field>
        <Button callbacks={callbacks}>{`${t("use default addressD"
        )} `}</Button>
       {shouldAbleNextButton ? (
          <Button dataset={dataset}>{`${t("confirm")} ${t("data")} `}</Button>
        ) : <Button dataset={dataset}>{`${t("fill the data")} ${t("data")} `}</Button>}
        </Field>
    </Wrapper>
  );
}

/*{shouldAbleNextButton2 ? (
          <Button dataset={dataset}>{`${t("confirm")} ${t("data")} `}</Button>
        ) : null}

zamiast:
<Button dataset={dataset}>{`${t("confirm")} ${t("data")} `}</Button>
*/