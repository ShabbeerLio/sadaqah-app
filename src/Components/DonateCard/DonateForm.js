import React, { useState, useEffect } from "react";
import "./DonateForm.css"

const DonateForm = ({ onSubmit, instituteData }) => {
    const [formData, setFormData] = useState({
        instituteType: "",
        donationPurpose: "",
        title: "",
        description: "",
        amount: "",
    });

    const [newItem, setNewItem] = useState({
        item: "",
        quantity: "",
        unit: "pcs",
        rate: "",
        description: "",
    });


    const [requirements, setRequirements] = useState([]);

    const purposeOptions = {
        masjid: ["Construction", "Equipments", "Maintenance", "Electricity"],
        madrasa: ["Construction", "Equipments", "Books", "Student Support"],
        khanqah: ["Renovation", "Utility", "Events"],
        kabristan: ["Land Purchase", "Maintenance", "Grave Diggers' Support"],
    };

    const itemUnits = ["pcs", "packets", "tons", "liters", "kg"];

    // Set instituteType from props on initial load
    useEffect(() => {
        if (instituteData?.instituteType) {
            setFormData((prev) => ({
                ...prev,
                instituteType: instituteData.instituteType,
            }));
        }
    }, [instituteData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "donationPurpose") {
            setRequirements([]); // reset requirements when changing purpose
        }
    };


    const addRequirement = () => {
        if (!newItem.item || !newItem.quantity || !newItem.rate) return;

        const total = parseFloat(newItem.quantity) * parseFloat(newItem.rate);
        setRequirements((prev) => [
            ...prev,
            { ...newItem, total: Math.round(total) },
        ]);
        setNewItem({
            item: "",
            quantity: "",
            unit: "pcs",
            rate: "",
            description: "",
        });
    };

    const removeRequirement = (index) => {
        const updated = [...requirements];
        updated.splice(index, 1);
        setRequirements(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalAmount = requirements.reduce((sum, r) => sum + (r.total || 0), 0);
        const finalData = {
            ...formData,
            amount: totalAmount,
            requirements,
        };
        if (onSubmit) onSubmit(finalData);
        console.log("Submitted Data:", finalData);
    };

    return (
        <form className="post-card addreq" onSubmit={handleSubmit}>
            <label>Donation Purpose</label>
            <select
                className="search__input"
                name="donationPurpose"
                value={formData.donationPurpose}
                onChange={handleChange}
                required
            >
                <option value="">Select Purpose</option>
                {purposeOptions[formData.instituteType]?.map((purpose) => (
                    <option key={purpose} value={purpose}>
                        {purpose}
                    </option>
                ))}
            </select>

            <label>Title</label>
            <input
                className="search__input"
                type="text"
                name="title"
                placeholder="Donation Title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <label>Description</label>
            <textarea
                className="search__input"
                name="description"
                placeholder="Describe the donation request..."
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
            />

            {formData.donationPurpose !== "" && (
                <>
                <label>Items Requirements</label>

                    {/* Add New Item Inputs */}
                    <div className="requirement-row">
                        <input
                            className="search__input"
                            type="text"
                            placeholder="Item name (e.g. Cement)"
                            value={newItem.item || ""}
                            onChange={(e) =>
                                setNewItem({ ...newItem, item: e.target.value })
                            }
                            required
                        />
                        <input
                            className="search__input"
                            type="number"
                            placeholder="Qty"
                            value={newItem.quantity || ""}
                            onChange={(e) =>
                                setNewItem({ ...newItem, quantity: e.target.value })
                            }
                            required
                        />
                        <select
                            className="search__input"
                            value={newItem.unit || "pcs"}
                            onChange={(e) =>
                                setNewItem({ ...newItem, unit: e.target.value })
                            }
                        >
                            {itemUnits.map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
                        <input
                            className="search__input"
                            type="number"
                            placeholder="Rate ₹"
                            value={newItem.rate || ""}
                            onChange={(e) =>
                                setNewItem({ ...newItem, rate: e.target.value })
                            }
                            required
                        />
                        <input
                            className="search__input"
                            type="text"
                            placeholder="Description"
                            value={newItem.description || ""}
                            onChange={(e) =>
                                setNewItem({ ...newItem, description: e.target.value })
                            }
                        />
                        <button className="post-button" type="button" onClick={addRequirement}>Add Items</button>
                    </div>

                    {/* Table of Added Items */}
                    <div className="add-red-table">
                        {requirements.length > 0 && (
                            <table className="req-table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Qty</th>
                                        <th>Unit</th>
                                        <th>Rate</th>
                                        <th>Total</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requirements.map((req, index) => (
                                        <tr key={index}>
                                            <td>{req.item}</td>
                                            <td>{req.quantity}</td>
                                            <td>{req.unit}</td>
                                            <td>₹{req.rate}</td>
                                            <td>₹{req.total}</td>
                                            <td>{req.description}</td>
                                            <td>
                                                <button type="button" onClick={() => removeRequirement(index)}>
                                                    ❌
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}

            <label>Total Amount Needed (₹)</label>
            <input
                className="search__input"
                type="number"
                value={requirements.reduce((sum, r) => sum + (r.total || 0), 0)}
                readOnly
            />

            <button className="post-button" type="submit">
                Submit Request
            </button>
        </form>
    );
};

export default DonateForm;