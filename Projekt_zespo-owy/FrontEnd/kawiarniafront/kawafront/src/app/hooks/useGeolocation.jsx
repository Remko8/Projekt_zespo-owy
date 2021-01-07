import { useEffect } from "react";
import { toast } from "react-toastify";
import {useDispatch} from 'react-redux';
import orderActions from '../redux/order/actions';
import { useTranslation } from "react-i18next";
function useGeolocation() {
  const dispatch = useDispatch()
  const {t} =useTranslation()
  useEffect(() => {
    async function locationSelect() {
      try {
        const location = await getCurrentLocation({
          enableHighAccuracy: true,
          timeout: 3000,
          maximumAge: 0,
        });
        dispatch(
          orderActions.setLatLng([
            location.coords.latitude,
            location.coords.longitude,
          ])
        );
      } catch (e) {
        if (e.name === "PositionError") {
          toast.error(`${t('Cannot use geolocalization')} ${t('Please tap position on map manually')}`);
        }
      }
    }
    locationSelect();
  }, [dispatch,t]);
}
export default useGeolocation;


function getCurrentLocation(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      ({ code, message }) =>
        reject(
          Object.assign(new Error(message), { name: "PositionError", code })
        ),
      options
    );
  });
}
