import React, { useState, useEffect, useContext } from "react";
import "./AddFeeds.css";
import NoteContext from "../../Context/SadaqahContext";
import Host from "../../Host";
import { useNavigate, useLocation } from "react-router-dom";

const AddFeeds = ({ onAdd }) => {
  const { userDetail } = useContext(NoteContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const editId = params.get("edit"); // post id or "true"
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    location: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // 🧩 Load existing post if editing
  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!editId || editId === "true") return;
      try {
        const res = await fetch(`${Host}/posts/${editId}`, {
          headers: { "auth-token": localStorage.getItem("token") },
        });
        const result = await res.json();
        if (result.success) {
          setFormData({
            type: result.post.type || "",
            title: result.post.title || "",
            description: result.post.description || "",
            location: result.post.location || "",
          });
          setOldImages(result.post.image || []); // save existing URLs
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [editId]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (oldImages.length + newImages.length + selectedFiles.length > 6) {
      alert("You can upload up to 6 images only.");
      return;
    }
    setNewImages((prev) => [...prev, ...selectedFiles]);
  };

  const handleRemoveOldImage = (url) => {
    setOldImages((prev) => prev.filter((img) => img !== url));
    setRemovedImages((prev) => [...prev, url]);
  };

  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("type", formData.type);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("location", formData.location);

      // Send new images
      newImages.forEach((img) => data.append("newImages", img));

      // Send removed image URLs
      removedImages.forEach((url) => data.append("removedImages", url));

      const url =
        editId && editId !== "true"
          ? `${Host}/posts/edit/${editId}`
          : `${Host}/posts/create`;

      const res = await fetch(url, {
        method: editId && editId !== "true" ? "PUT" : "POST",
        headers: { "auth-token": localStorage.getItem("token") },
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        alert(editId ? "✅ Post updated!" : "✅ Post created!");
        navigate("/feeds");
      } else {
        alert("❌ Failed to save post");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="add-post-container">
          <h5>{editId && editId !== "true" ? "Edit Post" : "Add New Post"}</h5>

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
              <option value="Notice">Notice</option>
            </select>

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

            <label>Description</label>
            <textarea
              className="search__input"
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
              onChange={handleFileChange}
            />

            <div className="preview-images">
              {/* Old Images */}
              {oldImages.map((img, i) => (
                <div key={i} className="image-preview-wrapper">
                  <img src={img} alt="old" />
                  <button
                    type="button"
                    onClick={() => handleRemoveOldImage(img)}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* New Images */}
              {newImages.map((img, i) => (
                <div key={i} className="image-preview-wrapper">
                  <img src={URL.createObjectURL(img)} alt="new" />
                  <button type="button" onClick={() => handleRemoveNewImage(i)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button className="post-button" type="submit" disabled={loading}>
              {loading
                ? editId
                  ? "Updating..."
                  : "Creating..."
                : editId
                ? "Update Post"
                : "Submit Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFeeds;
