"use client";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../../lib/firebase/init";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileUpdate() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName.trim()
      });
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err.message);
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
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
        </svg>
        Update Profile
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Update Profile</h3>

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
                Profile updated successfully!
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your display name"
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
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}