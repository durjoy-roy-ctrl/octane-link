import { useParams, Link } from "react-router-dom";
import products from "../data/products";
import "./productDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <Link to="/catalog">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <main className="product-details-page">
      <div className="product-details">

        {/* Product Image */}

        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>


        {/* Product Information */}

        <div className="product-details-info">

          <p className="product-details-brand">
            {product.brand}
          </p>

          <h1>{product.name}</h1>

          <p className="product-details-price">
            ৳{product.price}
          </p>

          <div className="product-details-divider"></div>

          <div className="product-info-row">
            <span>Oil Type</span>
            <strong>{product.oilType}</strong>
          </div>

          <div className="product-info-row">
            <span>Vehicle Compatibility</span>
            <strong>{product.compatibility}</strong>
          </div>

          <div className="product-info-row">
            <span>Stock</span>
            <strong>{product.stock}</strong>
          </div>

          <button className="product-details-cart">
            Add to Cart
          </button>

          <Link
            to="/catalog"
            className="back-to-catalog"
          >
            ← Back to Products
          </Link>

        </div>
      </div>
    </main>
  );
}

export default ProductDetails;