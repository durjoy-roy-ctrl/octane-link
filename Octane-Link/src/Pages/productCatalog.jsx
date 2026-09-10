import { useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import "./ProductCatalog.css";

function ProductCatalog({addToCart}) {

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  fetch("http://localhost:5000/api/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json();
    })
    .then((data) => {
      setProducts(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      setError("Unable to load products.");
      setLoading(false);
    });
}, []);

  const vehicles = [
  ...new Set(
    products.flatMap((product) => product.compatibility || [])
  ),
];

  const filteredProducts = selectedVehicle
    ? products.filter((product) =>
        product.compatibility.includes(selectedVehicle)
      )
    : products;

  if (loading) {
  return <h2>Loading products...</h2>;
}

if (error) {
  return <h2>{error}</h2>;
}

  
    return (
    <div className="product-catalog">

      <div className="catalog-header">
        <h1>Our Products</h1>

        <p>
          Find the right oil and lubricant for your vehicle.
        </p>
      </div>

<div className="vehicle-filter">

  <div className="vehicle-filter-header">
    <div>
      <p className="filter-label">VEHICLE FILTER</p>

      <h2>FIND THE RIGHT OIL</h2>

      <p>
        Select your vehicle to find compatible products.
      </p>
    </div>
  </div>

  <div className="vehicle-filter-control">

    <div className="vehicle-icon">
      🚗
    </div>

    <div className="vehicle-select-wrapper">

      <label htmlFor="vehicle">
        VEHICLE
      </label>

      <select
        id="vehicle"
        value={selectedVehicle}
        onChange={(e) => setSelectedVehicle(e.target.value)}
      >
        <option value="">
          All Vehicles
        </option>

        {vehicles.map((vehicle) => (
          <option
            key={vehicle}
            value={vehicle}
          >
            {vehicle}
          </option>
        ))}
      </select>

    </div>

  </div>

  {selectedVehicle && (
    <p className="filter-result">
      Showing products compatible with{" "}
      <strong>{selectedVehicle}</strong>
    </p>
  )}

</div>


      <div className="product-grid">

        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
          />
        ))}

      </div>

    </div>
  );
}

export default ProductCatalog;