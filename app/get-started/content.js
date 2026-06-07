"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ref, push, set, serverTimestamp } from "firebase/database";
import { auth, database } from "../../lib/firebase/init";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading/Loading";

function Icon({ name, className = "w-7 h-7" }) {
  const paths = {
    book: <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />,
    refresh: <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />,
    card: (
      <>
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
      </>
    ),
    briefcase: <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />,
    barChart: <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />,
    trendUp: <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />,
    document: <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />,
    scale: (
      <>
        <path d="M10 2a1 1 0 011 1v1.586l3.293-3.293a1 1 0 011.414 1.414L12.414 6H14a1 1 0 110 2h-3a1 1 0 01-1-1V3a1 1 0 011-1z" />
        <path fillRule="evenodd" d="M10 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zm-6 4a1 1 0 011 1c0 1.657 1.343 3 3 3s3-1.343 3-3a1 1 0 112 0 5 5 0 11-10 0 1 1 0 011-1zm11 0a1 1 0 011 1 5 5 0 11-10 0 1 1 0 112 0c0 1.657 1.343 3 3 3s3-1.343 3-3a1 1 0 011-1z" clipRule="evenodd" />
      </>
    ),
    search: <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />,
    wrench: <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />,
    desktop: <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />,
    cloud: <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />,
    academicCap: <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />,
    cash: (
      <>
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
      </>
    ),
    trendDown: <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />,
    storefront: <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />,
    table: <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />,
    receipt: (
      <>
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
      </>
    ),
    user: <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />,
    building: <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12h1a1 1 0 110 2H3a1 1 0 110-2h1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9zm-4 4a1 1 0 00-1 1v3h2v-3a1 1 0 00-1-1zm3 0a1 1 0 011 1v3h-2v-3a1 1 0 011-1z" clipRule="evenodd" />,
    users: <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />,
    lightning: <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />,
    calendar: <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />,
    compass: <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.293-13.707a1 1 0 011.414 0l1 1a1 1 0 010 1.414L7 12.414V14a1 1 0 001 1h1.586l5.707-5.707a1 1 0 011.414 1.414L9.414 17H6a2 2 0 01-2-2v-3.414l6.293-6.293z" clipRule="evenodd" />,
    sprout: <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />,
    starOutline: <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.293z" />,
    starFilled: <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />,
    phone: <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />,
    envelope: (
      <>
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </>
    ),
    chat: <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.84 8.84 0 01-3.082-.55L3 17l1.262-3.155A6.94 6.94 0 014 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clipRule="evenodd" />,
    monitor: <path fillRule="evenodd" d="M2 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm14 0H4v8h12V4zm-7 14a1 1 0 01-1-1v-1h4v1a1 1 0 01-1 1H9z" clipRule="evenodd" />,
    pin: <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />,
    sparkles: <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2l4.456 1.178a1 1 0 010 1.937l-4.456 1.18-1.18 4.455a1 1 0 01-1.933 0L9.854 11.5 5.398 10.32a1 1 0 010-1.937l4.456-1.18 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />,
    check: <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />,
    question: <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1.5 1.5 0 00-1.5 1.5 1 1 0 11-2 0 3.5 3.5 0 117 0c0 1.317-.728 2.022-1.448 2.497-.74.489-1.052.851-1.052 1.503a1 1 0 11-2 0c0-1.681 1.094-2.382 1.671-2.764A1.487 1.487 0 0011.5 6.5 1.5 1.5 0 0010 5z" clipRule="evenodd" />,
  };
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const SERVICE_OPTIONS = [
  { id: "bookkeeping", title: "Bookkeeping", icon: "book" },
  { id: "reconciling", title: "Reconciling", icon: "refresh" },
  { id: "banks-cc", title: "Banks & Credit Cards", icon: "card" },
  { id: "payroll", title: "Payroll Submit", icon: "briefcase" },
  { id: "quarterly", title: "Quarterly Reports", icon: "barChart" },
  { id: "annual", title: "Annual Reports", icon: "trendUp" },
  { id: "statements", title: "Financial Statements", icon: "document" },
  { id: "pl-balance", title: "P&L and Balance Sheet", icon: "scale" },
  { id: "audit-prep", title: "Audit Preparation", icon: "search" },
  { id: "fix-books", title: "Fixing Books", icon: "wrench" },
];

const TRAINING_OPTIONS = [
  { id: "qb-desktop", title: "QuickBooks Desktop", icon: "desktop" },
  { id: "qb-online", title: "QuickBooks Online", icon: "cloud" },
  { id: "bk-fundamentals", title: "Bookkeeping Fundamentals", icon: "academicCap" },
  { id: "payroll-proc", title: "Payroll Processing", icon: "cash" },
  { id: "reporting", title: "Financial Reporting & Analysis", icon: "trendDown" },
  { id: "small-biz", title: "Small Business Accounting", icon: "storefront" },
  { id: "excel", title: "Excel for Accounting", icon: "table" },
  { id: "tax", title: "Tax Preparation Basics", icon: "receipt" },
];

const EXPLORE_TOPICS = [
  "How pricing works",
  "Difference between services and training",
  "Best fit for a small business",
  "Best fit for a non-profit",
  "Doing my own books vs hiring",
  "Cleaning up messy books",
];

function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="w-full bg-orange-100 rounded-full h-2 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

function StepCard({ children, stepKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-orange-100"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function OptionCard({ selected, onClick, icon, title, description }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
        selected
          ? "bg-gradient-to-br from-orange-500 to-yellow-500 border-orange-500 text-white shadow-xl"
          : "bg-white border-orange-100 hover:border-orange-300 hover:shadow-lg text-gray-900"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
          selected ? "bg-white/20 text-white" : "bg-gradient-to-br from-orange-500 to-yellow-500 text-white"
        }`}
      >
        <Icon name={icon} className="w-6 h-6" />
      </div>
      <h3 className={`text-lg font-bold mb-1 ${selected ? "text-white" : "text-gray-900"}`}>
        {title}
      </h3>
      {description && (
        <p className={`text-sm ${selected ? "text-white/90" : "text-gray-600"}`}>
          {description}
        </p>
      )}
    </motion.button>
  );
}

function ChipGrid({ options, selected, onToggle, columns = 2 }) {
  return (
    <div className={`grid gap-3 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
      {options.map((opt) => {
        const isOn = selected.includes(opt.id);
        return (
          <motion.button
            type="button"
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
              isOn
                ? "bg-gradient-to-r from-orange-500 to-yellow-500 border-orange-500 text-white shadow-lg"
                : "bg-white border-gray-200 hover:border-orange-300 text-gray-900"
            }`}
          >
            <span
              className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isOn ? "bg-white/20 text-white" : "bg-orange-50 text-orange-600"
              }`}
            >
              <Icon name={opt.icon} className="w-5 h-5" />
            </span>
            <span className="font-medium flex-1">{opt.title}</span>
            {isOn && (
              <Icon name="check" className="w-5 h-5 text-white flex-shrink-0" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const GOAL_FLOW = {
  services: ["who", "headcount", "services", "timeline", "connect", "contact", "review"],
  training: ["skill", "programs", "format", "connect", "contact", "review"],
  exploring: ["topics", "exploring-contact", "review"],
};

export default function GetStartedContent() {
  const { user, loading: authLoading } = useAuth();
  const [goal, setGoal] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [data, setData] = useState({
    clientType: null,
    employeeCount: "",
    memberCount: "",
    services: [],
    timeline: null,
    skillLevel: null,
    programs: [],
    format: null,
    connect: null,
    topics: [],
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const flow = goal ? GOAL_FLOW[goal] : [];
  const totalSteps = goal ? flow.length + 1 : 1;
  const currentStepKey = goal ? flow[stepIndex] : "goal";

  const setField = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const toggleArr = (k, id) =>
    setData((d) => ({
      ...d,
      [k]: d[k].includes(id) ? d[k].filter((x) => x !== id) : [...d[k], id],
    }));

  const canAdvance = useMemo(() => {
    switch (currentStepKey) {
      case "goal":
        return !!goal;
      case "who":
        return !!data.clientType;
      case "headcount":
        if (data.clientType === "Personal") return true;
        if (data.clientType === "Company") return /^\d+$/.test(data.employeeCount) && +data.employeeCount > 0;
        if (data.clientType === "Group") return /^\d+$/.test(data.memberCount) && +data.memberCount > 0;
        return false;
      case "services":
        return data.services.length > 0;
      case "timeline":
        return !!data.timeline;
      case "skill":
        return !!data.skillLevel;
      case "programs":
        return data.programs.length > 0;
      case "format":
        return !!data.format;
      case "connect":
        return !!data.connect;
      case "topics":
        return data.topics.length > 0;
      case "contact":
        return (
          data.firstName.trim() &&
          data.lastName.trim() &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
          data.phone.replace(/\D/g, "").length === 10
        );
      case "exploring-contact":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
      case "review":
        return true;
      default:
        return false;
    }
  }, [currentStepKey, goal, data]);

  const next = () => {
    if (currentStepKey === "goal") {
      setStepIndex(0);
      return;
    }
    if (stepIndex < flow.length - 1) {
      if (flow[stepIndex] === "who" && data.clientType === "Personal" && flow[stepIndex + 1] === "headcount") {
        setStepIndex(stepIndex + 2);
        return;
      }
      setStepIndex(stepIndex + 1);
    }
  };

  const back = () => {
    if (currentStepKey === "goal") return;
    if (stepIndex === 0) {
      setGoal(null);
      return;
    }
    if (flow[stepIndex - 1] === "headcount" && data.clientType === "Personal") {
      setStepIndex(stepIndex - 2);
      return;
    }
    setStepIndex(stepIndex - 1);
  };

  const handleSubmit = async () => {
    if (!user || submitting) return;
    setSubmitting(true);
    setSubmitError("");
    const payload = {
      goal,
      timestamp: new Date().toISOString(),
      ...(goal === "services" && {
        clientType: data.clientType,
        ...(data.clientType === "Company" && { employeeCount: +data.employeeCount }),
        ...(data.clientType === "Group" && { memberCount: +data.memberCount }),
        services: data.services,
        timeline: data.timeline,
        connect: data.connect,
      }),
      ...(goal === "training" && {
        skillLevel: data.skillLevel,
        programs: data.programs,
        format: data.format,
        connect: data.connect,
      }),
      ...(goal === "exploring" && {
        topics: data.topics,
      }),
      contact: {
        ...(goal !== "exploring" && {
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          phone: data.phone,
        }),
        email: data.email.toLowerCase().trim(),
        ...(data.notes.trim() && { notes: data.notes.trim() }),
      },
    };

    console.log("[GetStarted] submission payload:", payload);

    try {
      const submissionsRef = ref(database, `users/${user.uid}/submissions`);
      const newSubmissionRef = push(submissionsRef);
      await set(newSubmissionRef, { id: newSubmissionRef.key, ...payload });

      await set(ref(database, `users/${user.uid}/profile`), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName ?? null,
        photoURL: user.photoURL ?? null,
        provider: user.providerData?.[0]?.providerId ?? "password",
        lastSubmissionAt: serverTimestamp(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("[GetStarted] save failed:", err);
      setSubmitError("Couldn't save your submission. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const progressCurrent = goal ? stepIndex + 1 : 0;

  if (authLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <Header />
        <section className="py-12 sm:py-20">
          <div className="max-w-md mx-auto px-4 sm:px-6">
            <SignInGate />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Header />

      <section className="py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {!submitted && (
            <>
              <div className="text-center mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-5xl font-bold text-gray-900 mb-3"
                >
                  Let's get you{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    started
                  </span>
                </motion.h1>
                <p className="text-gray-600">A minute of clicking. We'll handle the rest.</p>
              </div>

              <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Step {progressCurrent + (goal ? 0 : 1)} of {totalSteps}
                </span>
                <div className="flex-1">
                  <ProgressBar current={progressCurrent} total={totalSteps} />
                </div>
              </div>

              <StepCard stepKey={currentStepKey}>
                {currentStepKey === "goal" && (
                  <GoalStep
                    goal={goal}
                    onPick={(g) => {
                      setGoal(g);
                      setStepIndex(0);
                    }}
                  />
                )}

                {currentStepKey === "who" && (
                  <WhoStep value={data.clientType} onChange={(v) => setField("clientType", v)} />
                )}

                {currentStepKey === "headcount" && (
                  <HeadcountStep data={data} setField={setField} />
                )}

                {currentStepKey === "services" && (
                  <SelectGridStep
                    title="Which services do you need?"
                    subtitle="Pick everything that applies. You can change your mind later."
                    options={SERVICE_OPTIONS}
                    selected={data.services}
                    onToggle={(id) => toggleArr("services", id)}
                  />
                )}

                {currentStepKey === "timeline" && (
                  <TimelineStep value={data.timeline} onChange={(v) => setField("timeline", v)} />
                )}

                {currentStepKey === "skill" && (
                  <SkillStep value={data.skillLevel} onChange={(v) => setField("skillLevel", v)} />
                )}

                {currentStepKey === "programs" && (
                  <SelectGridStep
                    title="Which programs interest you?"
                    subtitle="Pick everything you'd like to learn."
                    options={TRAINING_OPTIONS}
                    selected={data.programs}
                    onToggle={(id) => toggleArr("programs", id)}
                  />
                )}

                {currentStepKey === "format" && (
                  <FormatStep value={data.format} onChange={(v) => setField("format", v)} />
                )}

                {currentStepKey === "connect" && (
                  <ConnectStep value={data.connect} onChange={(v) => setField("connect", v)} />
                )}

                {currentStepKey === "topics" && (
                  <TopicsStep
                    selected={data.topics}
                    onToggle={(t) =>
                      setData((d) => ({
                        ...d,
                        topics: d.topics.includes(t) ? d.topics.filter((x) => x !== t) : [...d.topics, t],
                      }))
                    }
                  />
                )}

                {currentStepKey === "contact" && (
                  <ContactStep data={data} setField={setField} />
                )}

                {currentStepKey === "exploring-contact" && (
                  <ExploringContactStep data={data} setField={setField} />
                )}

                {currentStepKey === "review" && <ReviewStep goal={goal} data={data} />}
              </StepCard>

              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={back}
                  disabled={!goal || (currentStepKey === "goal")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-gray-600 hover:bg-white hover:text-gray-900 disabled:opacity-0 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                {currentStepKey === "review" ? (
                  <div className="flex flex-col items-end gap-2">
                    {submitError && (
                      <p className="text-sm text-red-600">{submitError}</p>
                    )}
                    <motion.button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting}
                      whileHover={submitting ? {} : { scale: 1.03 }}
                      whileTap={submitting ? {} : { scale: 0.97 }}
                      className={`px-8 py-3 rounded-lg text-white font-semibold shadow-lg transition-shadow ${
                        submitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:shadow-xl"
                      }`}
                    >
                      {submitting ? "Saving..." : "Submit"}
                    </motion.button>
                  </div>
                ) : (
                  goal && (
                    <motion.button
                      type="button"
                      onClick={next}
                      disabled={!canAdvance}
                      whileHover={canAdvance ? { scale: 1.03 } : {}}
                      whileTap={canAdvance ? { scale: 0.97 } : {}}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                        canAdvance
                          ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Continue
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  )
                )}
              </div>
            </>
          )}

          {submitted && <DoneCard goal={goal} />}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function GoalStep({ goal, onPick }) {
  const options = [
    {
      id: "services",
      icon: "briefcase",
      title: "I need accounting help",
      description: "Bookkeeping, reports, payroll, and audits. We run the books so you can run the business.",
    },
    {
      id: "training",
      icon: "academicCap",
      title: "I want to learn",
      description: "QuickBooks, bookkeeping, Excel, and tax basics. Train with certified pros.",
    },
    {
      id: "exploring",
      icon: "question",
      title: "Just exploring",
      description: "Not sure what you need yet? Pick a topic and we'll help you figure it out.",
    },
  ];
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What brings you here?</h2>
      <p className="text-gray-600 mb-6">Pick the one that fits. We'll tailor the next steps.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {options.map((o) => (
          <OptionCard
            key={o.id}
            selected={goal === o.id}
            onClick={() => onPick(o.id)}
            icon={o.icon}
            title={o.title}
            description={o.description}
          />
        ))}
      </div>
    </div>
  );
}

function WhoStep({ value, onChange }) {
  const opts = [
    { id: "Personal", icon: "user", description: "Just for me. Personal finances and books." },
    { id: "Company", icon: "building", description: "I run a business with employees and operations." },
    { id: "Group", icon: "users", description: "Non-profit, association, or organizational group." },
  ];
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Tell us about you</h2>
      <p className="text-gray-600 mb-6">Who are we helping?</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {opts.map((o) => (
          <OptionCard
            key={o.id}
            selected={value === o.id}
            onClick={() => onChange(o.id)}
            icon={o.icon}
            title={o.id}
            description={o.description}
          />
        ))}
      </div>
    </div>
  );
}

function HeadcountStep({ data, setField }) {
  const isCompany = data.clientType === "Company";
  const label = isCompany ? "How many employees?" : "How many members?";
  const placeholder = isCompany ? "e.g., 25" : "e.g., 50";
  const field = isCompany ? "employeeCount" : "memberCount";
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{label}</h2>
      <p className="text-gray-600 mb-6">Helps us match you with the right plan.</p>
      <input
        type="number"
        min="1"
        value={data[field]}
        onChange={(e) => setField(field, e.target.value)}
        placeholder={placeholder}
        className="w-full px-5 py-4 text-lg bg-white text-gray-900 placeholder:text-gray-400 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>
  );
}

function SelectGridStep({ title, subtitle, options, selected, onToggle }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">
        {subtitle}{" "}
        {selected.length > 0 && (
          <span className="text-orange-600 font-semibold">
            ({selected.length} selected)
          </span>
        )}
      </p>
      <ChipGrid options={options} selected={selected} onToggle={onToggle} />
    </div>
  );
}

function TimelineStep({ value, onChange }) {
  const opts = [
    { id: "asap", icon: "lightning", title: "ASAP", description: "Ready to start within a week." },
    { id: "month", icon: "calendar", title: "Within a month", description: "Planning ahead. Not urgent." },
    { id: "exploring", icon: "compass", title: "Just exploring", description: "Researching options for later." },
  ];
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">When do you want to start?</h2>
      <p className="text-gray-600 mb-6">No pressure. This just sets expectations.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {opts.map((o) => (
          <OptionCard
            key={o.id}
            selected={value === o.id}
            onClick={() => onChange(o.id)}
            icon={o.icon}
            title={o.title}
            description={o.description}
          />
        ))}
      </div>
    </div>
  );
}

function SkillStep({ value, onChange }) {
  const opts = [
    { id: "beginner", icon: "sprout", title: "Beginner", description: "Brand new to accounting or the software." },
    { id: "some", icon: "starOutline", title: "Some experience", description: "I know the basics. Want to go deeper." },
    { id: "advanced", icon: "starFilled", title: "Advanced", description: "I want sharp, specialized skills." },
  ];
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What's your current level?</h2>
      <p className="text-gray-600 mb-6">So we don't start too easy or too hard.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {opts.map((o) => (
          <OptionCard
            key={o.id}
            selected={value === o.id}
            onClick={() => onChange(o.id)}
            icon={o.icon}
            title={o.title}
            description={o.description}
          />
        ))}
      </div>
    </div>
  );
}

function ConnectStep({ value, onChange }) {
  const opts = [
    { id: "consultation", icon: "phone", title: "Free Consultation", description: "Book a no-cost 30-minute call with a Balance Keepers pro." },
    { id: "email", icon: "envelope", title: "Email Follow-up", description: "Get details and next steps sent to your inbox." },
    { id: "chat", icon: "chat", title: "Quick Chat", description: "A short text exchange. No calendar dance." },
  ];
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">How do you want to connect?</h2>
      <p className="text-gray-600 mb-6">Pick the follow-up that fits your style.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {opts.map((o) => (
          <OptionCard
            key={o.id}
            selected={value === o.id}
            onClick={() => onChange(o.id)}
            icon={o.icon}
            title={o.title}
            description={o.description}
          />
        ))}
      </div>
    </div>
  );
}

