"use client";
import { useState } from "react";
import { push, ref } from "firebase/database";
import { database } from "../../lib/firebase/init";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData({
        ...formData,
        [name]: formattedPhone
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Validate required fields
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || 
        !formData.phone.trim() || !formData.service.trim() || !formData.message.trim()) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Validate phone number (should be 10 digits after formatting)
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    try {
      const inquiriesRef = ref(database, "inquiries");
      const newInquiry = {
        ...formData,
        timestamp: new Date().getTime(),
        timestamp: new Date().toISOString(),
        status: "new"
      };
      
      const result = await push(inquiriesRef, newInquiry);
      const inquiryKey = result.key;
      
      console.log("Inquiry saved with key:", inquiryKey);
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
    } catch (err) {
      console.error("Error saving inquiry:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Get In <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to take control of your finances? Contact us today for a free consultation and discover how we can help you achieve your financial goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
              
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-500"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength="14"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-500"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-gray-900"
                  >
                    <option value="">Select a service</option>
                    <option value="business-bookkeeping">Business Bookkeeping</option>
                    <option value="personal-accounting">Personal Accounting</option>
                    <option value="financial-consulting">Financial Consulting</option>
                    <option value="financial-planning">Financial Planning</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-500"
                    placeholder="Tell us about your needs..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                    <p className="text-sm text-gray-500">Monday - Friday, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600">info@balancekeepers.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Office</h3>
                    <p className="text-gray-600">
                      123 Business Center Drive<br/>
                      Suite 200<br/>
                      Your City, ST 12345
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Free Consultation</h3>
                <p className="text-gray-600 mb-4">
                  Schedule a free 30-minute consultation to discuss your accounting needs. We'll review your current situation and provide recommendations tailored to your goals.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                    No obligation consultation
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                    Personalized recommendations
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                    Clear pricing information
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}