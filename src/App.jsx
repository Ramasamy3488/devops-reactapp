import { useState } from 'react'
import { electronics } from './data/dataset'

function App() {

  const [products, setProducts] = useState(electronics);

  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    quantityAvailable: "",
    imageLink: ""
  });

  const [editId, setEditId] = useState(null);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      // Update
      const updated = products.map(p =>
        p.id === editId ? { ...form, id: editId } : p
      );
      setProducts(updated);
      setEditId(null);
    } else {
      // Create
      setProducts([...products, { ...form, id: Date.now() }]);
    }

    setForm({
      id: "",
      name: "",
      price: "",
      quantityAvailable: "",
      imageLink: ""
    });
  };

  // Edit
  const handleEdit = (product) => {
    setForm(product);
    setEditId(product.id);
  };

  // Delete
  const handleDelete = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
  };

  // Delete All
  const handleDeleteAll = () => {
    setProducts([]);
  };

  return (
    <div className="container py-5">

      <h1 className="text-center text-primary mb-4">
        ⚡ Electronics Dashboard
      </h1>

      {/* FORM */}
      <div className="card shadow p-4 mb-4">
        <h4>{editId ? "✏️ Edit Product" : "➕ Add Product"}</h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-md-3">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="form-control"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                name="quantityAvailable"
                placeholder="Qty"
                className="form-control"
                value={form.quantityAvailable}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <input
                type="text"
                name="imageLink"
                placeholder="Image URL"
                className="form-control"
                value={form.imageLink}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2">
              <button className="btn btn-success w-100">
                {editId ? "Update" : "Add"}
              </button>
            </div>

          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="card shadow p-3">
        <div className="d-flex justify-content-between mb-3">
          <h5>Total Products: {products.length}</h5>

          <button
            className="btn btn-danger"
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">

            <thead className="table-dark text-center">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {products.map((p) => (
                <tr key={p.id}>

                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>{p.quantityAvailable}</td>

                  <td>
                    <img
                      src={p.imageLink}
                      alt=""
                      className="rounded"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover"
                      }}
                    />
                  </td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

export default App;