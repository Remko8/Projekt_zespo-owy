import React, { Fragment, lazy, Suspense } from "react";
import "./History.scss";
import historyActions from "../../redux/history/actions";
import { useSelector, useDispatch } from "react-redux";
import CountUp from "react-countup";
import Details from "../Details/Details";
import Circle from "../Circle/Circle";
import { Block, Wrapper, Field, Text } from "./components";
import GoBackButton from "../GlobalComponents/GoBackButton"
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import useToken from "../../hooks/useToken";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
const VideoBackground = lazy(() =>
  import("../VideoBackground/VideoBackground")
);
function History() {
  const historyItems = useSelector((state) => state.history.historyItems);
  const itemCounter = useSelector((state) => state.history.itemCounter);

  const isFetching = useSelector((state) => state.history.isFetching);
  const token = useToken();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(historyActions.fetchHistory(token));
  }, [dispatch, token]);
  return (
    <Wrapper>
      <Suspense fallback={<LoadingIndicator />}>
        <div class="back">
          <GoBackButton>{t("goBack")}</GoBackButton>
        </div>
        <Block>
          <Text> {t("drinkedBeverages")}</Text>
          {isFetching ? (
            <LoadingIndicator />
          ) : (
            <Circle>
              <CountUp end={itemCounter} />
            </Circle>
          )}
        </Block>
        {isFetching ? (
          <LoadingIndicator />
        ) : (
          <Fragment>
            {historyItems.map((order, idx) => {
              const {
                id,
                isCollapsed,
                date,
                price,
                items,
                paymentMethod,
                paymentCard,
              } = order;
              return (
                <Fragment key={id}>
                  <Field idx={idx}>
                    <Block>
                      {new Date(date).toLocaleString(window.navigator.language)}
                    </Block>
                    <Block>{price}zł</Block>
                    <Block>{t(paymentMethod)}</Block>
                    <Block>{paymentCard}</Block>
                  </Field>
                  {isCollapsed && <Details idx={idx} items={items} />}
                </Fragment>
              );
            })}
          </Fragment>
        )}
        <VideoBackground indexOfVideo={3} />
      </Suspense>
    </Wrapper>
  );
}
export default History;
