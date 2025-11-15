import React, { useState } from "react";
import axios from "axios";
import "./DonateForm.css";
import Host from "../../Host";

const DonateForm = ({ getAllDonationsRequests, handleCloseDonet }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    quantity: "",
    unit: "pcs",
    price: "",
  });

  const [items, setItems] = useState([]);

  const itemUnits = ["pcs", "packets", "tons", "liters", "kg"];

  const unitSuggestions = {
    cement: "packets",
    sand: "tons",
    bricks: "pcs",
    rice: "kg",
    flour: "kg",
    oil: "liters",
    milk: "liters",
    water: "liters",
    book: "pcs",
    fan: "pcs",
    bulb: "pcs",
    chair: "pcs",
    bed: "pcs",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (field, value) => {
    let updated = { ...newItem, [field]: value };
    if (field === "title") {
      const suggestion = unitSuggestions[value.toLowerCase()];
      if (suggestion) updated.unit = suggestion;
    }
    setNewItem(updated);
  };

  const addItem = () => {
    if (!newItem.title || !newItem.quantity || !newItem.price) return;
    setItems((prev) => [...prev, newItem]);
    setNewItem({
      title: "",
      description: "",
      quantity: "",
      unit: "pcs",
      price: "",
    });
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Adding Request...");
    const payload = {
      title: formData.title,
      description: formData.description,
      items,
    };

    try {
      const response = await fetch(`${Host}/donation/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create donation request");
      }

      setLoading(false);
      setMessage("Request Added");
      //   setMessage("✅ Donation request created successfully!");
      await getAllDonationsRequests();
      handleCloseDonet();

      setFormData({ title: "", description: "" });
      setItems([]);
    } catch (error) {
      console.error("Error creating donation request:", error);
      //   setMessage("❌ " + error.message);
    }
  };

  return (
    <>
      {!loading ? (
        <form className="post-card addreq" onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            className="search__input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Donation Title"
            required
          />

          <label>Description</label>
          <textarea
            className="search__input"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the donation request..."
            rows={3}
            required
          />

          <label>Add Item</label>
          <div className="requirement-row">
            <input
              className="search__input"
              type="text"
              placeholder="Item name (e.g. Cement)"
              value={newItem.title}
              onChange={(e) => handleItemChange("title", e.target.value)}
            />
            <input
              className="search__input"
              type="number"
              placeholder="Qty"
              value={newItem.quantity}
              onChange={(e) => handleItemChange("quantity", e.target.value)}
            />
            <select
              className="search__input"
              value={newItem.unit}
              onChange={(e) => handleItemChange("unit", e.target.value)}
            >
              {itemUnits.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            <input
              className="search__input"
              type="number"
              placeholder="Price ₹"
              value={newItem.price}
              onChange={(e) => handleItemChange("price", e.target.value)}
            />
            <input
              className="search__input"
              type="text"
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => handleItemChange("description", e.target.value)}
            />
            <button className="post-button" type="button" onClick={addItem}>
              Add
            </button>
          </div>

          {items.length > 0 && (
            <div className="add-red-table">
              <table className="req-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => (
                    <tr key={i}>
                      <td>{it.title}</td>
                      <td>{it.quantity}</td>
                      <td>{it.unit}</td>
                      <td>₹{it.price}</td>
                      <td>{it.description}</td>
                      <td>
                        <button type="button" onClick={() => removeItem(i)}>
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button className="post-button" type="submit">
            Submit Request
          </button>
        </form>
      ):(
        <p>{message}</p>
      )}
    </>
  );
};

export default DonateForm;
