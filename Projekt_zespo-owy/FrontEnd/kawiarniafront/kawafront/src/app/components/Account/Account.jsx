import React, { useState, lazy, Suspense, useEffect } from "react";
import "./Account.scss";
import userActions from "../../redux/user/actions";
import {
  Field,
  Span,
  Label,
  Container,
  Text,
  Input,
  Wrapper,
  Button,
} from "./components";
import Modal from "react-modal";
import { Select } from "../SignIn/components";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RemoveAccountModal from "../RemoveAccountModal/RemoveAccountModal";
import { useSelector, useDispatch } from "react-redux";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import useToken from "../../hooks/useToken";
import { kURL } from "../../helpers/consts";
import { getFetchHeader } from "../../helpers";
const VideoBackground = lazy(() =>
  import("../VideoBackground/VideoBackground")
);
function Account() {
  const username = useSelector((state) => state.user.data.username);

  const dispatch = useDispatch();
  const token = useToken();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  function closeModal() {
    setIsModalOpen(false);
  }
  useEffect(() => {
    return () => {
      fetch(`${kURL}/users`, getFetchHeader("GET", token, null))
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            switch (res.status) {
              case 200:
                dispatch(userActions.fetchUser(res.user));
                break;
              default:
                toast.error(t("Someting went wrong."));
            }
          }
        })
        .catch((err) => toast.error(t(err)));
    };
  }, [dispatch, t, token]);
  return (    
    <Wrapper>        
      <Suspense>
        <Container fallback={<LoadingIndicator />}>
          <Text>Konto: {username} </Text>          
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
            <Span type="highlight" />
            <Span type="bar" />
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
          <Button type="goBack">{t("goBack")} </Button>
          <Button type="save">{t("save")} </Button>
          <Button type="remove" callback={setIsModalOpen}>
            {t("remove")}{" "}
          </Button>
          <Modal
            onRequestClose={closeModal}
            className="Modal"
            overlayClassName="Overlay"
            isOpen={isModalOpen}
            ariaHideApp={false}
          >
            <RemoveAccountModal onClose={setIsModalOpen} />
          </Modal>
        </Container>
        <VideoBackground indexOfVideo={4} shouldVideoLoop={false} />
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
      </Suspense>
    </Wrapper>
  );
}
export default Account;