function FormatStep({ value, onChange }) {
  const opts = [
    { id: "online", icon: "monitor", title: "Online", description: "Live remote sessions. Work from anywhere." },
    { id: "onsite", icon: "pin", title: "On-site", description: "Train at your location. Focused and direct." },
    { id: "either", icon: "sparkles", title: "Either works", description: "Show me what's available." },
  ];
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">How do you want to learn?</h2>
      <p className="text-gray-600 mb-6">Pick the format that fits your schedule.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {opts.map((o) => (
          <OptionCard
            key={o.id}
            selected={value === o.id}
            onClick={() => onChange(o.id)}
            icon={o.icon}
            title={o.title}
            description={o.description}
          />
        ))}
      </div>
    </div>
  );
}

function TopicsStep({ selected, onToggle }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What are you curious about?</h2>
      <p className="text-gray-600 mb-6">
        Pick any that resonate.{" "}
        {selected.length > 0 && (
          <span className="text-orange-600 font-semibold">({selected.length} selected)</span>
        )}
      </p>
      <div className="flex flex-wrap gap-2">
        {EXPLORE_TOPICS.map((t) => {
          const isOn = selected.includes(t);
          return (
            <motion.button
              type="button"
              key={t}
              onClick={() => onToggle(t)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all ${
                isOn
                  ? "bg-gradient-to-r from-orange-500 to-yellow-500 border-orange-500 text-white shadow-md"
                  : "bg-white border-gray-200 text-gray-700 hover:border-orange-300"
              }`}
            >
              {t}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function ContactStep({ data, setField }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">How can we reach you?</h2>
      <p className="text-gray-600 mb-6">We'll follow up within one business day.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="First name" value={data.firstName} onChange={(v) => setField("firstName", v)} placeholder="Jane" />
        <Input label="Last name" value={data.lastName} onChange={(v) => setField("lastName", v)} placeholder="Doe" />
        <Input label="Email" type="email" value={data.email} onChange={(v) => setField("email", v)} placeholder="jane@example.com" className="sm:col-span-2" />
        <Input
          label="Phone"
          type="tel"
          value={data.phone}
          onChange={(v) => setField("phone", formatPhone(v))}
          placeholder="(555) 123-4567"
          className="sm:col-span-2"
        />
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Anything we should know? <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            rows={3}
            value={data.notes}
            onChange={(e) => setField("notes", e.target.value)}
            placeholder="A quick note about your situation..."
            className="w-full px-4 py-3 bg-white text-gray-900 placeholder:text-gray-400 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}

function ExploringContactStep({ data, setField }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Where should we send insights?</h2>
      <p className="text-gray-600 mb-6">Just your email. We'll point you at the right resources.</p>
      <Input label="Email" type="email" value={data.email} onChange={(v) => setField("email", v)} placeholder="you@example.com" />
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Anything specific you'd like answered? <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={data.notes}
          onChange={(e) => setField("notes", e.target.value)}
          placeholder="A question or thought..."
          className="w-full px-4 py-3 bg-white text-gray-900 placeholder:text-gray-400 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
        />
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text", className = "" }) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white text-gray-900 placeholder:text-gray-400 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>
  );
}

function ReviewStep({ goal, data }) {
  const Row = ({ label, value }) =>
    value ? (
      <div className="flex justify-between gap-4 py-2 border-b border-orange-50 last:border-0">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-sm font-semibold text-gray-900 text-right">{value}</span>
      </div>
    ) : null;

  const serviceNames = data.services.map((id) => SERVICE_OPTIONS.find((s) => s.id === id)?.title).filter(Boolean);
  const programNames = data.programs.map((id) => TRAINING_OPTIONS.find((s) => s.id === id)?.title).filter(Boolean);
  const connectLabel = {
    consultation: "Free Consultation",
    email: "Email Follow-up",
    chat: "Quick Chat",
  }[data.connect];

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Look good?</h2>
      <p className="text-gray-600 mb-6">Review and submit. We'll take it from here.</p>
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-5 border border-orange-100">
        <Row label="Goal" value={goal === "services" ? "Accounting services" : goal === "training" ? "Training" : "Exploring"} />
        {goal === "services" && (
          <>
            <Row label="Client type" value={data.clientType} />
            {data.clientType === "Company" && <Row label="Employees" value={data.employeeCount} />}
            {data.clientType === "Group" && <Row label="Members" value={data.memberCount} />}
            <Row label="Services" value={serviceNames.join(", ")} />
            <Row label="Timeline" value={data.timeline === "asap" ? "ASAP" : data.timeline === "month" ? "Within a month" : "Just exploring"} />
          </>
        )}
        {goal === "training" && (
          <>
            <Row label="Skill level" value={data.skillLevel} />
            <Row label="Programs" value={programNames.join(", ")} />
            <Row label="Format" value={data.format} />
          </>
        )}
        {goal === "exploring" && <Row label="Topics" value={data.topics.join(", ")} />}
        {goal !== "exploring" && <Row label="Follow-up" value={connectLabel} />}
        {goal !== "exploring" && (
          <Row label="Name" value={`${data.firstName} ${data.lastName}`.trim()} />
        )}
        <Row label="Email" value={data.email.toLowerCase()} />
        {goal !== "exploring" && <Row label="Phone" value={data.phone} />}
        {data.notes.trim() && <Row label="Notes" value={data.notes.trim()} />}
      </div>
    </div>
  );
}

function DoneCard({ goal }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-xl p-10 text-center border border-orange-100"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center"
      >
        <Icon name="check" className="w-10 h-10 text-white" />
      </motion.div>
      <h2 className="text-3xl font-bold text-gray-900 mb-3">You're in!</h2>
      <p className="text-gray-600 mb-8">
        {goal === "exploring"
          ? "We'll send a few helpful resources your way shortly."
          : "We'll reach out within one business day to map out the next step."}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/dashboard"
          className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          Go to dashboard
        </Link>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg border-2 border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </motion.div>
  );
}

function SignInGate() {
  const [mode, setMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const isSignup = mode === "signup";

  const handleEmail = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err) {
      setError(prettyAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      setError(prettyAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100"
    >
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
          <Icon name="user" className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="text-gray-600 text-sm">
          {isSignup
            ? "Sign up to save your progress and submission."
            : "Sign in to pick up where you left off."}
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={busy}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors mb-4"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-white text-gray-500 uppercase tracking-wide">or</span>
        </div>
      </div>

      <form onSubmit={handleEmail} className="space-y-3">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder={isSignup ? "Choose a password (6+ chars)" : "Your password"}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy || !email.trim() || password.length < 6}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-shadow"
        >
          {busy ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-5">
        {isSignup ? "Already have an account?" : "New here?"}{" "}
        <button
          type="button"
          onClick={() => {
            setMode(isSignup ? "signin" : "signup");
            setError("");
          }}
          className="text-orange-600 font-semibold hover:text-orange-700"
        >
          {isSignup ? "Sign in" : "Create one"}
        </button>
      </p>
    </motion.div>
  );
}

function prettyAuthError(err) {
  const code = err?.code || "";
  const map = {
    "auth/email-already-in-use": "That email already has an account. Try signing in.",
    "auth/invalid-email": "That email doesn't look right.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/user-not-found": "No account found for that email.",
    "auth/wrong-password": "Email or password is incorrect.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return map[code] || err?.message || "Something went wrong. Please try again.";
}
