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
                  <h2>Return and Refund</h2>
                </div>
        <div className="notification-box">
          {/* <h5>Return and Refund</h5> */}
          <div className="about-box">
            <p> <span>Effective Date:</span>  August 04, 2025</p>
            <p>At Sadaqah App, we aim to build a trusted and transparent platform where users can confidently donate to verified institutions. However, since all donations made through our platform are voluntary contributions to religious and charitable causes, they are generally non-refundable.</p>
            <p>We do understand that exceptional circumstances may occur. This policy outlines the situations and process for requesting a refund.</p>
            <h5>1. General Refund Policy</h5>
            <ul>
              <li>All donations made via Sadaqah App are considered final and non-refundable.</li>
              <li>We encourage users to double-check the amount, institution, and donation type before confirming any transaction.</li>
            </ul>
            <h5>2. Exceptional Cases for Refund</h5>
            <p>We may consider refund requests only under the following rare circumstances:</p>
            <ul>
              <li>Duplicate transactions due to technical errors.</li>
              <li>Unauthorized or fraudulent transactions made without the donor’s consent.</li>
              <li>Donation sent to the wrong institution due to system malfunction (not user error).</li>
            </ul>
            <h5>3. How to Request a Refund</h5>
            <p>If you believe your case qualifies for a refund:</p>
            <ul>
              <li>Log in to the app.</li>
              <li>Navigate to "Support" - "Submit a Ticket".</li>
              <li>Select "Refund Request" as the ticket type.</li>
              <li>Clearly mention:</li>
              <ul>
                <li>Donation ID</li>
                <li>Date of transaction</li>
                <li>Amount donated</li>
                <li>Reason for requesting a refund</li>
              </ul>
            </ul>
            <p>We will review the request and respond within 5–7 business days.</p>
            <h5>4. Approval & Processing</h5>
            <ul>
              <li>If your refund request is approved, the amount will be returned to your original payment method within 7–10 business days.</li>
              <li>We may request additional verification documents or transaction details during the process.</li>
            </ul>
            <h5>5. Institution-Specific Donations</h5>
            <p>Once a donation is transferred to an institution’s account, refunds are generally not possible. However, if you believe the institution has violated our terms or misused your donation, please file a support ticket so we can investigate and take appropriate action.</p>
            <h5>6. Need Help?</h5>
            <p>If you face any issues, you can reach us via:</p>
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
