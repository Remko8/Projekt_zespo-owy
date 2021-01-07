import React, { Fragment, lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./NewOrder.scss";
import CoffeeCup from "../CoffeeCup/CoffeeCup";
import Payment from "../Payment/Payment";
import { Coffee, Wrapper, Section, Button, P, Text } from "./components";
import NewOrderBack from "../GlobalComponents/NewOrderBack";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import TextLoop from "react-text-loop";
import orderActions from "../../redux/order/actions";
import { useTranslation } from "react-i18next";
const VideoBackground = lazy(() =>
  import("../VideoBackground/VideoBackground")
);
function NewOrder() {
  const price = useSelector((state) => state.order.price);
  const name = useSelector((state) => state.order.coffeeName);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(orderActions.clearOrder());
    };
  }, [dispatch]);
  useEffect(() => {
    if (name.length !== 0) {
      document.querySelector(".coffeeCup").scrollIntoView({
        block: "start",
        behavior: "smooth",
        inline: "nearest",
      });
    }
  }, [name]);
  return (
    <Fragment>
      <div class="back2">
        <NewOrderBack>{t("goBack")}</NewOrderBack>
      </div>
      <Suspense fallback={<LoadingIndicator />}>
        <Section>
          <Text>
            <TextLoop mask={true} fade={false}>
              <P>{`${t("choose")} ${t("coffee")}`}</P>
              <P>{t("or")}</P>
            </TextLoop>
            <TextLoop delay={500} mask={true} fade={false}>
              <P>{t("created")}</P>
              <P>{t("compose")}</P>
            </TextLoop>
            <TextLoop delay={1000} mask={true} fade={false}>
              <P>{`${t("by")} ${t("us")}`}</P>
              <P>{`${t("your")} ${t("own")}`}</P>
            </TextLoop>
            <Button> &#129047;</Button>
          </Text>
        </Section>

        <Wrapper>
          <Coffee name="Latte" />
          <Coffee name="Mocca" />
          <Coffee name="Americana" />
          <Coffee name="FlatWhite" />
          <Coffee name="Espresso" />
          <Coffee name="YourOwn" />
        </Wrapper>
        {name.length > 0 ? (
          <Section>
            <CoffeeCup />
          </Section>
        ) : null}

        {price > 0 ? (
          <Section>
            <Payment />
          </Section>
        ) : null}
        <VideoBackground indexOfVideo={6} />
      </Suspense>
    </Fragment>
  );
}
export default NewOrder;
