import React from "react";
import "./SignIn.scss";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import userActions from "../../redux/user/actions";
import {
  Button,
  Field,
  Formulee,
  Wrapper,
  Span,
  Label,
  Input,
  Select,
} from "./components";
import GoToMenuButton from "../GlobalComponents/GoToMenuButton";
import { useTranslation } from "react-i18next";
import { Text } from "../Account/components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { useHistory } from "react-router-dom";
import { reduceEachTrailingCommentRange } from "typescript";
function SignIn() {
  const isFetching = useSelector((state) => state.user.isFetching);
  const isRegistered = useSelector((state) => state.user.isRegistered);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <Wrapper>
      {isRegistered
        ? (() => {
            toast.success(t('registered'), {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              onClose: () => history.push("/"),
            });
          })()
        : null}
      {error
        ? (() => {
          toast.warn(`${t('Incorrect')} ${t('is')}`)
            toast.warn(`${t(error)}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,              
              onClose: () => dispatch(userActions.deleteError()),
            });
          })()
        : null}
      {isFetching ? (
        <LoadingIndicator />
      ) : (     
        <Formulee>
        <div class="toLeft">
          <GoToMenuButton ClassName="signIn">{t("goBack")}</GoToMenuButton>
        </div>
          <Text>{t("account")}</Text>
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
            <Input name="email" />
            <Span type="highlight" />
            <Span type="bar" />
            <Label>E-MAIL</Label>
          </Field>
          <Field>
            <Input name="telephone" />
            <Span type="highlight" />
            <Span type="bar" />
            <Label>{t("phoneNumber")}</Label>
          </Field>
          <Text>{t("personalData")}</Text>
          <Field>
            <Input name="firstName" />
            <Span type="highlight" />
            <Span type="bar" />
            <Label>{t("firstName")}</Label>
          </Field>
          <Field>
            <Input name="lastName" />
            <Span type="highlight" />
            <Span type="bar" />
            <Label>{t("lastName")}</Label>
          </Field>
  
          <Field>
            <Span>{t("day")}</Span>
            <Select type="day" />
            <Span>{t("month")}</Span>
            <Select type="month" />
            <Span>{t("year")}</Span>
            <Select type="year" />
          </Field>
          <Text>{t("adress")}</Text>
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
          <Field>
            <Button>{t("register")}</Button>
          </Field>
        </Formulee>
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
export default SignIn;
