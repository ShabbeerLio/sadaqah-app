import React, { useState } from "react";
import "./RegistrationForm.css";
import Checkbox from "../Items/Checkbox";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const RegistrationForm = ({ handlecloseTakeRes }) => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = user?.type === "user" ? 1 : 8;
    console.log(user)
    const [formData, setFormData] = useState({
        // Basic Details
        institutionName: "",
        institutionType: "",
        yearEstablished: "",

        // Contact Details
        primaryContactName: "",
        contactNumber: "",
        alternateContact: "",
        email: "",

        // Location
        address: "",
        city: "",
        state: "",
        pincode: "",
        geoLocation: "",

        // Documents
        registrationCertificate: null,
        panCertificate: null,

        // Media
        frontPhoto: null,
        signBoard: null,
        insideView: null,

        // Profile
        description: "",

        // Social Media
        website: "",

        // Nominee
        nomineeName: "",
        nomineeNumber: "",
        nomineeEmail: "",
        nomineeRelation: "",

        // Consent
        verificationAgreement: false,
        consentDeclaration: false,
    });

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : files ? files[0] : value,
        }));
    };

    const handleSubmit = () => {
        if (!formData.verificationAgreement || !formData.consentDeclaration) {
            alert("Please accept the consent and agreement");
            return;
        }

        setIsProcessing(true);

        // Simulate form submission delay (e.g., API call)
        setTimeout(() => {
            const formPayload = new FormData();
            for (const key in formData) {
                formPayload.append(key, formData[key]);
            }

            // Simulated API call:
            // fetch("/api/submitInstitution", {
            //     method: "POST",
            //     body: formPayload,
            // })
            //     .then((res) => res.json())
            //     .then((data) => {
            //         setIsSubmitted(true);
            //         setIsProcessing(false);
            //         handlecloseTakeRes();
            //     })
            //     .catch((err) => {
            //         console.error(err);
            //         setIsProcessing(false);
            //     });

            // For now:
            setIsProcessing(false);
            setIsSubmitted(true);
            setTimeout(() => {
                handlecloseTakeRes();
            }, 5000)

        }, 5000); // Simulated delay
    };

    if (isProcessing) {
        return (
            <div className="form-step">
                <div className="wallet-status">
                    <DotLottieReact
                        className="wallet-success"
                        src="https://lottie.host/a42c9eba-8572-4354-9fb0-e0e1bfaf89dd/0Y4lT7fZbk.lottie"
                        loop
                        autoplay
                    />
                </div>
                <h5>Submitting your data...</h5>
                <p>Please wait while we process your form.</p>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="form-step">
                <div className="wallet-status">
                    <DotLottieReact
                        className="wallet-success"
                        src="https://lottie.host/b08d0607-b021-4196-ba76-e6596d9332e5/o1EFjMW31w.lottie"
                        loop
                        autoplay
                    />
                </div>
                <h5>Form Submitted Successfully!</h5>
                <p>Thank you. Your data has been successfully submitted.</p>
            </div>
        );
    }

    const renderStep = () => {
        if (user?.type === "user") {
            return (
                <>
                 <div className="form-step">
                        <h6>Consent</h6>
                        <div className="form-consent">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum voluptatibus autem repellendus eum ducimus praesentium sit minima nisi officia, facere eligendi illo similique fuga excepturi voluptatem nulla repudiandae exercitationem natus quae itaque voluptatum eveniet, dolore eaque. Nam animi amet, molestias autem vero suscipit illo hic reiciendis laboriosam quia facere dicta quidem ipsa. Aut tempora dolore itaque aliquam natus nesciunt nam quam modi? Quam fugiat blanditiis debitis veritatis minus, rem dolores laudantium quis sapiente, aliquid fugit magnam, ad doloribus ipsam. Ullam inventore nam corrupti facere aliquam harum reprehenderit soluta debitis. Ipsa veritatis aut rerum quae maiores laudantium rem fugiat deleniti ut.</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum voluptatibus autem repellendus eum ducimus praesentium sit minima nisi officia, facere eligendi illo similique fuga excepturi voluptatem nulla repudiandae exercitationem natus quae itaque voluptatum eveniet, dolore eaque. Nam animi amet, molestias autem vero suscipit illo hic reiciendis laboriosam quia facere dicta quidem ipsa. Aut tempora dolore itaque aliquam natus nesciunt nam quam modi? Quam fugiat blanditiis debitis veritatis minus, rem dolores laudantium quis sapiente, aliquid fugit magnam, ad doloribus ipsam. Ullam inventore nam corrupti facere aliquam harum reprehenderit soluta debitis. Ipsa veritatis aut rerum quae maiores laudantium rem fugiat deleniti ut.</p>
                        </div>
                        <div className="form-consent-checkbox">
                            <Checkbox name={"verificationAgreement"} checked={formData.verificationAgreement} handleChange={handleChange} text={"I authorize platform agent to visit and verify this institution"} />
                            <Checkbox name={"consentDeclaration"} checked={formData.consentDeclaration} handleChange={handleChange} text={"All provided information is true and verified."} />
                        </div>
                    </div>
                    
                    <div className="responsiblity-btns">
                        <p className="confirm" onClick={handleSubmit}>
                            Submit
                        </p>
                    </div>
                </>
            );
        }

        switch (currentStep) {
            case 0:
                return (
                    <div className="form-step">
                        <h6>Basic Details</h6>
                        <label htmlFor="institutionName">Institution Name</label>
                        <input
                            className="search__input"
                            name="institutionName"
                            // placeholder="Institution Name"
                            value={formData.institutionName}
                            onChange={handleChange}
                        />
                        <label htmlFor="institutionName">Institution Type</label>
                        <select
                            className="search__input"
                            id="type"
                            value={formData.institutionType}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            <option value="Masjid">Masjid</option>
                            <option value="Madrasa">Madrasa</option>
                            <option value="Kabristan">Kabristan</option>
                            <option value="Khanqua">Khanqua</option>
                            <option value="Islamic Trust">Islamic Trust</option>
                        </select>

                        <label htmlFor="institutionName">Year of Establishment</label>
                        <input
                            className="search__input"
                            name="yearEstablished"
                            // placeholder="Year of Establishment"
                            value={formData.yearEstablished}
                            onChange={handleChange}
                        />
                    </div>
                );
            case 1:
                return (
                    <div className="form-step">
                        <h6>Contact Details (Sadar)</h6>
                        <label htmlFor="institutionName">Primary Contact Name</label>
                        <input
                            type="number"
                            className="search__input"
                            name="primaryContactName"
                            // placeholder="Primary Contact Name"
                            value={formData.primaryContactName}
                            onChange={handleChange}
                        />
                        <label htmlFor="institutionName">Contact Number</label>
                        <input
                            type="number"
                            className="search__input"
                            name="contactNumber"
                            // placeholder="Contact Number"
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />
                        <label htmlFor="institutionName">Alternate Contact</label>
                        <input
                            type="number"
                            className="search__input"
                            name="alternateContact"
                            // placeholder="Alternate Contact"
                            value={formData.alternateContact}
                            onChange={handleChange}
                        />
                        <label htmlFor="institutionName">Email Address</label>
                        <input
                            type="email"
                            className="search__input"
                            name="email"
                            // placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="form-step">
                        <h6>Location</h6>
                        <label htmlFor="address">Full Address</label>
                        <input
                            className="search__input"
                            name="address"
                            // placeholder="Full Address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        <label htmlFor="city">District/City</label>
                        <input
                            className="search__input"
                            name="city"
                            // placeholder="District/City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        <label htmlFor="state">State  </label>
                        <input
                            className="search__input"
                            name="state"
                            // placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                        />
                        <label htmlFor="institutionName">Pin Code</label>
                        <input
                            type="number"
                            className="search__input"
                            name="pincode"
                            // placeholder="Pin Code"
                            value={formData.pincode}
                            onChange={handleChange}
                        />
                        <label htmlFor="institutionName">Geo-location (DIGIPIN)</label>
                        <input
                            className="search__input"
                            name="geoLocation"
                            // placeholder="Geo-location (DIGIPIN)"
                            value={formData.geoLocation}
                            onChange={handleChange}
                        />
                    </div>
                );
            case 3:
                return (
                    <div className="form-step">
                        <h6>Official Documents</h6>
                        <label htmlFor="registrationCertificate">Registration Certificate</label>
                        <input
                            className="search__input"
                            type="file"
                            name="registrationCertificate"
                            onChange={handleChange}
                        />
                        <label htmlFor="panCertificate">PAN or Trust Certificate</label>
                        <input
                            className="search__input"
                            type="file"
                            name="panCertificate"
                            onChange={handleChange}
                        />

                    </div>
                );
            case 4:
                return (
                    <div className="form-step">
                        <h6>Photos & Media</h6>
                        <label htmlFor="institutionName">Front View of Institution</label>
                        <input
                            className="search__input"
                            type="file"
                            name="frontPhoto"
                            onChange={handleChange}
                        />
                        <label htmlFor="institutionName">Name Board / Signboard Image</label>
                        <input
                            className="search__input"
                            type="file"
                            name="signBoard"
                            onChange={handleChange}
                        />
                        <label htmlFor="institutionName">Inside View</label>
                        <input
                            className="search__input"
                            type="file"
                            name="insideView"
                            onChange={handleChange}
                        />
                    </div>
                );
            case 5:
                return (
                    <div className="form-step">
                        <h6>Institution Profile</h6>
                        <label htmlFor="institutionName">Short Description</label>
                        <textarea
                            className="search__input"
                            name="description"
                            //   placeholder="Short Description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <label htmlFor="institutionName">Website URL</label>
                        <input
                            className="search__input"
                            name="website"
                            //   placeholder="Website URL"
                            value={formData.website}
                            onChange={handleChange}
                        />
                    </div>
                );
            case 6:
                return (
                    <div className="form-step">
                        <h6>Nominee</h6>
                        <label htmlFor="institutionName">Nominee Name</label>
                        <input
                            type="name"
                            className="search__input"
                            name="nomineeName"
                            //   placeholder="Nominee Name"
                            value={formData.nomineeName}
                            onChange={handleChange}
                        />
                        <label htmlFor="institutionName">Nominee Number</label>
                        <input
                            type="number"
                            className="search__input"
                            name="nomineeNumber"
                            //   placeholder="Nominee Number"
                            value={formData.nomineeNumber}
                            onChange={handleChange}
                        />
                        <label htmlFor="institutionName">Nominee Email</label>
                        <input
                            type="email"
                            className="search__input"
                            name="nomineeEmail"
                            //   placeholder="Relation to Institution"
                            value={formData.nomineeEmail}
                            onChange={handleChange}
                        />
                        <label htmlFor="institutionName">Relation to Institution</label>
                        <input
                            className="search__input"
                            name="nomineeRelation"
                            //   placeholder="Relation to Institution"
                            value={formData.nomineeRelation}
                            onChange={handleChange}
                        />
                    </div>
                );
            case 7:
                return (
                    <div className="form-step">
                        <h6>Consent</h6>
                        <div className="form-consent">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum voluptatibus autem repellendus eum ducimus praesentium sit minima nisi officia, facere eligendi illo similique fuga excepturi voluptatem nulla repudiandae exercitationem natus quae itaque voluptatum eveniet, dolore eaque. Nam animi amet, molestias autem vero suscipit illo hic reiciendis laboriosam quia facere dicta quidem ipsa. Aut tempora dolore itaque aliquam natus nesciunt nam quam modi? Quam fugiat blanditiis debitis veritatis minus, rem dolores laudantium quis sapiente, aliquid fugit magnam, ad doloribus ipsam. Ullam inventore nam corrupti facere aliquam harum reprehenderit soluta debitis. Ipsa veritatis aut rerum quae maiores laudantium rem fugiat deleniti ut.</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum voluptatibus autem repellendus eum ducimus praesentium sit minima nisi officia, facere eligendi illo similique fuga excepturi voluptatem nulla repudiandae exercitationem natus quae itaque voluptatum eveniet, dolore eaque. Nam animi amet, molestias autem vero suscipit illo hic reiciendis laboriosam quia facere dicta quidem ipsa. Aut tempora dolore itaque aliquam natus nesciunt nam quam modi? Quam fugiat blanditiis debitis veritatis minus, rem dolores laudantium quis sapiente, aliquid fugit magnam, ad doloribus ipsam. Ullam inventore nam corrupti facere aliquam harum reprehenderit soluta debitis. Ipsa veritatis aut rerum quae maiores laudantium rem fugiat deleniti ut.</p>
                        </div>
                        <div className="form-consent-checkbox">
                            <Checkbox name={"verificationAgreement"} checked={formData.verificationAgreement} handleChange={handleChange} text={"I authorize platform agent to visit and verify this institution"} />
                            <Checkbox name={"consentDeclaration"} checked={formData.consentDeclaration} handleChange={handleChange} text={"All provided information is true and verified."} />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="multi-step-form">
                <div key={currentStep} className={`form-steps step-${currentStep}`}>
                    {renderStep()}
                </div>
                <div className="responsiblity-btns">
                    {currentStep > 0 && <p onClick={handlePrevious}>Previous</p>}
                    {currentStep === 7 && !isProcessing && !isSubmitted && (
                        <p className="confirm" onClick={handleSubmit}>
                            Submit
                        </p>
                    )}
                    {currentStep < totalSteps - 1 && (
                        <p className="confirm" onClick={handleNext}>
                            Next
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
