import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PrivacyContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Privacy <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: January 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-600 mb-6">
              The Balance Keepers ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-600 mb-4">We may collect personal information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Name and contact information (email, phone, address)</li>
                <li>Financial information necessary for our services</li>
                <li>Financial documents and accounting records</li>
                <li>Business information and documentation</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-600 mb-4">When you visit our website, we may automatically collect:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>IP address and browser information</li>
                <li>Website usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Provide accounting and bookkeeping services</li>
              <li>Prepare financial statements and accounting documents</li>
              <li>Communicate with you about our services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations or court orders</li>
              <li>With government agencies as required for regulatory filings and compliance reporting</li>
              <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-6">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure file transfer protocols, and regular security assessments.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-600 mb-6">
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Financial records and related documents are typically retained for at least seven years as required by law.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
            <p className="text-gray-600 mb-6">
              Our website uses cookies to enhance your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
            <p className="text-gray-600 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website with an updated effective date.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-lg border border-orange-100">
              <p className="text-gray-700 mb-2"><strong>The Balance Keepers</strong></p>
              <p className="text-gray-600">Email: privacy@balancekeepers.com</p>
              <p className="text-gray-600">Phone: (555) 123-4567</p>
              <p className="text-gray-600">Address: 123 Business Center Drive, Suite 200, Your City, ST 12345</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}