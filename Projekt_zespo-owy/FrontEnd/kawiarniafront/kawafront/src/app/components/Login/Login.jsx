import React, { lazy } from "react";
import "./Login.scss";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import useToken from "../../hooks/useToken";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  Button,
  Container,
  Field,
  Formulee,
  Input,
  Label,
  Span,
  Wrapper,
} from "./components";
import LanguageChooser from "../LanguageChooser/LanguageChooser";
const VideoBackground = lazy(() =>
  import("../VideoBackground/VideoBackground")
);
export default function Login() {
  const isFetching = useSelector((state) => state.user.isFetching);
  const error = useSelector((state) => state.user.error);
  const { t } = useTranslation();
  const token = useToken();
  function renderNotification() {
    toast.error(`${t(error)}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return (
    <Wrapper>
      {token ? (
        <Redirect to="/panel" />
      ) : (
        <Container>
          {isFetching ? (
            <LoadingIndicator />
          ) : (
            <Formulee>
              <Field>
                <Input name="username" />
                <Span type="highlight" />
                <Span type="bar" />
                <Label>{t("username")}</Label>
              </Field>
              <Field>
                <Input name="password" type="password" />
                <Span type="highlight" />
                <Span type="bar" />
                <Label>{t("password")}</Label>
              </Field>
              <Field>
                <Button name="forgottenPassword">{t('forgotPassword')}</Button>
              </Field>
              <Field>
                <Button isSubmit={true} name="login">{t("login")}</Button>
              </Field>
              <Field>
                <Button name="signIn">{t("signIn")}</Button>
              </Field>{" "}
              <Field>
                <LanguageChooser />
              </Field>
              {error ? renderNotification() : null}
            </Formulee>
          )}
          <VideoBackground indexOfVideo={1} />
        </Container>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Wrapper>
  );
}
