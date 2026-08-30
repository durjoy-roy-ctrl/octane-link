import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./productDetails.css";
import shellHelix from "../assets/images/products/shell-helix-hx8.jpg";
import mobil1 from "../assets/images/products/mobil-1-fs.jpg";
import castrolEdge from "../assets/images/products/castrol-edge.jpg";
import motul8100 from "../assets/images/products/motul-8100.jpg";
import tempora from "../assets/images/products/Kronos-Tempora.jpg";
import adnoc from "../assets/images/products/Adnoc-Voyeger.jpg";


function ProductDetails() {
  const { id } = useParams();

const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  fetch(`http://localhost:5000/api/products/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Product not found");
      }

      return response.json();
    })
    .then((data) => {
      setProduct(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
      setError("Product not found.");
      setLoading(false);
    });
}, [id]);

  if (loading) {
  return <h2>Loading product...</h2>;
}

if (error || !product) {
  return (
    <div className="product-not-found">
      <h2>Product Not Found</h2>
      <Link to="/catalog">Back to Catalog</Link>
    </div>
  );
}

  const imageMap = {
  "shell-helix-hx8.jpg": shellHelix,
  "mobil-1-fs.jpg": mobil1,
  "castrol-edge.jpg": castrolEdge,
  "motul-8100.jpg": motul8100,
  "Kronos-Tempora.jpg":tempora,
  "Adnoc-Voyeger.jpg":adnoc,
};

const productImage = imageMap[product.image];
  return (
    <main className="product-details-page">
      <div className="product-details">

        {/* Product Image */}

        <div className="product-details-image">
          <img
            src={productImage}
            alt={product.name}
          />
        </div>



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
            <strong>{product.compatibility.join(", ")}</strong>
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