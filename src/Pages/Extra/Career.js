import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useState } from "react";
import Ads from "../../Components/Ads/Ads";
import { useNavigate } from "react-router-dom";

const Career = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        position: "",
        coverLetter: "",
        resume: null,
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "resume") {
            setFormData({ ...formData, resume: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Here you would normally send `formData` to your backend or API.
        console.log("Submitted Data:", formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            navigate("/");
        }, 15000);
    };

    return (
        <div className="add-post-container">
            <h5>Submit Your Application</h5>
            {submitted ? (
                <div className="confirmation-modal">
                    <div className="confirmation-box">
                        <div className="wallet-status">
                            <DotLottieReact
                                className="wallet-success"
                                src="https://lottie.host/b08d0607-b021-4196-ba76-e6596d9332e5/o1EFjMW31w.lottie"
                                loop
                                autoplay
                                onError={(e) => console.error("Lottie load error:", e)}
                            />
                        </div>
                        <h5>Application Submited</h5>
                        <p>
                            Thank you for applying! We will Contact You Soon.
                        </p>
                        <Ads />
                    </div>
                    <div className="confirmation-backdrop"></div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="post-card">
                    <label>Name</label>
                    <input
                        className="search__input"
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label>Email</label>
                    <input
                        className="search__input"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Number</label>
                    <input
                        className="search__input"
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <label>Position</label>
                    <select
                        className="search__input"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Position</option>
                        <option value="frontend">Frontend Developer</option>
                        <option value="backend">Backend Developer</option>
                        <option value="uiux">UI/UX Designer</option>
                        <option value="marketing">Marketing Executive</option>
                    </select>
                    <label>About Yourself</label>
                    <textarea
                        className="search__input"
                        name="coverLetter"
                        placeholder="Cover Letter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        rows={5}
                    />
                    <label>CV (.pdf, .doc, .docx)</label>
                    <input
                        className="search__input"
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        required
                    />
                    <button className="post-button" type="submit">
                        Submit Application
                    </button>
                </form>
            )}
        </div>
    );
};

export default Career;
