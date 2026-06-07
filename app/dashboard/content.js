"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { onValue, ref } from "firebase/database";
import { database } from "../../lib/firebase/init";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading/Loading";

const GOAL_LABEL = {
  services: "Accounting services",
  training: "Training",
  exploring: "Exploring",
};

const CONNECT_LABEL = {
  consultation: "Free consultation",
  email: "Email follow-up",
  chat: "Quick chat",
};

const TIMELINE_LABEL = {
  asap: "ASAP",
  month: "Within a month",
  exploring: "Just exploring",
};

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function DashboardContent() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const profileRef = ref(database, `users/${user.uid}/profile`);
    const submissionsRef = ref(database, `users/${user.uid}/submissions`);

    const unsubProfile = onValue(profileRef, (snap) => {
      setProfile(snap.val());
    });
    const unsubSubs = onValue(submissionsRef, (snap) => {
      const val = snap.val() || {};
      const list = Object.values(val).sort((a, b) =>
        (b.timestamp || "").localeCompare(a.timestamp || "")
      );
      setSubmissions(list);
      setDataLoading(false);
    });

    return () => {
      unsubProfile();
      unsubSubs();
    };
  }, [user]);

  const handleSignOut = async () => {
    await logout();
    router.push("/");
  };

  if (loading || !user) {
    return <Loading />;
  }

  const displayName = user.displayName || user.email?.split("@")[0] || "there";
  const initial = (user.displayName || user.email || "U").charAt(0).toUpperCase();
  const providerId = user.providerData?.[0]?.providerId;
  const providerLabel =
    providerId === "google.com" ? "Google" : providerId === "password" ? "Email" : providerId || "Account";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Header />

      <section className="py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Top: greeting + sign out */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Welcome,{" "}
                <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  {displayName}
                </span>
              </h1>
              <p className="text-gray-600 mt-1">Your account and recent activity.</p>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="self-start sm:self-auto px-5 py-2.5 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:bg-white hover:border-orange-300 transition-colors"
            >
              Sign out
            </button>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center text-white text-2xl font-bold">
                  {initial}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg leading-tight">{displayName}</p>
                  <p className="text-sm text-gray-500">{providerLabel} sign-in</p>
                </div>
              </div>

              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-500">Email</dt>
                  <dd className="text-gray-900 font-medium break-words">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">User ID</dt>
                  <dd className="text-gray-900 font-mono text-xs break-all">{user.uid}</dd>
                </div>
                {profile?.lastSubmissionAt && (
                  <div>
                    <dt className="text-gray-500">Last submission</dt>
                    <dd className="text-gray-900 font-medium">
                      {typeof profile.lastSubmissionAt === "number"
                        ? new Date(profile.lastSubmissionAt).toLocaleString()
                        : "Recently"}
                    </dd>
                  </div>
                )}
              </dl>

              <Link
                href="/get-started"
                className="mt-6 block text-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold shadow hover:shadow-lg transition-shadow"
              >
                Start another
              </Link>
            </motion.div>

            {/* Submissions list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-orange-100 p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your submissions</h2>

              {dataLoading ? (
                <p className="text-gray-500 text-sm">Loading...</p>
              ) : submissions.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-orange-100 rounded-xl">
                  <p className="text-gray-600 mb-4">You haven't submitted anything yet.</p>
                  <Link
                    href="/get-started"
                    className="inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold shadow hover:shadow-lg transition-shadow"
                  >
                    Start Now
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {submissions.map((s) => (
                    <li
                      key={s.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-orange-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="font-semibold text-gray-900">
                          {GOAL_LABEL[s.goal] || s.goal}
                        </p>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatDate(s.timestamp)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        {s.clientType && (
                          <p>
                            <span className="text-gray-500">Client type: </span>
                            {s.clientType}
                            {s.employeeCount ? ` (${s.employeeCount} employees)` : ""}
                            {s.memberCount ? ` (${s.memberCount} members)` : ""}
                          </p>
                        )}
                        {s.services?.length > 0 && (
                          <p>
                            <span className="text-gray-500">Services: </span>
                            {s.services.length}
                          </p>
                        )}
                        {s.programs?.length > 0 && (
                          <p>
                            <span className="text-gray-500">Programs: </span>
                            {s.programs.length}
                          </p>
                        )}
                        {s.timeline && (
                          <p>
                            <span className="text-gray-500">Timeline: </span>
                            {TIMELINE_LABEL[s.timeline] || s.timeline}
                          </p>
                        )}
                        {s.connect && (
                          <p>
                            <span className="text-gray-500">Follow-up: </span>
                            {CONNECT_LABEL[s.connect] || s.connect}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
