import React, { useState } from "react";
import "./AddFeeds.css";

const AddFeeds = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    title: "",
    description: "",
    time: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageURLs], // append, don't replace
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      ...formData,
    };
    if (onAdd) onAdd(newPost);
    alert("Post added successfully!");
    setFormData({
      type: "",
      location: "",
      title: "",
      description: "",
      time: "",
      images: [],
    });
  };

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="add-post-container">
          <h5> Add New Post</h5>

          <form className="post-card" onSubmit={handleSubmit}>
            <label>Post Type</label>
            <select
              className="search__input"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Quran">Quran</option>
              <option value="Hadith">Hadith</option>
              <option value="Dua">Dua</option>
            </select>

            <label>Location</label>
            <input
              className="search__input"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
            />

            <label>Title</label>
            <input
              className="search__input"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              required
            />

            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description..."
              required
            />

            <label>Upload Images</label>
            <input
              className="search__input"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />

            <div className="preview-images">
              {formData.images.map((img, index) => (
                <div key={index} className="image-preview-wrapper">
                  <img src={img} alt={`Preview ${index}`} />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index),
                      }));
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button className="post-button" type="submit">
              Submit Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFeeds;
