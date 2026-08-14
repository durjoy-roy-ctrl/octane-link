import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>

      <div className="product-card-content">
        <p className="product-brand">{product.brand}</p>

        <h3 className="product-name">{product.name}</h3>

        <p className="product-price">৳{product.price}</p>

        <div className="product-card-buttons">
          <button className="details-button">Product Details</button>

          <button className="cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
