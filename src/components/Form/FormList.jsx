import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../store/reducers/cartSlice";
import uiSlice, { uiActions } from "../../store/reducers/uiSlice";
import classes from "../Shop/ProductItem.module.css";
import Card from "../UI/Card";
function FormList(props) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const addProdacts = (title, price, description, id) => {
    dispatch(cartSlice.actions.addItemToCart({ title, price, description }));
  };
  return (
    <>
      {items.map((task) => {
        return (
          <li key={task.newId} className={classes.item}>
            <Card>
              <header>
                <h3>{task.title}</h3>
                <div className={classes.price}>${task.price}</div>
              </header>
              <p>{task.description}</p>
              <div className={classes.actions}>
                <button
                  onClick={() =>
                    addProdacts(
                      task.price,
                      task.newId,
                      task.title,
                      task.description
                    )
                  }
                >
                  Add{" "}
                </button>
              </div>
            </Card>
          </li>
        );
      })}
    </>
  );
}

export default FormList;
