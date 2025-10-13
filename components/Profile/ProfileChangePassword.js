"use client";
import { useState } from "react";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../../lib/firebase/init";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileChangePassword() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isEmailProvider = user?.providerData?.[0]?.providerId === 'password';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      // Re-authenticate user first
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Update password
      await updatePassword(auth.currentUser, newPassword);
      
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      if (err.code === 'auth/wrong-password') {
        setError("Current password is incorrect");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors w-full"
      >
        <svg className="w-6 h-6 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
        </svg>
        Change Password
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>

            {!isEmailProvider ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Password Managed by Google</h4>
                <p className="text-gray-600 mb-6">
                  Your account uses Google sign-in. To change your password, please update it through your Google account settings.
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded font-medium"
                >
                  Got it
                </button>
              </div>
            ) : (
              <>
                {success && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
                    Password changed successfully!
                  </div>
                )}

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded font-medium disabled:opacity-50"
                    >
                      {loading ? "Changing..." : "Change Password"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}