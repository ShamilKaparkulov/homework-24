import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/reducers/uiSlice";

import Notification from "./components/UI/Notification";
import { cartActions, sendCartData } from "./store/reducers/cartSlice";
import Form from "./components/Form/Form";
import FormList from "./components/Form/FormList";
import axios from "axios";
import { BASE_URL } from "./utils/constants/general";

let isInitial = true;
function App() {
  const { notification, cartVisible } = useSelector((state) => state.ui);
  console.log(notification);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    let timerId;
    if (notification) {
      timerId = setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 2000);
    }

    return () => clearTimeout(timerId);
  }, [notification, dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products.json`);
      const result = response.data;
      let newArr = [];
      for (const key in result) {
        newArr.push({
          id: key,
          ...result[key],
        });
      }
      dispatch(uiActions.getDataByServer(newArr));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  // const getDataCart = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/cart.json`);
  //     const result = response.data;
  //     // let newArr = [];
  //     // for (const key in result) {
  //     //   newArr.push({
  //     //     id: key,
  //     //     ...result[key],
  //     //   });
  //     // }
  //     dispatch(cartActions.getDataByServerCart(result));
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   getDataCart();
  // }, [getDataCart]);

  const postDataHandler = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/products.json`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    getData();
  };

  return (
    <>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}

      <Layout>
        {cartVisible && <Cart />}

        <Form postData={postDataHandler} />
        <Products />
        {/* <FormList /> */}
      </Layout>
    </>
  );
}

export default App;
