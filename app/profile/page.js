"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../components/Loading/Loading";
import ProfileUpdate from "../../components/Profile/ProfileUpdate";
import ProfileChangePassword from "../../components/Profile/ProfileChangePassword";

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
          <Link href="/login" className="text-orange-600 hover:text-orange-700 underline mt-2 inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Profile Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center mr-6">
                <Image
                  src="/logo.png"
                  alt="The Balance Keepers"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <span className="text-xl font-bold text-gray-900">Profile</span>
              </Link>
            </div>
            <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">
                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user?.displayName || 'User Profile'}
                  </h1>
                  <p className="text-gray-600 mt-2">{user?.email}</p>
                  <div className="flex items-center mt-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-500">Account Active</span>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                      <p className="text-gray-900">{user?.displayName || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                      <p className="text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">User ID</label>
                      <p className="text-gray-600 text-sm font-mono">{user?.uid}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Account Created</label>
                      <p className="text-gray-900">
                        {user?.metadata?.creationTime 
                          ? new Date(user.metadata.creationTime).toLocaleDateString()
                          : 'Not available'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Sign-in Method</label>
                      <p className="text-gray-900">
                        {user?.providerData?.[0]?.providerId === 'google.com' ? 'Google' : 'Email/Password'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Last Sign In</label>
                      <p className="text-gray-900">
                        {user?.metadata?.lastSignInTime 
                          ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                          : 'Not available'
                        }
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email Verified</label>
                      <div className="flex items-center">
                        {user?.emailVerified ? (
                          <>
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-green-600">Verified</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-red-600">Not Verified</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Actions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <ProfileUpdate />
                <ProfileChangePassword />
                <Link href="/contact" className="p-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-center">
                  <svg className="w-6 h-6 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                  </svg>
                  Contact Support
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}