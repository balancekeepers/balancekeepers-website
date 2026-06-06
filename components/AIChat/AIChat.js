"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const WELCOME = "Hi! I'm Balance, your guide to The Balance Keepers. Ask me about our accounting services, training programs, or how to get started.";

const SUGGESTIONS = [
  "What services do you offer?",
  "How do I get started?",
  "Tell me about your training programs",
];

function renderWithLinks(text) {
  const parts = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    const [, label, href] = match;
    const isInternal = href.startsWith("/");
    if (isInternal) {
      parts.push(
        <Link key={key++} href={href} className="text-orange-600 underline hover:text-orange-700 font-medium">
          {label}
        </Link>
      );
    } else {
      parts.push(
        <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="text-orange-600 underline hover:text-orange-700 font-medium">
          {label}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }
  return parts;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: WELCOME }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || sending) return;

    const next = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setSending(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error("Request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: assistantText };
          return copy;
        });
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content: "Sorry, something went wrong. Please try again or [contact us](/contact).",
          };
          return copy;
        });
      }
    } finally {
      setSending(false);
      abortRef.current = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send();
  };

  const showSuggestions = messages.length === 1;

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-xl flex items-center justify-center hover:shadow-2xl"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.svg
              key="close"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.84 8.84 0 01-3.082-.55L3 17l1.262-3.155A6.94 6.94 0 014 10c0-3.866 3.582-7 8-7s8 3.134 8 7H18zm-10-1a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-md h-[32rem] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-orange-100 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-3 text-white flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.84 8.84 0 01-3.082-.55L3 17l1.262-3.155A6.94 6.94 0 014 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold leading-tight">Balance</p>
                <p className="text-xs text-white/80 leading-tight">Balance Keepers Assistant</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-br from-orange-50/40 to-yellow-50/40">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-br-sm"
                        : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {m.content ? renderWithLinks(m.content) : (
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {showSuggestions && (
                <div className="pt-2 space-y-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full text-left text-sm px-3 py-2 rounded-lg bg-white border border-orange-200 text-gray-700 hover:bg-orange-50 hover:border-orange-400 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-gray-100 p-3 bg-white">
              <div className="flex items-end gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our services..."
                  disabled={sending}
                  className="flex-1 px-3.5 py-2.5 text-sm bg-white text-gray-900 placeholder:text-gray-400 border border-gray-200 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.926A.75.75 0 004.42 8.6l5.018.628a.25.25 0 010 .496l-5.018.628a.75.75 0 00-.727.435l-1.414 4.926a.75.75 0 00.826.95 28.9 28.9 0 0014.293-8.348.75.75 0 000-1.064A28.9 28.9 0 003.105 2.289z" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
