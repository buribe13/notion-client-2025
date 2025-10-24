"use client";

import { useState } from "react";

import { Sidebar } from "@/components/Sidebar";
import { ProjectModal } from "@/components/ProjectModal";
import { useDashboardStore } from "@/lib/store";
import { motion } from "framer-motion";
import {
  Share,
  Star,
  MoreHorizontal,
  Filter,
  ArrowUpDown,
  Search,
  Plus,
  ChevronDown,
  CheckSquare,
  BarChart3,
  List,
  Grid3X3,
  Rss,
  Calendar,
  Circle,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  const {
    getFilteredProjects,
    isModalOpen,
    selectedProject,
    setIsModalOpen,
    setSelectedProject,
  } = useDashboardStore();

  const [activeTab, setActiveTab] = useState("Project Board");

  const projects = getFilteredProjects();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(undefined);
  };

  const handleAddProject = () => {
    setSelectedProject(undefined);
    setIsModalOpen(true);
  };

  // Group projects by status
  const todoProjects = projects.filter((p) => p.status === "Not Started");
  const inProgressProjects = projects.filter((p) => p.status === "In Progress");
  const completeProjects = projects.filter((p) => p.status === "Completed");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Project Board":
        return (
          <div className="px-24 pb-8">
            <div className="flex gap-4 h-full">
              {/* To-do Column */}
              <div className="w-[300px] flex-shrink-0">
                <div
                  className="p-3"
                  style={{ backgroundColor: "#1F1F1F", borderRadius: "12px" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Circle className="w-4 h-4" style={{ color: "#86837E" }} />
                    <h3
                      className="text-sm font-medium"
                      style={{ color: "#86837E" }}
                    >
                      To-do
                    </h3>
                  </div>
                  <div className="space-y-1.5">
                    {todoProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        className="p-4 bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors cursor-pointer"
                        style={{ borderRadius: "12px" }}
                        whileHover={{ opacity: 0.8 }}
                        whileTap={{ opacity: 0.9 }}
                      >
                        <h4
                          className="text-sm font-medium mb-2"
                          style={{ color: "#e5e5e5" }}
                        >
                          {project.name}
                        </h4>
                        <div className="space-y-3">
                          <span
                            className={`px-2 py-1 text-xs ${
                              getClientTypeColor(project.clientType) ===
                              "#FBF3DA"
                                ? "text-black"
                                : "text-white"
                            }`}
                            style={{
                              backgroundColor: getClientTypeColor(
                                project.clientType
                              ),
                              borderRadius: "4px",
                            }}
                          >
                            {project.clientType}
                          </span>
                          <div className="text-xs" style={{ color: "#86837E" }}>
                            {new Date(project.deadline).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <button
                      className="text-sm hover:text-[#e5e5e5] transition-colors text-left"
                      style={{ color: "#86837E" }}
                    >
                      <span>+ New item</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* In Progress Column */}
              <div className="w-[300px] flex-shrink-0">
                <div
                  className="p-3"
                  style={{ backgroundColor: "#191F26", borderRadius: "12px" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4" style={{ color: "#3b82f6" }} />
                    <h3
                      className="text-sm font-medium"
                      style={{ color: "#3b82f6" }}
                    >
                      In progress
                    </h3>
                  </div>
                  <div className="space-y-1.5">
                    {inProgressProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        className="p-4 hover:bg-[#3d3d3d] transition-colors cursor-pointer"
                        style={{
                          backgroundColor: "#1E2A39",
                          borderRadius: "12px",
                        }}
                        whileHover={{ opacity: 0.8 }}
                        whileTap={{ opacity: 0.9 }}
                      >
                        <h4
                          className="text-sm font-medium mb-2"
                          style={{ color: "#e5e5e5" }}
                        >
                          {project.name}
                        </h4>
                        <div className="space-y-3">
                          <span
                            className={`px-2 py-1 text-xs ${
                              getClientTypeColor(project.clientType) ===
                              "#FBF3DA"
                                ? "text-black"
                                : "text-white"
                            }`}
                            style={{
                              backgroundColor: getClientTypeColor(
                                project.clientType
                              ),
                              borderRadius: "4px",
                            }}
                          >
                            {project.clientType}
                          </span>
                          <div className="text-xs" style={{ color: "#86837E" }}>
                            {new Date(project.deadline).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <button
                      className="text-sm hover:text-[#e5e5e5] transition-colors text-left"
                      style={{ color: "#3b82f6" }}
                    >
                      <span>+ New item</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Complete Column */}
              <div className="w-[300px] flex-shrink-0">
                <div
                  className="p-3"
                  style={{ backgroundColor: "#1A201C", borderRadius: "12px" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle
                      className="w-4 h-4"
                      style={{ color: "#10b981" }}
                    />
                    <h3
                      className="text-sm font-medium"
                      style={{ color: "#10b981" }}
                    >
                      Complete
                    </h3>
                  </div>
                  <div className="space-y-1.5">
                    {completeProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        className="p-4 hover:bg-[#3d3d3d] transition-colors cursor-pointer"
                        style={{
                          backgroundColor: "#212E26",
                          borderRadius: "12px",
                        }}
                        whileHover={{ opacity: 0.8 }}
                        whileTap={{ opacity: 0.9 }}
                      >
                        <h4
                          className="text-sm font-medium mb-2"
                          style={{ color: "#e5e5e5" }}
                        >
                          {project.name}
                        </h4>
                        <div className="space-y-3">
                          <span
                            className={`px-2 py-1 text-xs ${
                              getClientTypeColor(project.clientType) ===
                              "#FBF3DA"
                                ? "text-black"
                                : "text-white"
                            }`}
                            style={{
                              backgroundColor: getClientTypeColor(
                                project.clientType
                              ),
                              borderRadius: "4px",
                            }}
                          >
                            {project.clientType}
                          </span>
                          <div className="text-xs" style={{ color: "#86837E" }}>
                            {new Date(project.deadline).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <button
                      className="text-sm hover:text-[#e5e5e5] transition-colors text-left"
                      style={{ color: "#10b981" }}
                    >
                      <span>+ New item</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "All Projects":
        return (
          <div className="px-24 pb-8">
            <div className="overflow-hidden">
              {/* Table Header */}
              <div className="px-4 py-3 border-b border-[#3d3d3d]">
                <div
                  className="grid grid-cols-5 gap-4 text-sm font-medium"
                  style={{ color: "#86837E" }}
                >
                  <div className="flex items-center gap-2 cursor-pointer hover:text-[#e5e5e5] transition-colors border-r border-[#3d3d3d] pr-4">
                    <span>Project Name</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                  <div className="flex items-center gap-2 border-r border-[#3d3d3d] pr-4">
                    <span>Client</span>
                  </div>
                  <div className="flex items-center gap-2 border-r border-[#3d3d3d] pr-4">
                    <span>Status</span>
                  </div>
                  <div className="flex items-center gap-2 border-r border-[#3d3d3d] pr-4">
                    <span>Deadline</span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-[#e5e5e5] transition-colors">
                    <span>Priority</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-[#3d3d3d]">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="px-4 py-3 hover:bg-[#2d2d2d] transition-colors"
                  >
                    <div className="grid grid-cols-5 gap-4 items-center">
                      {/* Project Name */}
                      <div className="flex items-center gap-3 border-r border-[#3d3d3d] pr-4">
                        <CheckSquare
                          className="w-4 h-4"
                          style={{ color: "#86837E" }}
                        />
                        <span className="text-sm" style={{ color: "#e5e5e5" }}>
                          {project.name}
                        </span>
                      </div>

                      {/* Client */}
                      <div className="border-r border-[#3d3d3d] pr-4">
                        <span
                          className={`px-2 py-1 text-xs ${
                            getClientTypeColor(project.clientType) === "#FBF3DA"
                              ? "text-black"
                              : "text-white"
                          }`}
                          style={{
                            backgroundColor: getClientTypeColor(
                              project.clientType
                            ),
                            borderRadius: "4px",
                          }}
                        >
                          {project.clientType}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="border-r border-[#3d3d3d] pr-4">
                        <span
                          className={`px-2 py-1 text-xs w-fit`}
                          style={{
                            backgroundColor:
                              project.status === "Completed"
                                ? "#10b981"
                                : project.status === "In Progress"
                                ? "#3b82f6"
                                : project.status === "Review"
                                ? "#f59e0b"
                                : project.status === "On Hold"
                                ? "#ef4444"
                                : "#6b7280",
                            borderRadius: "4px",
                            color: "white",
                          }}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* Deadline */}
                      <div className="border-r border-[#3d3d3d] pr-4">
                        <span className="text-sm" style={{ color: "#86837E" }}>
                          {new Date(project.deadline).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>

                      {/* Priority */}
                      <div>
                        <span
                          className={`px-2 py-1 text-xs ${
                            project.priority === "High"
                              ? "text-white"
                              : project.priority === "Medium"
                              ? "text-white"
                              : project.priority === "Low"
                              ? "text-white"
                              : "text-white"
                          }`}
                          style={{
                            backgroundColor:
                              project.priority === "High"
                                ? "#ef4444"
                                : project.priority === "Medium"
                                ? "#f59e0b"
                                : project.priority === "Low"
                                ? "#10b981"
                                : "#8b5cf6",
                            borderRadius: "4px",
                          }}
                        >
                          {project.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Item */}
              <div className="px-4 py-3 border-t border-[#3d3d3d]">
                <button
                  className="text-sm hover:text-[#e5e5e5] transition-colors"
                  style={{ color: "#86837E" }}
                >
                  <span>+ New item</span>
                </button>
              </div>
            </div>
          </div>
        );
      case "Chart":
        return (
          <div className="px-24 pb-8">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "#e5e5e5" }}
            >
              Project Analytics
            </h2>
            <p className="text-sm" style={{ color: "#86837E" }}>
              Visualize your project progress, time tracking, and client
              analytics.
            </p>
          </div>
        );
      case "Client Progress View":
        return (
          <div className="px-24 pb-8">
            <div className="grid grid-cols-3 gap-4">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="p-4 bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors cursor-pointer"
                  style={{ borderRadius: "12px" }}
                  whileHover={{ opacity: 0.8 }}
                  whileTap={{ opacity: 0.9 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <CheckSquare
                      className="w-5 h-5"
                      style={{ color: "#e5e5e5" }}
                    />
                  </div>

                  <h3
                    className="text-sm font-medium mb-3"
                    style={{ color: "#e5e5e5" }}
                  >
                    {project.name}
                  </h3>

                  <div className="mb-3">
                    <span
                      className={`px-2 py-1 text-xs flex items-center gap-1 w-fit`}
                      style={{
                        backgroundColor:
                          project.status === "Completed"
                            ? "#10b981"
                            : project.status === "In Progress"
                            ? "#3b82f6"
                            : project.status === "Review"
                            ? "#f59e0b"
                            : project.status === "On Hold"
                            ? "#ef4444"
                            : "#6b7280",
                        borderRadius: "4px",
                        color: "white",
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: "white",
                        }}
                      />
                      {project.status}
                    </span>
                  </div>

                  <div className="text-xs mb-2" style={{ color: "#86837E" }}>
                    {Math.floor(Math.random() * 10000) + 1000}%
                  </div>

                  <div className="text-xs" style={{ color: "#86837E" }}>
                    {new Date(project.deadline).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </motion.div>
              ))}

              {/* Add New Item Card */}
              <motion.div
                className="p-4 bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors cursor-pointer border-2 border-dashed border-[#3d3d3d]"
                style={{ borderRadius: "12px" }}
                whileHover={{ opacity: 0.8 }}
                whileTap={{ opacity: 0.9 }}
              >
                <div className="flex flex-col items-center justify-center h-full min-h-[120px]">
                  <Plus className="w-6 h-6 mb-2" style={{ color: "#86837E" }} />
                  <span className="text-sm" style={{ color: "#86837E" }}>
                    New item
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        );
      case "Feed":
        return (
          <div className="px-24 pb-8 flex justify-center">
            <div className="w-[600px]">
              <div className="flex items-center justify-end mb-3">
                <button
                  className="p-2 hover:opacity-70 transition-opacity rounded"
                  onClick={() => {
                    /* Handle new post */
                  }}
                >
                  <Plus className="w-5 h-5" style={{ color: "#86837E" }} />
                </button>
              </div>

              {/* Feed Posts */}
              <div className="space-y-4">
                {/* Post 1 */}
                <motion.div
                  className="p-6 bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors"
                  style={{ borderRadius: "12px" }}
                  whileHover={{ opacity: 0.95 }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      BU
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#e5e5e5" }}
                        >
                          Benjamin Uribe
                        </span>
                        <span className="text-xs" style={{ color: "#86837E" }}>
                          • 5h ago
                        </span>
                        <span className="text-xs" style={{ color: "#86837E" }}>
                          • Marketing Collateral
                        </span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-[#4d4d4d] rounded transition-colors">
                      <MoreHorizontal
                        className="w-4 h-4"
                        style={{ color: "#86837E" }}
                      />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#e5e5e5" }}
                    >
                      Just finished the initial mockups for the new marketing
                      campaign. Looking for feedback on the color scheme and
                      overall direction. The client wants something that feels
                      modern but approachable.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <button
                      className="flex items-center gap-2 text-sm hover:text-[#e5e5e5] transition-colors"
                      style={{ color: "#86837E" }}
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>12 likes</span>
                    </button>
                    <button
                      className="flex items-center gap-2 text-sm hover:text-[#e5e5e5] transition-colors"
                      style={{ color: "#86837E" }}
                    >
                      <Share className="w-4 h-4" />
                      <span>3 shares</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div className="border-t border-[#3d3d3d] pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        SJ
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs font-medium"
                            style={{ color: "#e5e5e5" }}
                          >
                            Sarah Johnson
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "#86837E" }}
                          >
                            • 2h ago
                          </span>
                        </div>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "#e5e5e5" }}
                        >
                          Love the direction! The blue gradient works really
                          well. Maybe we could try a slightly warmer tone for
                          the CTA buttons?
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        MJ
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          className="w-full bg-transparent text-xs py-2 px-3 border border-[#3d3d3d] rounded-md focus:outline-none focus:border-[#4d4d4d] transition-colors"
                          style={{ color: "#e5e5e5" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Post 2 */}
                <motion.div
                  className="p-6 bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors"
                  style={{ borderRadius: "12px" }}
                  whileHover={{ opacity: 0.95 }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      AC
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#e5e5e5" }}
                        >
                          Alex Chen
                        </span>
                        <span className="text-xs" style={{ color: "#86837E" }}>
                          • 8h ago
                        </span>
                        <span className="text-xs" style={{ color: "#86837E" }}>
                          • App UI/UX Redesign
                        </span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-[#4d4d4d] rounded transition-colors">
                      <MoreHorizontal
                        className="w-4 h-4"
                        style={{ color: "#86837E" }}
                      />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#e5e5e5" }}
                    >
                      Need some input on the user flow for the onboarding
                      process. Should we go with a step-by-step wizard or a
                      single-page form? Each has its pros and cons.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <button
                      className="flex items-center gap-2 text-sm hover:text-[#e5e5e5] transition-colors"
                      style={{ color: "#86837E" }}
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>8 likes</span>
                    </button>
                    <button
                      className="flex items-center gap-2 text-sm hover:text-[#e5e5e5] transition-colors"
                      style={{ color: "#86837E" }}
                    >
                      <Share className="w-4 h-4" />
                      <span>1 share</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div className="border-t border-[#3d3d3d] pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        BU
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          className="w-full bg-transparent text-xs py-2 px-3 border border-[#3d3d3d] rounded-md focus:outline-none focus:border-[#4d4d4d] transition-colors"
                          style={{ color: "#e5e5e5" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Post 3 */}
                <motion.div
                  className="p-6 bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors"
                  style={{ borderRadius: "12px" }}
                  whileHover={{ opacity: 0.95 }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      MJ
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#e5e5e5" }}
                        >
                          Maria Rodriguez
                        </span>
                        <span className="text-xs" style={{ color: "#86837E" }}>
                          • 1d ago
                        </span>
                        <span className="text-xs" style={{ color: "#86837E" }}>
                          • Content Strategy
                        </span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-[#4d4d4d] rounded transition-colors">
                      <MoreHorizontal
                        className="w-4 h-4"
                        style={{ color: "#86837E" }}
                      />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#e5e5e5" }}
                    >
                      Content calendar is ready for Q1! We're focusing on
                      thought leadership pieces and case studies. Any
                      suggestions for topics that would resonate with our target
                      audience?
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <button
                      className="flex items-center gap-2 text-sm hover:text-[#e5e5e5] transition-colors"
                      style={{ color: "#86837E" }}
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>15 likes</span>
                    </button>
                    <button
                      className="flex items-center gap-2 text-sm hover:text-[#e5e5e5] transition-colors"
                      style={{ color: "#86837E" }}
                    >
                      <Share className="w-4 h-4" />
                      <span>5 shares</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div className="border-t border-[#3d3d3d] pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        BU
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs font-medium"
                            style={{ color: "#e5e5e5" }}
                          >
                            Benjamin Uribe
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "#86837E" }}
                          >
                            • 12h ago
                          </span>
                        </div>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "#e5e5e5" }}
                        >
                          How about a series on "Design Trends 2025"? That seems
                          to be getting a lot of engagement lately.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        AC
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          className="w-full bg-transparent text-xs py-2 px-3 border border-[#3d3d3d] rounded-md focus:outline-none focus:border-[#4d4d4d] transition-colors"
                          style={{ color: "#e5e5e5" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Post 4 */}
                <motion.div
                  className="p-6 bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors"
                  style={{ borderRadius: "12px" }}
                  whileHover={{ opacity: 0.95 }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      DK
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#e5e5e5" }}
                        >
                          David Kim
                        </span>
                        <span className="text-xs" style={{ color: "#86837E" }}>
                          • 2d ago
                        </span>
                        <span className="text-xs" style={{ color: "#86837E" }}>
                          • E-commerce Website
                        </span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-[#4d4d4d] rounded transition-colors">
                      <MoreHorizontal
                        className="w-4 h-4"
                        style={{ color: "#86837E" }}
                      />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#e5e5e5" }}
                    >
                      Performance optimization complete! Page load times
                      improved by 40%. The new caching strategy is working
                      really well.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <button
                      className="flex items-center gap-2 text-sm hover:text-[#e5e5e5] transition-colors"
                      style={{ color: "#86837E" }}
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>23 likes</span>
                    </button>
                    <button
                      className="flex items-center gap-2 text-sm hover:text-[#e5e5e5] transition-colors"
                      style={{ color: "#86837E" }}
                    >
                      <Share className="w-4 h-4" />
                      <span>7 shares</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div className="border-t border-[#3d3d3d] pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        MJ
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          className="w-full bg-transparent text-xs py-2 px-3 border border-[#3d3d3d] rounded-md focus:outline-none focus:border-[#4d4d4d] transition-colors"
                          style={{ color: "#e5e5e5" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Post 5 */}
                <motion.div
                  className="p-6 bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors"
                  style={{ borderRadius: "12px" }}
                  whileHover={{ opacity: 0.95 }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      LT
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#e5e5e5" }}
                        >
                          Lisa Thompson
                        </span>
                        <span className="text-xs" style={{ color: "#86837E" }}>
                          • 3d ago
                        </span>
                        <span className="text-xs" style={{ color: "#86837E" }}>
                          • Product Launch Campaign
                        </span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-[#4d4d4d] rounded transition-colors">
                      <MoreHorizontal
                        className="w-4 h-4"
                        style={{ color: "#86837E" }}
                      />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#e5e5e5" }}
                    >
                      Launch day is approaching! All assets are ready and the
                      team is excited. Let's make sure we're all aligned on the
                      rollout timeline.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <button
                      className="flex items-center gap-2 text-sm hover:text-[#e5e5e5] transition-colors"
                      style={{ color: "#86837E" }}
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>31 likes</span>
                    </button>
                    <button
                      className="flex items-center gap-2 text-sm hover:text-[#e5e5e5] transition-colors"
                      style={{ color: "#86837E" }}
                    >
                      <Share className="w-4 h-4" />
                      <span>12 shares</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div className="border-t border-[#3d3d3d] pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        BU
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          className="w-full bg-transparent text-xs py-2 px-3 border border-[#3d3d3d] rounded-md focus:outline-none focus:border-[#4d4d4d] transition-colors"
                          style={{ color: "#e5e5e5" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
      case "Timeline":
        return (
          <div className="px-24 pb-8">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "#e5e5e5" }}
            >
              Project Timeline
            </h2>
            <p className="text-sm" style={{ color: "#86837E" }}>
              View your projects in a chronological timeline view.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const getClientTypeColor = (clientType: string) => {
    switch (clientType) {
      case "Acme Corp":
        return "#E03D3E"; // Notion Red Regular
      case "TechStart":
        return "#DFAB00"; // Notion Yellow Regular
      case "Sarah Johnson":
        return "#FBF3DA"; // Notion Yellow Light
      case "Regular Client":
        return "#E03D3E"; // Notion Red Regular
      case "International":
        return "#DFAB00"; // Notion Yellow Regular
      case "New Client":
        return "#FBF3DA"; // Notion Yellow Light
      case "Individual":
        return "#E03D3E"; // Notion Red Regular
      case "Startup":
        return "#DFAB00"; // Notion Yellow Regular
      case "Enterprise":
        return "#FBF3DA"; // Notion Yellow Light
      case "Non-profit":
        return "#E03D3E"; // Notion Red Regular
      default:
        return "#878682"; // Notion Gray Regular
    }
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#181818" }}>
      <Sidebar />

      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Bar (Breadcrumb) */}
        <div className="px-3 py-1" style={{ backgroundColor: "#181818" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs lg:text-sm" style={{ color: "#86837E" }}>
                dashboard / breadcrumb ... /{" "}
              </span>
              <span className="text-xs lg:text-sm" style={{ color: "#e5e5e5" }}>
                Freelance Projects
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-[#3d3d3d] hover:text-[#e5e5e5] transition-colors">
                <Star className="w-4 h-4" style={{ color: "#86837E" }} />
              </button>
              <button className="p-2 hover:bg-[#3d3d3d] hover:text-[#e5e5e5] transition-colors">
                <MoreHorizontal
                  className="w-4 h-4"
                  style={{ color: "#86837E" }}
                />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-[#e5e5e5] hover:text-[#e5e5e5] transition-colors">
                <Share className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="px-24 pt-12 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <CheckSquare className="w-6 h-6" style={{ color: "#e5e5e5" }} />
            <h1 className="text-2xl font-semibold" style={{ color: "#e5e5e5" }}>
              Freelance Projects
            </h1>
          </div>

          {/* Sub-menu Tabs */}
          <div className="flex items-center gap-1 mb-2">
            <button
              className={`flex items-center gap-2 px-3 py-2 transition-colors ${
                activeTab === "Project Board"
                  ? "bg-[#3d3d3d] text-[#e5e5e5]"
                  : "bg-transparent text-[#86837E] hover:bg-[#3d3d3d] hover:text-[#e5e5e5]"
              }`}
              style={{ borderRadius: "50px" }}
              onClick={() => setActiveTab("Project Board")}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm">Project Board</span>
            </button>
            <button
              className={`flex items-center gap-2 px-3 py-2 transition-colors ${
                activeTab === "All Projects"
                  ? "bg-[#3d3d3d] text-[#e5e5e5]"
                  : "bg-transparent text-[#86837E] hover:bg-[#3d3d3d] hover:text-[#e5e5e5]"
              }`}
              style={{ borderRadius: "50px" }}
              onClick={() => setActiveTab("All Projects")}
            >
              <List className="w-4 h-4" />
              <span className="text-sm">All Projects</span>
            </button>
            <button
              className={`flex items-center gap-2 px-3 py-2 transition-colors ${
                activeTab === "Chart"
                  ? "bg-[#3d3d3d] text-[#e5e5e5]"
                  : "bg-transparent text-[#86837E] hover:bg-[#3d3d3d] hover:text-[#e5e5e5]"
              }`}
              style={{ borderRadius: "50px" }}
              onClick={() => setActiveTab("Chart")}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm">Chart</span>
            </button>
            <button
              className={`flex items-center gap-2 px-3 py-2 transition-colors ${
                activeTab === "Client Progress View"
                  ? "bg-[#3d3d3d] text-[#e5e5e5]"
                  : "bg-transparent text-[#86837E] hover:bg-[#3d3d3d] hover:text-[#e5e5e5]"
              }`}
              style={{ borderRadius: "50px" }}
              onClick={() => setActiveTab("Client Progress View")}
            >
              <Grid3X3 className="w-4 h-4" />
              <span className="text-sm">Client Progress View</span>
            </button>
            <button
              className={`flex items-center gap-2 px-3 py-2 transition-colors ${
                activeTab === "Feed"
                  ? "bg-[#3d3d3d] text-[#e5e5e5]"
                  : "bg-transparent text-[#86837E] hover:bg-[#3d3d3d] hover:text-[#e5e5e5]"
              }`}
              style={{ borderRadius: "50px" }}
              onClick={() => setActiveTab("Feed")}
            >
              <Rss className="w-4 h-4" />
              <span className="text-sm">Feed</span>
            </button>
            <button
              className={`flex items-center gap-2 px-3 py-2 transition-colors ${
                activeTab === "Timeline"
                  ? "bg-[#3d3d3d] text-[#e5e5e5]"
                  : "bg-transparent text-[#86837E] hover:bg-[#3d3d3d] hover:text-[#e5e5e5]"
              }`}
              style={{ borderRadius: "50px" }}
              onClick={() => setActiveTab("Timeline")}
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Timeline</span>
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <button className="p-2 hover:bg-[#3d3d3d] hover:text-[#e5e5e5] transition-colors">
                <Filter className="w-4 h-4" style={{ color: "#86837E" }} />
              </button>
              <button className="p-2 hover:bg-[#3d3d3d] hover:text-[#e5e5e5] transition-colors">
                <ArrowUpDown className="w-4 h-4" style={{ color: "#86837E" }} />
              </button>
              <button
                className="p-2 hover:bg-[#3d3d3d] hover:text-[#e5e5e5] transition-colors"
                style={{ borderRadius: "50px" }}
              >
                <Search className="w-4 h-4" style={{ color: "#86837E" }} />
              </button>
              <button
                className="flex items-center gap-2 px-3 py-2 bg-[#3d3d3d] text-[#e5e5e5] hover:bg-[#4d4d4d] transition-colors"
                style={{ borderRadius: "50px" }}
                onClick={handleAddProject}
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">New</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-x-auto">{renderTabContent()}</div>

        {/* Modal */}
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProject}
        />
      </div>
    </div>
  );
}
