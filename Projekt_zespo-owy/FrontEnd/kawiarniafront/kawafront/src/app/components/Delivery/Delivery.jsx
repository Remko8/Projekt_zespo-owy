import React, { Fragment } from "react";
import "./Delivery.scss";
import { useState } from "react";
import FadeIn from "react-fade-in";
import { Block, Span, Wrapper, P } from "./components";
import { useTranslation } from "react-i18next";
import Map from "../Map/Map";
import AdressSelector from "../AdressSelector/AdressSelector";

import {
  Wrapper as AccountWrapper,
  Container,
  Field,
  Input,
  Label,
} from "../Account/components";
function Delivery() {
  const [selectedView, setSelectedView] = useState("menu");
  const { t } = useTranslation();
  function getView() {
    switch (selectedView) {
      case "menu":
        return (
          <Fragment>
            <FadeIn
              className="delivery__FadeIn"
              childClassName="delivery__FadeInChild"
            >
              <Block id="choosedAdress" setSelectedView={setSelectedView}>
                <Span>{`${t("use")} ${t("addressD")} `}</Span>
              </Block>
              <Block id="choosedGeolocation" setSelectedView={setSelectedView}>
                <Span>
                  {t("use geolocalization")}
                </Span>
                <P>
                  {t("or choose on map")}
                </P>
              </Block>
            </FadeIn>
          </Fragment>
        );
      case "choosedAdress":
        return <AdressSelector />;
      case "choosedNewAdress":
        return (
          <FadeIn
            className="delivery__FadeIn"
            childClassName="delivery__FadeInChild"
          >
            <AccountWrapper>
              <Container>
                <Field>
                  <Input name="houseNumber" />
                  <Span type="highlight" />
                  <Span type="bar" />
                  <Label>{t("houseNumber")}</Label>
                </Field>
                <Field>
                  <Input name="road" />
                  <Label>{t("road")}</Label>
                </Field>

                <Field>
                  <Input name="zipcode" />
                  <Span type="highlight" />
                  <Span type="bar" />
                  <Label>{t("zipcode")}</Label>
                </Field>
                <Field>
                  <Input name="place" />
                  <Span type="highlight" />
                  <Span type="bar" />
                  <Label>{t("place")}</Label>
                </Field>
              </Container>
            </AccountWrapper>
          </FadeIn>
        );
      case "choosedGeolocation":
        return (
          <FadeIn
            className="delivery__FadeIn"
            childClassName="delivery__FadeInChild"
          >
            <Map />
          </FadeIn>
        );
      default:
        return <Fragment />;
    }
  }
  return (
    <Wrapper>
      {selectedView !== "menu" ? (
        <Block id="menu" setSelectedView={setSelectedView}>
          {`${t("goBack")} `}
        </Block>
      ) : null}
      {getView()}
    </Wrapper>
  );
}
export default Delivery;
