import { AppWindow, Mail, Phone, TicketCheck } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
  return (
    <div className="Home">
      <div className="Home-main">
        <div className="notification-box">
          <h5>Terms and Conditions</h5>
          <div className="about-box">
            <p> <span>Effective Date:</span>  August 04, 2025</p>
            <p>Welcome to Sadaqah App (“we”, “our”, “us”). These Terms and Conditions govern your use of our mobile application, website, and related services (collectively referred to as the “App”). By using our App, you agree to abide by these Terms.</p>
            <p>If you do not agree with these Terms, please do not use the App.</p>
            <h5>1. Purpose of the App</h5>
            <p>Sadaqah App serves as a platform to connect donors with verified Islamic institutions, including mosques, madrasas, orphanages, and charitable trusts. Donations can be made under various categories including Sadaqah, Zakat, Fitrah, and others.</p>
            <h5>2. User Responsibilities</h5>
            <p>By using this app, you agree to:</p>
            <ul>
              <li>Provide accurate and true personal information during registration or donation.</li>
              <li>Use the App only for lawful purposes in line with its intended charitable use.</li>
              <li>Not impersonate another person or organization.</li>
              <li>Refrain from exploiting or abusing the donation process or other users.</li>
            </ul>
            <h5>3. Donations and Transactions</h5>
            <ul>
              <li>Donations made through the App are voluntary and non-refundable.</li>
              <li>We are not responsible for misuse of funds by institutions, though we take measures to verify each listed institution.</li>
              <li>Donation receipts will be generated digitally and sent via email or shown in your account.</li>
              <li>All payment transactions are securely processed through third-party gateways.</li>
            </ul>
            <h5>4. Institutional Listings</h5>
            <ul>
              <li>Only verified and approved institutions are allowed to receive donations via the App.</li>
              <li>Institutions must provide valid documents and bank account information for verification.</li>
              <li>We reserve the right to remove any institution that is found to violate trust, misuse funds, or provide misleading information.</li>
            </ul>
            <h5>5. Account Deletion and Data</h5>
            <p>You may delete your account anytime by contacting us at support@sadaqahappindia.com. Your data will be deleted as per our Privacy Policy unless required for legal compliance.</p>
            <h5>6. Intellectual Property</h5>
            <p>All logos, content, design, and technology used in the Sadaqah App are our intellectual property. You may not copy, reproduce, or modify any part of the App without written permission.</p>
            <h5>7. Termination</h5>
            <p>We reserve the right to suspend or terminate your access to the App if:</p>
            <ul>
              <li>You violate any terms of this agreement.</li>
              <li>You misuse the platform in any way.</li>
              <li>Your actions are harmful to the app or its users.</li>
            </ul>
            <h5>8. Limitation of Liability</h5>
            <p>While we aim to provide accurate and secure services, we are not liable for:</p>
            <ul>
              <li>Errors in donation processing by third-party payment gateways.</li>
              <li>Misuse of funds by listed institutions.</li>
              <li>Temporary unavailability of the app due to maintenance or server issues.</li>
            </ul>
            <h5>9. Modifications to Terms</h5>
            <p>We may update or modify these Terms and Conditions at any time. Changes will be notified via the App or email. Continued use after changes implies acceptance of the revised terms.</p>
            <h5>10. Contact Us</h5>
            <p>For questions, support, or legal concerns</p>
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
