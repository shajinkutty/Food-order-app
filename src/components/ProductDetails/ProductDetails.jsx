import "./productDetails.css";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import uuid from "react-uuid";
import Button from "../FormInputs/Button";
import { setAlertMessage } from "../../redux/userSlice";

function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Small");
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const dispatch = useDispatch();

  const handleSelect = (item) => {
    setSize(item.title);
    setTotalPrice(item.price);
  };

  const changeQuantity = (type) => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else {
      if (quantity <= 1) {
      } else {
        setQuantity(quantity - 1);
      }
    }
  };
  const selectAddon = (addon) => {
    if (selectedExtras.includes(addon.title)) {
      setSelectedExtras(selectedExtras.filter((i) => i !== addon.title));
      setTotalPrice(totalPrice - addon.amount);
    } else {
      setSelectedExtras([...selectedExtras, addon.title]);
      setTotalPrice(totalPrice + addon.amount);
    }
  };
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: uuid(),
        productName: product.name,
        size,
        selectedExtras,
        totalPrice,
        quantity,
      })
    );
    dispatch(setAlertMessage("Addedd to the cart"));
  };
  return (
    <div className="product-section">
      <div className="product_body">
        <div className="product__left">
          <img src={product.imageUrl} alt="" />
        </div>
        <div className="product__right">
          <h2 className="product__title">Pizza</h2>
          <div className="product__price">
            Total Price: <span>{totalPrice} INR</span>
          </div>
          <div className="product__options">
            {product.sizez.map((item) => (
              <p
                key={item._id}
                onClick={() => handleSelect(item)}
                className={size === item.title ? "active" : ""}
              >
                {item.title}
              </p>
            ))}
          </div>
          <div className="product__extras">
            {product.addon.map((add) => (
              <p
                key={add._id}
                onClick={() => selectAddon(add)}
                className={
                  selectedExtras.includes(add.title) ? "selected" : undefined
                }
              >
                {add.title}
                <span className={add.amount > 0 ? "product__addon" : ""}>
                  {add.amount > 0 ? ` +${add.amount} INR` : null}
                </span>
              </p>
            ))}
          </div>
          <div className="product__quantity">
            <motion.div className="btn decrement" whileTap={{ scale: 0.9 }}>
              <FiMinusCircle
                size={30}
                onClick={() => changeQuantity("decrement")}
                cursor={"pointer"}
              />
            </motion.div>
            <h3>{quantity}</h3>
            <motion.div className="btn decrement" whileTap={{ scale: 0.9 }}>
              <FiPlusCircle
                size={30}
                onClick={() => changeQuantity("increment")}
                cursor={"pointer"}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="product_footer">
        <Button name="Add to Cart" onClick={handleAddToCart} />
      </div>
    </div>
  );
}

export default ProductDetails;
