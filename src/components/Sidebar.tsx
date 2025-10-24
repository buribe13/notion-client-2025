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
        style={{ backgroundColor: "#2C2C2B" }}
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
              <span className="font-semibold" style={{ color: "#e5e5e5" }}>
                benjamin's Notion
              </span>
              <ChevronDown className="w-4 h-4" style={{ color: "#86837E" }} />
            </div>
            <Edit
              className="w-4 h-4 hover:opacity-80 cursor-pointer"
              style={{ color: "#86837E" }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          {/* Core Navigation Section */}
          <div className="mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
                <Search className="w-4 h-4" style={{ color: "#86837E" }} />
                <span className="text-sm" style={{ color: "#86837E" }}>
                  Search
                </span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
                <Home className="w-4 h-4" style={{ color: "#86837E" }} />
                <span className="text-sm" style={{ color: "#86837E" }}>
                  Home
                </span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
                <Sparkles className="w-4 h-4" style={{ color: "#86837E" }} />
                <span className="text-sm" style={{ color: "#86837E" }}>
                  Notion AI
                </span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
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
            <div className="mb-3">
              <button
                onClick={() => toggleSection("favorites")}
                className="flex items-center gap-2 w-full font-normal text-xs uppercase tracking-wider mb-2 px-3 py-1 hover:opacity-80"
                style={{ color: "#86837E", fontSize: "9pt" }}
              >
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform",
                    collapsedSections.favorites && "rotate-[-90deg]"
                  )}
                  style={{ color: "#86837E" }}
                />
                Favorites
              </button>
              {!collapsedSections.favorites && (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
                    <Calendar
                      className="w-4 h-4"
                      style={{ color: "#86837E" }}
                    />
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
                  <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
                    <Sparkles
                      className="w-4 h-4"
                      style={{ color: "#86837E" }}
                    />
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      dashboard / breadcrumb...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Workspace */}
            <div className="mb-3">
              <button
                onClick={() => toggleSection("workspace")}
                className="flex items-center gap-2 w-full font-normal text-xs uppercase tracking-wider mb-2 px-3 py-1 hover:opacity-80"
                style={{ color: "#86837E", fontSize: "9pt" }}
              >
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform",
                    collapsedSections.workspace && "rotate-[-90deg]"
                  )}
                  style={{ color: "#86837E" }}
                />
                Workspace
              </button>
              {!collapsedSections.workspace && (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
                    <Sparkles
                      className="w-4 h-4"
                      style={{ color: "#86837E" }}
                    />
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      dashboard / breadcrumb...
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
                    <Apple className="w-4 h-4" style={{ color: "#86837E" }} />
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      My Dashboard
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
                    <FileText
                      className="w-4 h-4"
                      style={{ color: "#86837E" }}
                    />
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      UX project planner/tracker
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Shared */}
            <div className="mb-3">
              <button
                onClick={() => toggleSection("shared")}
                className="flex items-center gap-2 w-full font-normal text-xs uppercase tracking-wider mb-2 px-3 py-1 hover:opacity-80"
                style={{ color: "#86837E", fontSize: "9pt" }}
              >
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform",
                    collapsedSections.shared && "rotate-[-90deg]"
                  )}
                  style={{ color: "#86837E" }}
                />
                Shared
              </button>
              {!collapsedSections.shared && (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
                    <Apple className="w-4 h-4" style={{ color: "#86837E" }} />
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      My Dashboard
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Private */}
            <div className="mb-3">
              <button
                onClick={() => toggleSection("private")}
                className="flex items-center gap-2 w-full font-normal text-xs uppercase tracking-wider mb-2 px-3 py-1 hover:opacity-80"
                style={{ color: "#86837E", fontSize: "9pt" }}
              >
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform",
                    collapsedSections.private && "rotate-[-90deg]"
                  )}
                  style={{ color: "#86837E" }}
                />
                Private
              </button>
              {!collapsedSections.private && (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
                    <FileText
                      className="w-4 h-4"
                      style={{ color: "#86837E" }}
                    />
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      New page
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
                    <FileText
                      className="w-4 h-4"
                      style={{ color: "#86837E" }}
                    />
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      MAX New Site Thoughts
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
                    <Plus className="w-4 h-4" style={{ color: "#86837E" }} />
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      + Add new
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Navigation Section */}
          <div className="mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
                <Settings className="w-4 h-4" style={{ color: "#86837E" }} />
                <span className="text-sm" style={{ color: "#86837E" }}>
                  Settings
                </span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
                <ShoppingBag className="w-4 h-4" style={{ color: "#86837E" }} />
                <span className="text-sm" style={{ color: "#86837E" }}>
                  Marketplace
                </span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:opacity-80 cursor-pointer">
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
        <div className="p-4 flex items-center gap-3">
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
            className="w-4 h-4 hover:opacity-80 cursor-pointer"
            style={{ color: "#86837E" }}
          />
        </div>
      </div>
    </>
  );
}
