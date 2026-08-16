
import "./productCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-card-content">
        <p className="product-brand">{product.brand}</p>

        <h3 className="product-name">{product.name}</h3>

        <p className="product-price">৳{product.price}</p>

        <div className="product-card-buttons">
          
          <Link to={`/product/${product.id}`}
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
