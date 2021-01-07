import React, { lazy, Suspense } from "react";
import "./Menu.scss";
import { useTranslation } from "react-i18next";
import { Wrapper, Block, Container, Text } from "./components";
import TextLoop from "react-text-loop";
import LanguageChooser from "../LanguageChooser/LanguageChooser";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
const VideoBackground = lazy(() =>
  import("../VideoBackground/VideoBackground")
);
const Menu = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Suspense fallback={<LoadingIndicator />}>
        <Container>
          <Block>
            <LanguageChooser />
          </Block>
          <Block name="newOrder">{t("new order")}</Block>
          <Block name="bucket">{t("bucket")}</Block>
          <Block name="history">{t("history")}</Block>          
          <Block name="account">{t("account")}</Block>          
          <Block name="logout">{t("logout")}</Block>
        </Container>
        <Container>
          <Text type="title">{`${t('coffeeM')} `}</Text>

          <TextLoop mask={true}>
            <Text type="info">
              {`Ludwik van Beethoven ${t("was her big fan"
              )} `}{" "}
            </Text>
            <Text type="info">
              {`${t("in USA it was beverage drinked only in dinnertime")}  `}
            </Text>
            <Text type="info">
              {`${t("her first advertisement was leaflet")} `}
            </Text>
            <Text type="info">
              {`${t("has over XI centuries")} `}
            </Text>
          </TextLoop>
        </Container>
        <VideoBackground indexOfVideo={0} />
      </Suspense>
    </Wrapper>
  );
};

export default Menu;
