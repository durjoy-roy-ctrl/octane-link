
import "./productCard.css";
import { Link, useNavigate } from "react-router-dom";



function ProductCard({ product, addToCart, user}) {
  const navigate = useNavigate();
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image?.url}
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

          <button className="cart-button" 
          onClick={()=>
          {
            if(!user){
              navigate("/login");
              return;
            }
            addToCart(product); 
          navigate("/cart");}}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
