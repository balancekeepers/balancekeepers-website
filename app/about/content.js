import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">The Balance Keepers</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are a team of dedicated accounting professionals committed to helping businesses and individuals achieve financial clarity and success.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At The Balance Keepers, we believe that accurate financial management is the foundation of every successful business and personal financial journey. Our mission is to provide reliable, professional accounting services that give our clients the confidence to make informed financial decisions.
              </p>
              <p className="text-lg text-gray-600">
                We combine years of experience with cutting-edge technology to deliver personalized solutions that meet the unique needs of each client, whether you're a growing business or an individual seeking financial clarity.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-xl border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Certified Public Accountants</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">15+ Years Combined Experience</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Personalized Service</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Latest Accounting Technology</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Competitive Pricing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Let us help you achieve financial clarity and peace of mind. Contact us today for a free consultation.
          </p>
          <Link href="/contact" className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all inline-block">
            Schedule Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}