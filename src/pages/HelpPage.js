import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import './HelpPage.css';

const HelpPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const helpSections = [
    {
      title: 'Getting Started',
      items: [
        { question: 'How to Create an Account', answer: 'To create an account, click on the "Sign In" button in the top right corner and select "Create Account". Fill in your details and follow the prompts.' },
        { question: 'How to Log In', answer: 'Click on the "Sign In" button in the top right corner. Enter your email and password, then click "Log In". We also offer social login options for quicker access.' },
      ],
    },
    {
      title: 'Payment and Pricing',
      items: [
        { question: 'Accepted Payment Methods', answer: 'We accept credit cards, debit cards, and various digital wallets. You can manage your payment methods in your account settings.' },
        { question: 'How to Apply Discounts', answer: 'Enter your promo code in the designated field during checkout. The discount will be applied automatically if the code is valid.' },
      ],
    },
    {
      title: 'Tracking Your Order',
      items: [
        { question: 'How to Track Your Order', answer: 'After placing your order, you will receive a confirmation with a tracking link. You can also track your order from the "My Orders" section of your account.' },
        { question: 'Estimated Delivery Time', answer: 'The app provides an estimated delivery time based on the restaurant\'s preparation time and current delivery conditions. You will see updates as your order progresses.' },
      ],
    },
    {
      title: 'Account Management',
      items: [
        { question: 'How to Reset Your Password', answer: 'Click on "Forgot Password" on the login page. Enter your email address, and we will send you instructions to reset your password.' },
        { question: 'Updating Personal Information', answer: 'Go to your account settings to update your personal information, including your name, email, phone number, and delivery addresses.' },
      ],
    },
    {
      title: 'Support',
      items: [
        { question: 'How to Contact Customer Support', answer: 'You can reach our customer support team via email at support@foodito.com, by phone at 1-800-FOODITO, or through the in-app chat feature.' },
        { question: 'FAQs', answer: 'Check our frequently asked questions section for quick answers to common queries.' },
      ],
    },
    {
      title: 'Refunds and Cancellations',
      items: [
        { question: 'How to Cancel an Order', answer: 'You can cancel an order within 5 minutes of placing it by going to "My Orders" and selecting "Cancel Order". After 5 minutes, please contact customer support for assistance.' },
        { question: 'Refund Policy', answer: 'Refunds are processed for canceled orders, missing items, or unsatisfactory experiences. Please contact customer support to initiate a refund request.' },
      ],
    },
  ];

  return (
    <div className="help-page">
      <h1>Help Center</h1>
      {helpSections.map((section, index) => (
        <div key={index} className="help-section">
          <button
            className="help-section-header"
            onClick={() => toggleSection(index)}
          >
            <span className="help-section-title">{section.title}</span>
            <span className={`icon ${openSection === index ? 'icon-rotated' : ''}`}>
              {openSection === index ? <ChevronUp /> : <ChevronDown />}
            </span>
          </button>
          {openSection === index && (
            <div className="help-section-content">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="help-item">
                  <h3 className="help-question">{item.question}</h3>
                  <p className="help-answer">{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HelpPage;
