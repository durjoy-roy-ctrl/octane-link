import { useState } from "react";
import ProductCard from "../components/products/ProductCard";
import products from "../data/products";
import "./ProductCatalog.css";

function ProductCatalog() {

  const [selectedVehicle, setSelectedVehicle] = useState("");

  const vehicles = [
    ...new Set(
      products.flatMap((product) => product.compatibility)
    ),
  ];

  const filteredProducts = selectedVehicle
    ? products.filter((product) =>
        product.compatibility.includes(selectedVehicle)
      )
    : products;

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
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}

export default ProductCatalog;