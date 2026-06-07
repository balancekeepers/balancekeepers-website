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
    <nav className="bg-white shadow-sm sticky top-0 z-40">
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
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-orange-600 transition-colors">About</Link>
            <Link href="/services" className="text-gray-700 hover:text-orange-600 transition-colors">Services</Link>
            <Link href="/training" className="text-gray-700 hover:text-orange-600 transition-colors">Training</Link>
            {user ? (
              <Link href="/dashboard" className="text-gray-700 hover:text-orange-600 transition-colors">Dashboard</Link>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-orange-600 transition-colors">Login</Link>
            )}
            <Link
              href="/get-started"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-5 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Start Now
            </Link>
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
                  href="/services"
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/training"
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Training
                </Link>
                {user ? (
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
                <Link
                  href="/get-started"
                  className="block mt-2 px-3 py-2 text-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}