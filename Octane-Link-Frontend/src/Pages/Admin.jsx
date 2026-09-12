import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [oilType, setOilType] = useState("");
  const [compatibility, setCompatibility] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  //fetch all the products
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch products."
        );
      }

      setProducts(data);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when Admin page opens
  useEffect(() => {
    fetchProducts();
  }, []);

  // ADDPRODUCT
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("oilType", oilType);

    const compatibilityArray = compatibility
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    formData.append(
      "compatibility",
      JSON.stringify(compatibilityArray)
    );

    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);

    // Only send image if one was selected
    if (image) {
      formData.append("image", image);
    }

    const url = editingId
      ? `http://localhost:5000/api/products/${editingId}`
      : "http://localhost:5000/api/products";

    const method = editingId ? "PUT" : "POST";

    const token = localStorage.getItem("octane_token");

const response = await fetch(url, {
  method: method,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to save product."
      );
    }

    alert(
      editingId
        ? "Product updated successfully!"
        : "Product added successfully!"
    );

    // Clear form
    setName("");
    setBrand("");
    setOilType("");
    setCompatibility("");
    setPrice("");
    setStock("");
    setDescription("");
    setImage(null);
    setEditingId(null);

    document.getElementById("product-image").value = "";

    fetchProducts();

  } catch (error) {
    console.error("Error saving product:", error);

    alert(
      error.message || "Failed to save product."
    );
  }
};


  const handleEdit = (product) => {
  setEditingId(product._id);

  setName(product.name);
  setBrand(product.brand);
  setOilType(product.oilType);

  setCompatibility(
    product.compatibility
      ? product.compatibility.join(", ")
      : ""
  );

  setPrice(product.price);
  setStock(product.stock);
  setDescription(product.description || "");

  // Don't require a new image when editing
  setImage(null);

  // Scroll to the form
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/products/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete product."
      );
    }

    alert("Product deleted successfully!");

    fetchProducts();

  } catch (error) {
    console.error("Error deleting product:", error);

    alert(
      error.message || "Failed to delete product."
    );
  }
};





return (
  <div className="admin-page">

    {/* Page Header */}
    <div className="admin-header">
      <h1>Admin Panel</h1>
      <p>Manage your OctaneLink products</p>
    </div>


    {/* Product Form */}
    <div className="admin-form-card">

      <h2>
        {editingId ? "Edit Product" : "Add New Product"}
      </h2>

      <form
        className="admin-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Oil Type"
          value={oilType}
          onChange={(e) => setOilType(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Compatibility (e.g. Toyota, Honda)"
          value={compatibility}
          onChange={(e) => setCompatibility(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <textarea
          className="admin-description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="admin-image"
          id="product-image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          className="admin-submit"
          type="submit"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>

      </form>

    </div>


    {/* Products */}
    <div className="admin-products-section">

      <h2>Products</h2>

      {products.length === 0 ? (
        <div className="admin-empty">
          <p>No products found.</p>
        </div>
      ) : (

        <div className="admin-products-grid">

          {products.map((product) => (

            <div
              className="admin-product-card"
              key={product._id}
            >

              {product.image?.url && (
                <img
                  className="admin-product-image"
                  src={product.image.url}
                  alt={product.name}
                />
              )}

              <div className="admin-product-info">

                <h3>{product.name}</h3>

                <p>
                  <strong>Brand:</strong>{" "}
                  {product.brand}
                </p>

                <p>
                  <strong>Oil Type:</strong>{" "}
                  {product.oilType}
                </p>

                <p>
                  <strong>Compatibility:</strong>{" "}
                  {product.compatibility?.join(", ")}
                </p>

                <p>
                  <strong>Price:</strong>{" "}
                  {product.price}
                </p>

                <p>
                  <strong>Stock:</strong>{" "}
                  {product.stock}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {product.description}
                </p>

                <div className="admin-buttons">

                  <button
                    className="admin-edit-btn"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>

                  <button
                    className="admin-delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
);

}

export default Admin;
