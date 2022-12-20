import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/reducers/cartSlice";
import classes from "./Form.module.css";
function Form({ postData }) {
  const dispatch = useDispatch();

  const [enteredText, setInteredText] = useState({
    price: "",
    description: "",
    title: "",
  });

  const addProductsHandler = () => {
    if (
      enteredText.title.trim().length > 0 &&
      enteredText.description.trim().length > 0
    ) {
      // dispatch(
      //   cartActions.addProductsOnUi({
      //     newPrice: Number(enteredText.newPrice),
      //     description: enteredText.newDescription,
      //     title: enteredText.newTitle,
      //     newId: Math.random().toString(),
      //     price: Number(enteredText.newPrice),
      //     total: Number(enteredText.newPrice),
      //   })
      // );
      postData(enteredText);
      setInteredText({ newPrice: "", newDescription: "", newTitle: "" });
    }
  };
  return (
    <div className={classes.Form}>
      <input
        value={enteredText.title}
        onChange={(e) =>
          setInteredText({ ...enteredText, title: e.target.value })
        }
        placeholder="enter a title"
        type="text"
      />
      <input
        value={enteredText.price}
        onChange={(e) =>
          setInteredText({ ...enteredText, price: e.target.value })
        }
        placeholder="enter a price"
        type="number"
      />
      <input
        value={enteredText.description}
        onChange={(e) =>
          setInteredText({ ...enteredText, description: e.target.value })
        }
        placeholder="enter a description"
        type="text"
      />

      <button onClick={addProductsHandler}>Add new products</button>
    </div>
  );
}

export default Form;
