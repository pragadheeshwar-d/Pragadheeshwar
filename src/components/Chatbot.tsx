"use client";

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] h-[500px] flex flex-col bg-white/10 dark:bg-zinc-950/80 backdrop-blur-xl border border-white/20 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-accent-1/20 to-accent-2/20 border-b border-white/10 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                    style={{ background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))" }}
                  >
                    PD
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Astra</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Ask me anything about my portfolio</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl"
                      style={{ background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))" }}
                    >
                      PD
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Hi! I&apos;m Pragadheesh&apos;s virtual assistant.<br />
                      What would you like to know about him?
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex w-full gap-2",
                        message.role === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.role === 'assistant' && (
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow"
                          style={{ background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))" }}
                        >
                          PD
                        </div>
                      )}
                      <div
                        className={cn(
                          "px-4 py-2 rounded-2xl max-w-[80%] text-sm",
                          message.role === 'user'
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 rounded-bl-none border border-zinc-200 dark:border-zinc-700/50"
                        )}
                      >
                        {/* We are doing a simple text render here. For markdown, we'd need react-markdown. */}
                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex w-full gap-2 justify-start">
                     <div
                     className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow"
                     style={{ background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))" }}
                   >
                     PD
                   </div>
                     <div className="px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 rounded-bl-none flex items-center justify-center">
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                     </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="p-3 bg-white/5 dark:bg-zinc-900/50 border-t border-white/10 dark:border-zinc-800 backdrop-blur-md"
              >
                <div className="relative flex items-center">
                  <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="w-full pl-4 pr-12 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-transparent dark:border-zinc-700/50 transition-all placeholder:text-zinc-500"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input?.trim()}
                    className="absolute right-2 p-1.5 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500/50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Branded trigger button */}
        <div className="flex flex-col items-end gap-2">
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg backdrop-blur-sm whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))" }}
            >
              Ask me anything ✨
            </motion.div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-14 h-14 rounded-full text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 overflow-visible"
            style={{ background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))" }}
            aria-label="Open Astra chat"
          >
            {/* Pulse ring */}
            {!isOpen && (
              <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: "var(--accent-1)" }} />
            )}
            {isOpen ? (
              <X className="w-6 h-6 relative z-10" />
            ) : (
              <span className="relative z-10 text-sm font-extrabold tracking-tight">PD</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
