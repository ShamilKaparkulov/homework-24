import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const PRODUCT = [
  {
    id: "f1",
    price: 6,
    title: "My first book",
    description: "My first book I ever wrote",
  },
  {
    id: "f2",
    price: 10,
    title: "My Second book",
    description: "Harry Potter",
  },
];

const Products = () => {
  const { items } = useSelector((state) => state.ui);
  console.log(items);

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {[...PRODUCT, ...items].map((item) => (
          <ProductItem
            key={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            id={item.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
