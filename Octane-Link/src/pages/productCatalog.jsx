import ProductCard from "../components/products/ProductCard";
import products from "../data/products";
import "./ProductCatalog.css";

function ProductCatalog() {
  return (
    <div className="product-catalog">
      <div className="catalog-header">
        <h1>Our Products</h1>
        <p>Find the right oil and lubricant for your vehicle.</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductCatalog;
