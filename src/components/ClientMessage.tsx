"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

interface ClientMessageProps {
  projectId: string;
  onSendMessage: (message: string) => void;
}

export function ClientMessage({
  projectId,
  onSendMessage,
}: ClientMessageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Message Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#0C6E99] hover:bg-[#0a5a7a] text-white rounded-full shadow-lg flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Message Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="bg-[#2d2d2d] border border-[#3d3d3d] rounded-xl p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Message Your Designer
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#86837E] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask a question or share feedback..."
                className="w-full h-32 bg-[#3d3d3d] border border-[#4d4d4d] rounded-lg p-3 text-white placeholder-[#86837E] focus:outline-none focus:border-[#0C6E99] resize-none"
              />

              <div className="flex items-center justify-between">
                <p className="text-xs text-[#86837E]">
                  Your message will be sent to the design team
                </p>
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0C6E99] hover:bg-[#0a5a7a] disabled:bg-[#6b7280] disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
