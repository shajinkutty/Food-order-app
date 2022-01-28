import "./products.css";
import heroImage from "../../assets/images/hero-img.jpg";
import { motion } from "framer-motion";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import ProductDetails from "../ProductDetails/ProductDetails";
import Loader from "../Loader/Loader";

export default function Products() {
  const { data, loading } = useSelector((state) => state.products);
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  return (
    <>
      <div className="container">
        <div className="products">
          {loading ? (
            <Loader />
          ) : (
            data.map((item) => (
              <motion.div
                key={item._id}
                className="item"
                whileHover={{ scale: 1.05 }}
                onClick={() => setProduct(item)}
              >
                <img src={item.imageUrl} alt="" />
                <h3>{item.name}</h3>
                <div className="price">INR {item.price}</div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <Modal open={product} handleClose={() => setProduct(null)}>
        <ProductDetails product={product} />
      </Modal>
    </>
  );
}
