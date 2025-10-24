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
  const [collapsedSections, setCollapsedSections] = useState({
    favorites: false,
    workspace: false,
    shared: false,
    private: false,
  });

  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 text-white rounded-md"
        style={{ backgroundColor: "#202020" }}
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
        <div className="p-1">
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: "#ff6b35" }}
            ></div>
            <span className="text-sm font-medium" style={{ color: "#86837E" }}>
              benjamin's Notion
            </span>
            <ChevronDown
              className="w-4 h-4 ml-auto"
              style={{ color: "#86837E" }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-2">
          {/* Core Navigation Section */}
          <div className="mb-6">
            <div className="space-y-0">
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                <Search className="w-4 h-4" style={{ color: "#86837E" }} />
                <span className="text-sm" style={{ color: "#86837E" }}>
                  Search
                </span>
              </div>
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                <Home className="w-4 h-4" style={{ color: "#86837E" }} />
                <span className="text-sm" style={{ color: "#86837E" }}>
                  Home
                </span>
              </div>
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                <Sparkles className="w-4 h-4" style={{ color: "#86837E" }} />
                <span className="text-sm" style={{ color: "#86837E" }}>
                  Notion AI
                </span>
              </div>
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                <Inbox className="w-4 h-4" style={{ color: "#86837E" }} />
                <span className="text-sm" style={{ color: "#86837E" }}>
                  Inbox
                </span>
              </div>
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="mb-6">
            {/* Favorites */}
            <div className="mb-0">
              <button
                onClick={() => toggleSection("favorites")}
                className="flex items-center gap-2 w-full font-normal text-xs tracking-wider mb-0 px-3 py-2 hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors rounded-md"
                style={{ color: "#86837E", fontSize: "9pt" }}
              >
                Favorites
              </button>
              {!collapsedSections.favorites && (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                    <span className="text-sm">📅</span>
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      WKLY AGENDA
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full ml-auto"
                      style={{ backgroundColor: "#3d3d3d", color: "#e5e5e5" }}
                    >
                      17
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                    <span className="text-sm">✨</span>
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      dashboard / breadcrumb...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Workspace */}
            <div className="mb-0">
              <button
                onClick={() => toggleSection("workspace")}
                className="flex items-center gap-2 w-full font-normal text-xs tracking-wider mb-0 px-3 py-2 hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors rounded-md"
                style={{ color: "#86837E", fontSize: "9pt" }}
              >
                Workspace
              </button>
              {!collapsedSections.workspace && (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                    <span className="text-sm">✨</span>
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      dashboard / breadcrumb...
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                    <span className="text-sm">🍎</span>
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      My Dashboard
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                    <span className="text-sm">📄</span>
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      UX project planner/tracker
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Shared */}
            <div className="mb-0">
              <button
                onClick={() => toggleSection("shared")}
                className="flex items-center gap-2 w-full font-normal text-xs tracking-wider mb-0 px-3 py-2 hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors rounded-md"
                style={{ color: "#86837E", fontSize: "9pt" }}
              >
                Shared
              </button>
              {!collapsedSections.shared && (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                    <span className="text-sm">🍎</span>
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      My Dashboard
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Private */}
            <div className="mb-0">
              <button
                onClick={() => toggleSection("private")}
                className="flex items-center gap-2 w-full font-normal text-xs tracking-wider mb-0 px-3 py-2 hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors rounded-md"
                style={{ color: "#86837E", fontSize: "9pt" }}
              >
                Private
              </button>
              {!collapsedSections.private && (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                    <span className="text-sm">📄</span>
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      New page
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                    <span className="text-sm">📄</span>
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      MAX New Site Thoughts
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                    <Plus className="w-4 h-4" style={{ color: "#86837E" }} />
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      Add new
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Navigation Section */}
          <div className="mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                <Settings className="w-4 h-4" style={{ color: "#86837E" }} />
                <span className="text-sm" style={{ color: "#86837E" }}>
                  Settings
                </span>
              </div>
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                <ShoppingBag className="w-4 h-4" style={{ color: "#86837E" }} />
                <span className="text-sm" style={{ color: "#86837E" }}>
                  Marketplace
                </span>
              </div>
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors">
                <Trash2 className="w-4 h-4" style={{ color: "#86837E" }} />
                <span className="text-sm" style={{ color: "#86837E" }}>
                  Trash
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Invite Members Popup */}
        <AnimatePresence>
          {isInviteOpen && (
            <motion.div
              className="absolute bottom-20 left-4 right-4 rounded-lg p-4 shadow-lg"
              style={{
                backgroundColor: "#3d3d3d",
                border: "1px solid #4d4d4d",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: "#e5e5e5" }}
                  >
                    Invite members
                  </h3>
                  <p className="text-xs" style={{ color: "#86837E" }}>
                    Collaborate with your team.
                  </p>
                </div>
                <button
                  onClick={() => setIsInviteOpen(false)}
                  className="hover:opacity-80"
                  style={{ color: "#86837E" }}
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom User Section */}
        <div className="p-2 flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#3d3d3d" }}
          >
            <User className="w-4 h-4" style={{ color: "#86837E" }} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium" style={{ color: "#e5e5e5" }}>
              Benjamin Uribe
            </div>
            <div className="text-xs" style={{ color: "#86837E" }}>
              Free plan
            </div>
          </div>
          <Send
            className="w-4 h-4 hover:bg-[#3d3d3d] hover:text-[#e5e5e5] cursor-pointer transition-colors"
            style={{ color: "#86837E" }}
          />
        </div>
      </div>
    </>
  );
}
