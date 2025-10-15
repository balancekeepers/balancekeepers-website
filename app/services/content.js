"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ref, push } from "firebase/database";
import { database } from "../../lib/firebase/init";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ServicesContent() {
  const [selectedClientType, setSelectedClientType] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [employeeCount, setEmployeeCount] = useState("");
  const [memberCount, setMemberCount] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (serviceTitle) => {
    setSelectedServices(prev =>
      prev.includes(serviceTitle)
        ? prev.filter(s => s !== serviceTitle)
        : [...prev, serviceTitle]
    );
  };

  const handleClientTypeChange = (type) => {
    setSelectedClientType(type);
    // Reset counts when changing client type
    if (type !== "Companies") setEmployeeCount("");
    if (type !== "Groups") setMemberCount("");
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '');

    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const normalizeEmail = (email) => {
    return email.toLowerCase().trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create reference and get the key
      const leadsRef = ref(database, 'leads');
      const newLeadRef = push(leadsRef);
      const responseKey = newLeadRef.key;

      const formData = {
        id: responseKey,
        clientType: selectedClientType,
        services: selectedServices,
        email: normalizeEmail(email),
        phone: phone.replace(/\D/g, ''), // Store only digits
        phoneFormatted: phone, // Store formatted version too
        timestamp: new Date().toISOString()
      };

      // Add employee count for Companies
      if (selectedClientType === "Companies" && employeeCount) {
        formData.employeeCount = employeeCount;
      }

      // Add member count for Groups
      if (selectedClientType === "Groups" && memberCount) {
        formData.memberCount = memberCount;
      }

      // Push to Firebase
      await push(leadsRef, formData);

      console.log("Form Submission:", formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your request. Please try again.");
    }
  };

  // Validate form based on client type
  const isFormValid = () => {
    if (!selectedClientType || selectedServices.length === 0 || !email || !phone || !agreedToTerms) {
      return false;
    }
    if (selectedClientType === "Companies" && !employeeCount) {
      return false;
    }
    if (selectedClientType === "Groups" && !memberCount) {
      return false;
    }
    return true;
  };
  const services = [
    {
      title: "Bookkeeping",
      description: "Accurate and timely recording of all financial transactions. We maintain your books with precision so you always have a clear picture of your financial health.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
        </svg>
      ),
      delay: 0.1
    },
    {
      title: "Annual Reports",
      description: "Comprehensive yearly financial reports that provide a complete overview of your financial performance, perfect for stakeholders and tax purposes.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
        </svg>
      ),
      delay: 0.2
    },
    {
      title: "Quarterly Reports",
      description: "Regular quarterly financial reporting to keep you informed of your financial position and help you make timely business decisions.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
        </svg>
      ),
      delay: 0.3
    },
    {
      title: "Reconciling",
      description: "Bank and account reconciliation services to ensure your records match your actual financial transactions and identify any discrepancies.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
        </svg>
      ),
      delay: 0.1
    },
    {
      title: "Banks & Credit Cards",
      description: "Complete management and reconciliation of all bank accounts and credit card transactions to maintain accurate financial records.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
        </svg>
      ),
      delay: 0.2
    },
    {
      title: "Payroll Submit",
      description: "Efficient payroll processing and submission services ensuring your employees are paid accurately and on time, every time.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
        </svg>
      ),
      delay: 0.3
    },
    {
      title: "Prep for Audits",
      description: "Thorough preparation and organization of your financial records to ensure a smooth and successful audit process.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"/>
        </svg>
      ),
      delay: 0.1
    },
    {
      title: "Financial Statements",
      description: "Professional preparation of comprehensive financial statements that accurately reflect your financial position and performance.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
        </svg>
      ),
      delay: 0.2
    },
    {
      title: "P&L and Balance Sheet",
      description: "Detailed profit and loss statements and balance sheets that provide clear insights into your financial health and business performance.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
        </svg>
      ),
      delay: 0.3
    },
    {
      title: "Fixing Books",
      description: "Expert cleanup and correction of messy or inaccurate financial records to get your books back on track and compliant.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
        </svg>
      ),
      delay: 0.1
    }
  ];

  const clientTypes = [
    {
      title: "Personal",
      description: "Individual financial management and personal bookkeeping services tailored to your needs.",
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      title: "Companies",
      description: "Comprehensive business accounting solutions for small to large companies of all industries.",
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      title: "Groups",
      description: "Specialized accounting services for non-profits, associations, and organizational groups.",
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-10 w-16 h-16 bg-yellow-200 rounded-full opacity-20"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-12 h-12 bg-orange-300 rounded-full opacity-30"
          animate={{ x: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Our <motion.span
                className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                Services
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              Comprehensive accounting and bookkeeping solutions designed to keep your financial records accurate,
              compliant, and ready for growth.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact" className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all inline-block">
                  Get Started Today
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Step 1: Who We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the option that best describes you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {clientTypes.map((type, index) => {
              const isSelected = selectedClientType === type.title;
              const needsCount = type.title === "Companies" || type.title === "Groups";
              const currentCount = type.title === "Companies" ? employeeCount : memberCount;
              const isComplete = !needsCount || (isSelected && currentCount);

              return (
                <motion.div
                  key={type.title}
                  className={`relative rounded-xl border-2 transition-all overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 border-orange-500 shadow-xl scale-105'
                      : 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-100 hover:shadow-lg hover:border-orange-300'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  {/* Main Card Content - Clickable */}
                  <div
                    onClick={() => handleClientTypeChange(type.title)}
                    className="p-8 text-center cursor-pointer"
                  >
                    <div className="flex justify-center mb-4">
                      <div className={isSelected ? 'text-white' : ''}>
                        {type.icon}
                      </div>
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 ${
                      isSelected ? 'text-white' : 'text-gray-900'
                    }`}>
                      {type.title}
                    </h3>
                    <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                      {type.description}
                    </p>
                  </div>

                  {/* Integrated Counter Section */}
                  {isSelected && needsCount && (
                    <motion.div
                      className="px-8 pb-8"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                        <label
                          htmlFor={`count-${type.title}`}
                          className="block text-sm font-semibold text-white mb-2"
                        >
                          {type.title === "Companies" ? "Number of Employees" : "Number of Members"}
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id={`count-${type.title}`}
                            min="1"
                            value={currentCount}
                            onChange={(e) => {
                              e.stopPropagation();
                              type.title === "Companies"
                                ? setEmployeeCount(e.target.value)
                                : setMemberCount(e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            placeholder={type.title === "Companies" ? "e.g., 25" : "e.g., 50"}
                            required
                            className="w-full px-4 py-3 bg-white border-2 border-white/50 rounded-lg focus:ring-2 focus:ring-white focus:border-white transition-all text-gray-900 font-semibold placeholder:text-gray-400"
                          />
                          {currentCount && (
                            <motion.div
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                              </svg>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Selection Indicator Badge */}
                  {isSelected && (
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {isComplete ? (
                        <div className="bg-white rounded-full p-2 shadow-lg">
                          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      ) : (
                        <div className="bg-white rounded-full p-2 shadow-lg">
                          <svg className="w-6 h-6 text-orange-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Services Grid Section */}
      <motion.section
        className="py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Step 2: What We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select all the services you're interested in
            </p>
            {selectedServices.length > 0 && (
              <motion.p
                className="mt-4 text-orange-600 font-semibold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected
              </motion.p>
            )}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const isSelected = selectedServices.includes(service.title);
              return (
                <motion.div
                  key={service.title}
                  onClick={() => toggleService(service.title)}
                  className={`p-8 rounded-xl shadow-md cursor-pointer transition-all border-2 ${
                    isSelected
                      ? 'bg-gradient-to-br from-orange-500 to-yellow-500 border-orange-500 shadow-xl'
                      : 'bg-white border-transparent hover:shadow-xl hover:border-orange-200'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: service.delay }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-white/20' : 'bg-gradient-to-r from-orange-500 to-yellow-500'
                      }`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={isSelected ? 'text-white' : ''}>
                        {service.icon}
                      </div>
                    </motion.div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </motion.div>
                    )}
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    isSelected ? 'text-white' : 'text-gray-900'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={isSelected ? 'text-white/90' : 'text-gray-600'}>
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-orange-500 to-yellow-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-center">
                Step 3: Get Your Free Consultation
              </h2>
              <p className="text-xl text-white/90 mb-8 text-center">
                Let us know how to reach you and we'll be in touch soon
              </p>

              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-8 space-y-6">
                {/* Summary */}
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Your Selection:</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    {selectedClientType && (
                      <div>
                        <p>
                          <span className="font-medium">Client Type:</span> {selectedClientType}
                        </p>
                        {selectedClientType === "Companies" && employeeCount && (
                          <p className="ml-4">
                            <span className="font-medium">Employees:</span> {employeeCount}
                          </p>
                        )}
                        {selectedClientType === "Groups" && memberCount && (
                          <p className="ml-4">
                            <span className="font-medium">Members:</span> {memberCount}
                          </p>
                        )}
                      </div>
                    )}
                    {selectedServices.length > 0 && (
                      <div>
                        <span className="font-medium">Services ({selectedServices.length}):</span>
                        <ul className="list-disc list-inside ml-4 mt-1">
                          {selectedServices.map(service => (
                            <li key={service}>{service}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => setEmail(normalizeEmail(e.target.value))}
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all lowercase"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                    placeholder="(555) 123-4567"
                    maxLength="14"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: (XXX) XXX-XXXX</p>
                </div>

                {/* Terms and Privacy Agreement */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Privacy & Data Protection
                    </h4>
                    <div className="text-xs text-gray-600 leading-relaxed space-y-2">
                      <p>
                        <strong>Your Privacy Rights:</strong> By submitting this form, you acknowledge that The Balance Keepers will collect and process the personal information you provide (including name, email, phone number, and service preferences) to respond to your consultation request and provide you with information about our services.
                      </p>
                      <p>
                        <strong>Data Use:</strong> We will use your information solely to contact you regarding your consultation request and to provide relevant information about our accounting services. We will not sell, rent, or share your personal information with third parties for marketing purposes.
                      </p>
                      <p>
                        <strong>California Residents (CCPA):</strong> If you are a California resident, you have the right to request disclosure of the categories and specific pieces of personal information we have collected, the right to request deletion of your personal information, and the right to opt-out of the sale of your personal information (we do not sell personal information). You also have the right not to be discriminated against for exercising these rights.
                      </p>
                      <p>
                        <strong>Other State Privacy Rights:</strong> Residents of Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), and Utah (UCPA) have similar rights to access, correct, delete, and obtain a copy of your personal data, as well as opt-out rights for certain data processing activities.
                      </p>
                      <p>
                        <strong>Data Security:</strong> We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                      </p>
                      <p>
                        <strong>Contact & Consent Withdrawal:</strong> You may withdraw your consent or exercise your privacy rights at any time by contacting us. For more details, please review our <Link href="/privacy" className="text-orange-600 hover:text-orange-700 underline font-medium">Privacy Policy</Link> and <Link href="/terms" className="text-orange-600 hover:text-orange-700 underline font-medium">Terms of Service</Link>.
                      </p>
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start pt-4 border-t border-gray-300">
                    <div className="flex items-center h-5">
                      <input
                        id="terms-agreement"
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        required
                        className="w-5 h-5 text-orange-600 bg-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
                      />
                    </div>
                    <label htmlFor="terms-agreement" className="ml-3 text-sm text-gray-700 cursor-pointer">
                      <span className="font-semibold">I agree to the data collection and processing described above *</span>
                      <br />
                      <span className="text-xs">
                        I consent to The Balance Keepers collecting and using my personal information as described, and I acknowledge my privacy rights under applicable state and federal laws including CCPA, VCDPA, CPA, CTDPA, and UCPA.
                      </span>
                    </label>
                  </div>

                  {!agreedToTerms && (email || phone) && (
                    <motion.p
                      className="mt-3 text-xs text-orange-600 flex items-center"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      Please check the box to agree to our privacy policy and terms
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                    isFormValid()
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:shadow-xl hover:scale-105 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  whileHover={isFormValid() ? { scale: 1.02 } : {}}
                  whileTap={isFormValid() ? { scale: 0.98 } : {}}
                >
                  {!selectedClientType || selectedServices.length === 0
                    ? 'Please complete steps above'
                    : (selectedClientType === "Companies" && !employeeCount) || (selectedClientType === "Groups" && !memberCount)
                    ? `Please enter ${selectedClientType === "Companies" ? "employee" : "member"} count`
                    : !agreedToTerms
                    ? 'Please agree to privacy policy'
                    : 'Get Your Free Consultation'}
                </motion.button>

                <p className="text-xs text-center text-gray-500 -mt-2">
                  By submitting this form, you agree to be contacted by The Balance Keepers regarding your consultation request.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
              <p className="text-lg text-gray-600 mb-6">
                We've received your information and will be in touch shortly to discuss your needs.
              </p>
              <div className="bg-orange-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Client Type:</span> {selectedClientType}
                  {selectedClientType === "Companies" && employeeCount && (
                    <span className="ml-2">({employeeCount} employees)</span>
                  )}
                  {selectedClientType === "Groups" && memberCount && (
                    <span className="ml-2">({memberCount} members)</span>
                  )}
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  <span className="font-semibold">Services:</span> {selectedServices.join(', ')}
                </p>
              </div>
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Return to Home
              </Link>
            </motion.div>
          )}
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
