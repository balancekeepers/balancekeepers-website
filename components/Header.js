"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/init";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="The Balance Keepers"
              width={50}
              height={50}
              className="mr-3"
            />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">The Balance Keepers</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-orange-600 transition-colors">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-600 transition-colors">Contact</Link>
            {user ? (
              <button onClick={handleLogout} className="text-gray-700 hover:text-orange-600 transition-colors">
                Logout
              </button>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-orange-600 transition-colors">Login</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-orange-600 focus:outline-none focus:text-orange-600"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                <Link
                  href="/"
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}