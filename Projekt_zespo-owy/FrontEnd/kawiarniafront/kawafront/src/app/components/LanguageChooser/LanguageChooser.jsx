import React from "react";
import { useTranslation } from "react-i18next";

import "./LanguageChooser.scss";
import { Wrapper, Field, Span } from "./components";
const LanguageChooser = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Span>{t("changeLanguage")}</Span>
      <Field lang="pl" />
      <Field lang="en-US" />
    </Wrapper>
  );
};
export default LanguageChooser;


//      <Field lang="de" />