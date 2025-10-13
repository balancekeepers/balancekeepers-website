"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="The Balance Keepers"
                width={40}
                height={40}
                className="mr-3"
              />
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <Link href="/profile" className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.displayName || user?.email?.split('@')[0]}</p>
                <p className="text-xs text-gray-500">View Profile</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Welcome back, <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">{user?.displayName || user?.email?.split('@')[0]}</span>
                </h1>
                <p className="text-gray-600 mt-2">Here's your financial overview for this month</p>
              </div>
              <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                Demo Mode
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Income</p>
                    <p className="text-2xl font-bold text-green-600">$12,450</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">+12% from last month</p>
              </motion.div>

              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600">$8,230</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">-3% from last month</p>
              </motion.div>

              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Net Profit</p>
                    <p className="text-2xl font-bold text-blue-600">$4,220</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">+28% from last month</p>
              </motion.div>

              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Tax Savings</p>
                    <p className="text-2xl font-bold text-purple-600">$1,850</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Projected for this year</p>
              </motion.div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid lg:grid-cols-3 gap-8">
              <motion.div 
                className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Transactions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Client Payment - ABC Corp</p>
                        <p className="text-sm text-gray-500">March 15, 2024</p>
                      </div>
                    </div>
                    <p className="font-semibold text-green-600">+$3,500.00</p>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Office Supplies</p>
                        <p className="text-sm text-gray-500">March 14, 2024</p>
                      </div>
                    </div>
                    <p className="font-semibold text-red-600">-$245.50</p>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Consultation Fee</p>
                        <p className="text-sm text-gray-500">March 12, 2024</p>
                      </div>
                    </div>
                    <p className="font-semibold text-green-600">+$850.00</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 rounded-lg font-medium hover:shadow-lg transition-all">
                    Upload Receipt
                  </button>
                  <button className="w-full border-2 border-orange-500 text-orange-600 p-4 rounded-lg font-medium hover:bg-orange-50 transition-all">
                    Schedule Meeting
                  </button>
                  <button className="w-full border-2 border-gray-300 text-gray-700 p-4 rounded-lg font-medium hover:bg-gray-50 transition-all">
                    View Tax Documents
                  </button>
                </div>
                
                <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Next Appointment</h4>
                  <p className="text-sm text-orange-700">Tax Planning Review</p>
                  <p className="text-sm text-orange-600">March 20, 2024 at 2:00 PM</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}