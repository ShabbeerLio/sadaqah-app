import { AppWindow, ChevronLeft, Mail, Phone, TicketCheck } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="Home other">
      <div className="Home-main">
        <div className="profile-header other" style={{ marginTop: "1rem" }}>
                  <button className="back-button" onClick={() => navigate(-1)}>
                    <ChevronLeft />
                  </button>
                  <h2>Privacy Policy</h2>
                </div>
        <div className="notification-box">
          {/* <h5>Privacy Policy</h5> */}
          <div className="about-box">
            <p> <span>Effective Date:</span>  August 04, 2025</p>
            <p>Sadaqah App (“we”, “our”, or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our mobile application, website, or any related services (collectively, “Sadaqah App”).</p>
            <p>By using the Sadaqah App, you agree to the practices described in this policy.</p>
            <h5>1. Information We Collect</h5>
            <h6>a. Personal Information</h6>
            <p>We may collect the following personal details:</p>
            <ul>
              <li>Name</li>
              <li>Mobile number</li>
              <li>Email address</li>
              <li>Donation details (amount, purpose, type: Zakat, Sadaqah, etc.)</li>
              <li>Bank or payment-related information (only for processing donations)</li>
              <li>Location (optional – for personalized institution listing)</li>
            </ul>
            <h6>b. Institution Information</h6>
            <p>For verified institutions:</p>
            <ul>
              <li>Organization name</li>
              <li>Contact person details</li>
              <li>Registration documents</li>
              <li>Bank account details (for direct donation transfers)</li>
              <li>Logo and description</li>
            </ul>
            <h6>c. Usage Data</h6>
            <ul>
              <li>App usage activity</li>
              <li>IP address</li>
              <li>Device type and OS</li>
              <li>Log and crash data (for improving performance)</li>
            </ul>
            <h5>2. How We Use Your Information</h5>
            <p>We use your data to:</p>
            <ul>
              <li>Enable and process donations securely</li>
              <li>Display verified institutions and donation causes</li>
              <li>Contact you regarding app updates or support</li>
              <li>Prevent fraud and unauthorized use</li>
              <li>Improve app features and performance</li>
            </ul>
            <h5>3. How We Share Information</h5>
            <p>We do not sell, rent, or trade your personal information. We may share limited data:</p>
            <ul>
              <li>With verified institutions (for donation acknowledgement)</li>
              <li>With payment gateways (only for processing transactions)</li>
              <li>When required by law or for fraud investigation</li>
            </ul>
            <h5>4. Data Security</h5>
            <p>We take strong measures to protect your information:</p>
            <ul>
              <li>Encrypted storage and transfer of data</li>
              <li>Role-based access control for staff</li>
              <li>Verified login and OTP-based access</li>
              <li>Secure payment gateway integrations (e.g., Phonepe, Razorpay, Paytm, etc.)</li>
            </ul>
            <h5>5. Your Rights</h5>
            <p>You have the right to:</p>
            <ul>
              <li>Access and update your personal data</li>
              <li>Request deletion of your account</li>
              <li>Opt out of notifications or marketing emails</li>
              <li>View your donation history and receipts</li>
              <p>You can exercise these rights by contacting us at: <Link>support@sadaqahappindia.com</Link></p>
            </ul>
            <h5>6. Children's Privacy</h5>
            <p>Our services are not intended for children under the age of 13. We do not knowingly collect personal information from minors without parental consent.</p>
            <h5>7. Changes to this Policy</h5>
            <p>We may update this privacy policy as necessary. All changes will be posted within the app and on our website. Please review it periodically.</p>
            <h5>8. Contact Us</h5>
            <p>For any questions about this Privacy Policy or your data, please contact:</p>
            <div className="page-contact">
              <Link to={"mailto:support@sadaqahappindia.com"}> <Mail />support@sadaqahappindia.com</Link>
              <Link to={"/help"}> <TicketCheck />Submit a support ticket through the app.</Link>
              <Link to={"tel:+918383874007"}> <Phone />+91 83838 74007</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
