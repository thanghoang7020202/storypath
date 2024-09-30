import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Privacy Policy</h1>
        <p className="lead">Your privacy is important to us.</p>
      </div>
      
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <p className="mb-4">
            At <strong>StoryPath</strong>, we value your privacy and are committed to protecting your personal information. 
            This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <p className="mb-4">
            We collect information from you when you register on our site, place an order, subscribe to our newsletter, 
            or fill out a form. The information we may collect includes your name, email address, phone number, and any messages you send us.
          </p>
          <p className="mb-4">
            We may use the information we collect from you in the following ways:
          </p>
          <ul className="mb-4">
            <li>To personalize your experience and improve our website.</li>
            <li>To process your transactions and send you confirmation.</li>
            <li>To send periodic emails regarding your order or other products and services.</li>
            <li>To respond to your inquiries and/or other requests or questions.</li>
          </ul>
          <p className="mb-4">
            We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. 
            This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or servicing you, 
            so long as those parties agree to keep this information confidential.
          </p>
          <p className="mb-4">
            We may also release information when it's release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property or safety.
          </p>

          <h2 className="text-center mb-4">Your Rights</h2>
          <p className="mb-4">
            You have the right to request access to the personal information we hold about you and to ask that your personal information be corrected or deleted. 
            To exercise these rights, please contact us using the information provided below.
          </p>

          <h2 className="text-center mb-4">Contact Us</h2>
          <div className="text-center mb-5">
            <p>
              If you have any questions about this Privacy Policy, please contact us at 
              <a href="mailto:s4759487@uq.edu.au"> s4759487@uq.edu.au</a> or visit our <a href="/contact">Contact page</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
