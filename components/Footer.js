import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="The Balance Keepers"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="text-xl font-bold">The Balance Keepers</span>
            </div>
            <p className="text-gray-400">Professional accounting services you can trust.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
              <Link href="/login" className="block text-gray-400 hover:text-white transition-colors">Login</Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} The Balance Keepers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}