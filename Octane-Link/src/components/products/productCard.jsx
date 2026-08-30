
import "./productCard.css";
import { Link } from "react-router-dom";
import shellHelix from "../../assets/images/products/shell-helix-hx8.jpg";
import mobil1 from "../../assets/images/products/mobil-1-fs.jpg";
import castrolEdge from "../../assets/images/products/castrol-edge.jpg";
import motul8100 from "../../assets/images/products/motul-8100.jpg";
import tempora from "../../assets/images/products/Kronos-Tempora.jpg";
import adnoc from "../../assets/images/products/Adnoc-Voyeger.jpg";



function ProductCard({ product }) {
  const imageMap = {
  "shell-helix-hx8.jpg": shellHelix,
  "/images/product/shell-helix-hx8.jpg": shellHelix,

  "mobil-1-fs.jpg": mobil1,
  "/images/products/mobil-1-fs.jpg": mobil1,

  "castrol-edge.jpg": castrolEdge,
  "/images/products/castrol-edge.jpg": castrolEdge,

  "motul-8100.jpg": motul8100,
  "/images/product/motul-8100.jpg": motul8100,

    "Kronos-Tempora.jpg": tempora,
  "images/products/Kronos-Tempora.jpg": tempora,

      "Adnoc-Voyeger.jpg": adnoc,
  "images/products/Adnoc-Voyeger.jpg": adnoc,
};

const productImage = imageMap[product.image];
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={productImage}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-card-content">
        <p className="product-brand">{product.brand}</p>

        <h3 className="product-name">{product.name}</h3>

        <p className="product-price">৳{product.price}</p>

        <div className="product-card-buttons">
          
          <Link to={`/product/${product._id}`}
          className="details-button">
            Product Details
          </Link>

          <Link to={`/cart`} 
          className="cart-button">
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
