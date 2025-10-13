import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Terms of <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: January 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Terms of Service Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing and using the services provided by The Balance Keepers ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Provided</h2>
            <p className="text-gray-600 mb-4">The Balance Keepers provides professional accounting services including but not limited to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Bookkeeping and financial record maintenance</li>
              <li>Financial record preparation and management</li>
              <li>Financial consulting and advisory services</li>
              <li>Business accounting and financial management</li>
              <li>Personal accounting services</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Responsibilities</h2>
            <p className="text-gray-600 mb-4">As a client, you agree to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Provide accurate, complete, and timely information</li>
              <li>Maintain organized records and documentation</li>
              <li>Pay all fees in accordance with our fee schedule</li>
              <li>Notify us promptly of any changes affecting your financial situation</li>
              <li>Review all work product and provide feedback in a timely manner</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Standards</h2>
            <p className="text-gray-600 mb-6">
              Our services are performed in accordance with applicable professional standards, including those established by the American Institute of Certified Public Accountants (AICPA) and relevant state regulatory bodies. We maintain the highest standards of professional competence and ethical conduct.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Confidentiality</h2>
            <p className="text-gray-600 mb-6">
              We maintain strict confidentiality regarding all client information and will not disclose any confidential information without your written consent, except as required by law or professional standards. This confidentiality obligation continues even after our professional relationship ends.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fees and Payment</h2>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">Client agrees to pay fees according to our established fee schedule:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Fees are due within 30 days of invoice date</li>
                <li>Late payments may incur additional charges</li>
                <li>Services may be suspended for non-payment</li>
                <li>Fee estimates are subject to change based on scope of work</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              Our liability for any claim relating to our services is limited to the amount of fees paid for the specific service giving rise to the claim. We are not liable for any indirect, special, incidental, or consequential damages. Our maximum liability shall not exceed the total fees paid by the client in the 12 months preceding the claim.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accuracy of Information</h2>
            <p className="text-gray-600 mb-6">
              While we strive for accuracy in all our work, the client acknowledges that we rely on information provided by the client and third parties. We are not responsible for errors arising from incomplete, inaccurate, or untimely information provided by others.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-600 mb-4">Either party may terminate this agreement with written notice:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>30 days' notice for ongoing services</li>
              <li>Immediate termination for breach of contract</li>
              <li>Client remains responsible for all fees incurred prior to termination</li>
              <li>We will provide reasonable assistance in transitioning to new service providers</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
            <p className="text-gray-600 mb-6">
              Any disputes arising from this agreement will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration will be conducted in our local jurisdiction.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Compliance with Laws</h2>
            <p className="text-gray-600 mb-6">
              Client represents that all information provided is accurate and that all activities are in compliance with applicable laws and regulations. We reserve the right to withdraw from any engagement that may involve illegal activities.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of any changes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-lg border border-orange-100">
              <p className="text-gray-700 mb-2"><strong>The Balance Keepers</strong></p>
              <p className="text-gray-600">Email: info@balancekeepers.com</p>
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