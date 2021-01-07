import React, { Fragment, lazy, useState } from "react";
import "./Bucket.scss";
import { useSelector, useDispatch } from "react-redux";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bucketActions from "../../redux/bucket/actions";
import { Block, Button, Field, Info, Text, Wrapper } from "./components";
import GoBackButton from "../GlobalComponents/GoBackButton";
import useToken from "../../hooks/useToken";
import { useEffect, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import DeleteItemFromBucket from "../DeleteItemFromBucket/DeleteItemFromBucket";
const VideoBackground = lazy(() =>
  import("../VideoBackground/VideoBackground")
);
function getTotalValue(itemsArr) {
  let acc = 0;
  itemsArr.map((item) => (acc += item.price));
  return Math.round(acc * Math.pow(10, 2)) / Math.pow(10, 2);
}
function getCountOfSelectedItemToPay(itemsArr) {
  let acc = 0;
  itemsArr.map((item) => {
    acc += item.isSelectedToPay ? 1 : 0;
    return null;
  });
  return acc;
}
function Bucket() {
  const bucketItems = useSelector((state) => state.bucket.bucketItems);
  const isFetching = useSelector((state) => state.bucket.isFetching);
  const items = useSelector((state) =>
    state.bucket.bucketItems.filter((item) => item.isSelectedToPay === true)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const token = useToken();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(bucketActions.fetchBucket(token));
  }, [token, dispatch]);
  function closeModal() {
    setIsModalOpen(false);
  }
  function openModal() {
    setIsModalOpen(true);
  }
  return (
    <div class="mainBucket">
      <div class="back3">
            <GoBackButton>{t("goBack")}</GoBackButton>
      </div>
      <Wrapper>
        <Suspense fallback={<LoadingIndicator />}>
          <Info>
            {isFetching ? (
              <LoadingIndicator />
            ) : (
              <Fragment>
                <Text>
                  {" "}
                  {`${t("valueOfYourBucket")}: ${getTotalValue(bucketItems)} zł `}
                </Text>
                <Text>
                  {`${t("valueOfYourActualOrder")}  ${items.reduce(
                    (acc, val) => acc + val.price,
                    0
                  )}zł`}
                </Text>
              </Fragment>
            )}

            {getCountOfSelectedItemToPay(bucketItems) > 0 ? (
              <Button name="payForSelectedProducts">
                {t("payForSelectedProducts")}
              </Button>
            ) : null}
          </Info>
          <Block>
            {isFetching ? (
              <LoadingIndicator />
            ) : (
              <Fragment>
                {bucketItems.length ? (
                  bucketItems.map((item, idx) => {
                    return (
                      <Field
                        key={idx}
                        idx={idx}
                        coffeeName={item.coffeeName}
                        className={
                          item.isSelectedToPay
                            ? "bucket__field selected"
                            : "bucket__field"
                        }
                      >
                        <Text type="name">{t(item.coffeeName)}</Text>
                        {!item.isSelectedToPay ? (
                          <Fragment>
                            <Button
                              idx={idx}
                              name="delete"
                              onModalOpen={openModal}
                            >
                              &#128465;
                            </Button>
                          </Fragment>
                        ) : null}
                      </Field>
                    );
                  })
                ) : (
                  <Text>{t("noOrders")}</Text>
                )}
              </Fragment>
            )}
          </Block>
          <Modal
            onRequestClose={closeModal}
            className="Modal"
            overlayClassName="Overlay"
            isOpen={isModalOpen}
            ariaHideApp={false}
          >
            <DeleteItemFromBucket onModalClose={closeModal} />
          </Modal>
          <VideoBackground indexOfVideo={7} shouldVideoLoop={false} />
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
        </Suspense>
      </Wrapper>
    </div>
  );
}
export default Bucket;
