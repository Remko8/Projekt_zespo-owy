import React, { useEffect } from "react";
import "./Payment.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Block, Wrapper, P, Span } from "./components";
import { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import { kURL } from "../../helpers/consts";
import { useSelector, useDispatch } from "react-redux";
import { getFetchHeader } from "../../helpers";
import useToken from "../../hooks/useToken";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import orderActions from "../../redux/order/actions";
const Payment = ({
  isAddToBucketVisible = true,
  shouldRenderPaymentMethods = false,
  price,
  orderedProducts,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const userToken = useToken();
  const user = useSelector((state) => state.user.data);
  const order = useSelector((state) => state.order.adress);
  const latLng = useSelector((state) => state.order.latLng);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(orderActions.setLatLng(null));
    };
  }, [dispatch]);

  function handleToken(token) {
    let address;
    const { road, houseNumber, zipcode, place } = order;

    if (latLng) {
      address = {
        road,
        houseNumber,
        zipcode,
        place,
        latLng: { latitude: latLng[0], longitude: latLng[1] },
      };
    } else {
      address = {
        road,
        houseNumber,
        zipcode,
        place,
        latLng: { latitude: 0, longitude: 0 },
      };
    }
    let body = { orderedProducts, address, token: token.id };

    fetch(
      `${kURL}/payment`,
      getFetchHeader("POST", userToken, JSON.stringify(body))
    )
      .then((res) => {
        toast.info(`${t("payment")} ${t("in")} ${t("process")}`);
        return res.json();
      })
      .then((res) => {
        window.scrollTo({ x: 0, y: 0 });
        if (res.status === 406) {
          toast.error(t("Something went wrong"), {
            onClose: () => {
              history.push("/panel");
            },
          });
        } else {
          toast.success(`${t(res.message)}`, {
            onClose: () => {
              history.push("/panel");
            },
          });
        }
      })
      .catch((err) => toast.error(t(err.message)));
  }

  return (
    <Wrapper>
      {shouldRenderPaymentMethods ? (
        <Fragment>
          {navigator.onLine ? (
            <Block orderedProducts={orderedProducts} type="przelewy24">
              <StripeCheckout
                stripeKey={process.env.REACT_APP_PUBLICZNY_KEJ}
                token={handleToken}
                amount={price * 100}
                name={"Rachunek za kawe"}
                email={user.email}
                currency="PLN"
              />
              <P>
                {new Intl.NumberFormat(window.navigator.language, {
                  style: "currency",
                  currency: "PLN",
                }).format(price)}
              </P>
            </Block>
          ) : null}
          <Block orderedProducts={orderedProducts} type="onDelivery">
            <Span>{t("Payment on delivery")}</Span>
            <P>
              {new Intl.NumberFormat(window.navigator.language, {
                style: "currency",
                currency: "PLN",
              }).format(price)}
            </P>
          </Block>
        </Fragment>
      ) : null}

      {isAddToBucketVisible ? (
        <Block type="addToBucket">
          <Span>{t("add")}</Span>
          <P class="_p">{`${t("to")} ${t("bucketD")} `} </P>
        </Block>
      ) : null}
      <ToastContainer
        position="top-left"
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
};
export default Payment;
