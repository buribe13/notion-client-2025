"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Sparkles,
  Inbox,
  Calendar,
  Apple,
  FileText,
  Settings,
  ShoppingBag,
  Trash2,
  Search,
  Edit,
  ChevronDown,
  Plus,
  User,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [isInviteOpen, setIsInviteOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={cn(
          "notion-sidebar w-64 h-screen flex flex-col text-white transition-transform duration-300",
          "lg:translate-x-0 lg:static lg:z-auto",
          isMobileOpen
            ? "translate-x-0 z-50 fixed"
            : "-translate-x-full z-50 fixed lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">benjamin's Notion</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <Edit className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-1">
          {/* Core Navigation */}
          <div className="space-y-1 mb-6">
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
              <Home className="w-4 h-4" />
              <span className="text-sm">Home</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Notion AI</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
              <Inbox className="w-4 h-4" />
              <span className="text-sm">Inbox</span>
            </div>
          </div>

          {/* Favorites */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
              Favorites
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">WKLY AGENDA</span>
                <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full ml-auto">
                  17
                </span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">dashboard / breadcrumb...</span>
              </div>
            </div>
          </div>

          {/* Workspace */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
              Workspace
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">dashboard / breadcrumb...</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                <Apple className="w-4 h-4" />
                <span className="text-sm">My Dashboard</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                <FileText className="w-4 h-4" />
                <span className="text-sm">UX project planner/tracker</span>
              </div>
            </div>
          </div>

          {/* Shared */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
              Shared
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                <Apple className="w-4 h-4" />
                <span className="text-sm">My Dashboard</span>
              </div>
            </div>
          </div>

          {/* Private */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
              Private
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                <FileText className="w-4 h-4" />
                <span className="text-sm">New page</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                <FileText className="w-4 h-4" />
                <span className="text-sm">MAX New Site Thoughts</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                <Plus className="w-4 h-4" />
                <span className="text-sm">+ Add new</span>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm">Marketplace</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Trash</span>
            </div>
          </div>
        </div>

        {/* Invite Members Popup */}
        <AnimatePresence>
          {isInviteOpen && (
            <motion.div
              className="absolute bottom-20 left-4 right-4 bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Invite members
                  </h3>
                  <p className="text-xs text-gray-400">
                    Collaborate with your team.
                  </p>
                </div>
                <button
                  onClick={() => setIsInviteOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom User Section */}
        <div className="p-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Benjamin Uribe</div>
            <div className="text-xs text-gray-400">Free plan</div>
          </div>
          <Send className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>
    </>
  );
}
