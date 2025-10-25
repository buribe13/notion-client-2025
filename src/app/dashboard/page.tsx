"use client";

import { useState } from "react";

import { Sidebar } from "@/components/Sidebar";
import { ProjectModal } from "@/components/ProjectModal";
import { ClientMessage } from "@/components/ClientMessage";
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
  Eye,
  EyeOff,
  Download,
  MessageCircle,
  Bell,
  Users,
  DollarSign,
  AlertTriangle,
  CreditCard,
} from "lucide-react";

export default function Dashboard() {
  const {
    getFilteredProjects,
    isModalOpen,
    selectedProject,
    setIsModalOpen,
    setSelectedProject,
    clientViewMode,
    setClientViewMode,
    getClientVisibleUpdates,
    getNewClientUpdatesCount,
    markClientUpdatesAsViewed,
    getOverdueInvoices,
    getUpcomingInvoices,
    invoices,
  } = useDashboardStore();

  const [activeTab, setActiveTab] = useState("Project Board");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const projects = getFilteredProjects();

  // Apply client filtering in client view mode
  const filteredProjects =
    clientViewMode === "client" && selectedClient
      ? projects.filter((project) => project.clientType === selectedClient)
      : projects;

  // Apply client filtering to invoices
  const filteredInvoices = selectedClient
    ? invoices.filter((invoice) => invoice.clientType === selectedClient)
    : invoices;

  // Filtered invoice helper functions
  const getFilteredOverdueInvoices = () => {
    const today = new Date().toISOString().split("T")[0];
    return filteredInvoices.filter(
      (invoice) =>
        invoice.status === "Overdue" ||
        (invoice.status === "Sent" && invoice.dueDate < today)
    );
  };

  const getFilteredUpcomingInvoices = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return filteredInvoices.filter(
      (invoice) =>
        invoice.status === "Sent" &&
        new Date(invoice.dueDate) >= today &&
        new Date(invoice.dueDate) <= nextWeek
    );
  };

  // Get unique client types from invoices
  const availableClientTypes = Array.from(
    new Set(invoices.map((invoice) => invoice.clientType))
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(undefined);
  };

  const handleAddProject = () => {
    setSelectedProject(undefined);
    setIsModalOpen(true);
  };

  const handleSendMessage = (message: string) => {
    // In a real app, this would send the message to the backend
    console.log("Client message:", message);
    // For now, we'll just add it as a client update
    const newUpdate = {
      id: Date.now().toString(),
      projectId: "1", // Default project
      author: "Client",
      content: message,
      timestamp: new Date().toISOString(),
      isVisibleToClient: false, // This is from client, so not visible to client
      isNewForClient: false,
    };
    // You could add this to a separate client messages store
  };

  // Group projects by status
  const todoProjects = projects.filter((p) => p.status === "Not Started");
  const inProgressProjects = projects.filter((p) => p.status === "In Progress");
  const completeProjects = projects.filter((p) => p.status === "Completed");

  // Feed data and filtering
  const feedPosts = [
    {
      id: 1,
      author: "Benjamin Uribe",
      project: "Marketing Collateral",
      client: "Sarah Johnson",
      time: "5h ago",
      content:
        "Just finished the initial mockups for the new marketing campaign. Looking for feedback on the color scheme and overall direction. The client wants something that feels modern but approachable.",
    },
    {
      id: 2,
      author: "Alex Chen",
      project: "App UI/UX Redesign",
      client: "TechStart",
      time: "8h ago",
      content:
        "Need some input on the user flow for the onboarding process. Should we go with a step-by-step wizard or a single-page form? Each has its pros and cons.",
    },
    {
      id: 3,
      author: "Maria Rodriguez",
      project: "Content Strategy",
      client: "Acme Corp",
      time: "1d ago",
      content:
        "Content calendar is ready for Q1! We're focusing on thought leadership pieces and case studies. Any suggestions for topics that would resonate with our target audience?",
    },
    {
      id: 4,
      author: "David Kim",
      project: "E-commerce Website",
      client: "Sarah Johnson",
      time: "2d ago",
      content:
        "Performance optimization complete! Page load times improved by 40%. The new caching strategy is working really well.",
    },
    {
      id: 5,
      author: "Lisa Thompson",
      project: "Product Launch Campaign",
      client: "TechStart",
      time: "3d ago",
      content:
        "Launch day is approaching! All assets are ready and the team is excited. Let's make sure we're all aligned on the rollout timeline.",
    },
  ];

  // All team members and clients for filtering
  const allPeople = [
    "Benjamin Uribe",
    "Alex Chen",
    "Maria Rodriguez",
    "David Kim",
    "Lisa Thompson",
    "Sarah Johnson",
    "TechStart",
    "Acme Corp",
  ];

  const getPersonColor = (person: string) => {
    switch (person) {
      case "Benjamin Uribe":
        return "#0C6E99"; // Blue
      case "Alex Chen":
        return "#0E7B6C"; // Green
      case "Maria Rodriguez":
        return "#E03D3E"; // Red
      case "David Kim":
        return "#f59e0b"; // Amber
      case "Lisa Thompson":
        return "#8b5cf6"; // Purple
      case "Sarah Johnson":
        return "#10b981"; // Emerald
      case "TechStart":
        return "#06b6d4"; // Cyan
      case "Acme Corp":
        return "#f97316"; // Orange
      default:
        return "#6b7280"; // Gray
    }
  };

  const clients = Array.from(new Set(feedPosts.map((post) => post.client)));
  const filteredFeedPosts = selectedClient
    ? feedPosts.filter(
        (post) =>
          post.client === selectedClient || post.author === selectedClient
      )
    : feedPosts;

  const renderTabContent = () => {
    switch (activeTab) {
      case "Project Board":
        return (
          <div className="px-24 pb-8 max-w-[70%]">
            {clientViewMode === "client" ? (
              // Client View - Simplified Project Overview
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      className="p-4 bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors cursor-pointer"
                      style={{ borderRadius: "12px" }}
                      whileHover={{ opacity: 0.8 }}
                      whileTap={{ opacity: 0.9 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {project.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span
                              className={`px-3 py-1 text-xs font-medium ${
                                project.status === "Completed"
                                  ? "bg-[#10b981] text-white"
                                  : project.status === "In Progress"
                                  ? "bg-[#3b82f6] text-white"
                                  : project.status === "Review"
                                  ? "bg-[#f59e0b] text-white"
                                  : "bg-[#6b7280] text-white"
                              }`}
                              style={{ borderRadius: "4px" }}
                            >
                              {project.status === "Completed"
                                ? ""
                                : project.status === "In Progress"
                                ? ""
                                : project.status === "Review"
                                ? ""
                                : ""}{" "}
                              {project.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-[#86837E]">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Due:{" "}
                            {new Date(project.deadline).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-[#86837E]">
                          <Users className="w-4 h-4" />
                          <span>{project.clientType}</span>
                        </div>

                        {project.status === "In Progress" && (
                          <div className="p-3 bg-[#1a1f26] border border-[#3b82f6] rounded-lg">
                            <p className="text-sm text-[#3b82f6]">
                              Currently working on design mockups and user flow
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              // Pro View - Original Kanban Board
              <div className="flex gap-4 h-full">
                {/* To-do Column */}
                <div className="w-[300px] flex-shrink-0">
                  <div
                    className="p-3"
                    style={{ backgroundColor: "#1F1F1F", borderRadius: "12px" }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Circle
                        className="w-4 h-4"
                        style={{ color: "#86837E" }}
                      />
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
                            <div
                              className="text-xs"
                              style={{ color: "#86837E" }}
                            >
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
                            <div
                              className="text-xs"
                              style={{ color: "#86837E" }}
                            >
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
                            <div
                              className="text-xs"
                              style={{ color: "#86837E" }}
                            >
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
            )}
          </div>
        );
      case "All Projects":
        return (
          <div className="px-24 pb-8 max-w-[70%]">
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
                                ? "#0E7B6C"
                                : project.status === "In Progress"
                                ? "#0C6E99"
                                : project.status === "Review"
                                ? "#f59e0b"
                                : project.status === "On Hold"
                                ? "#E03D3E"
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
          <div className="px-24 pb-8 max-w-[70%]">
            {clientViewMode === "client" ? (
              // Client View - Progress Visualizations
              <div className="space-y-8">
                {/* Progress Bars */}
                <div className="space-y-6">
                  {filteredProjects.map((project) => {
                    const progress =
                      project.status === "Completed"
                        ? 100
                        : project.status === "In Progress"
                        ? 65
                        : project.status === "Review"
                        ? 85
                        : 0;

                    return (
                      <div
                        key={project.id}
                        className="bg-[#2d2d2d] rounded-xl p-4"
                        style={{ borderRadius: "12px" }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {project.name}
                            </h3>
                            <p className="text-sm text-[#86837E]">
                              {project.clientType}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">
                              {progress}%
                            </div>
                            <div className="text-sm text-[#86837E]">
                              {project.status === "Completed"
                                ? "Complete"
                                : project.status === "In Progress"
                                ? "In Progress"
                                : project.status === "Review"
                                ? "Review"
                                : "Not Started"}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="w-full bg-[#3d3d3d] rounded-full h-3">
                            <motion.div
                              className={`h-3 rounded-full ${
                                project.status === "Completed"
                                  ? "bg-[#10b981]"
                                  : project.status === "In Progress"
                                  ? "bg-[#3b82f6]"
                                  : project.status === "Review"
                                  ? "bg-[#f59e0b]"
                                  : "bg-[#6b7280]"
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-[#86837E]">
                          <span>
                            Due:{" "}
                            {new Date(project.deadline).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                          <span>{project.priority} Priority</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div
                    className="bg-[#1F1F1F] rounded-xl p-4 text-center"
                    style={{ borderRadius: "12px" }}
                  >
                    <div className="text-3xl font-bold text-[#10b981] mb-2">
                      {completeProjects.length}
                    </div>
                    <div className="text-sm text-white">Completed</div>
                  </div>
                  <div
                    className="bg-[#1F1F1F] rounded-xl p-4 text-center"
                    style={{ borderRadius: "12px" }}
                  >
                    <div className="text-3xl font-bold text-[#3b82f6] mb-2">
                      {inProgressProjects.length}
                    </div>
                    <div className="text-sm text-white">In Progress</div>
                  </div>
                  <div
                    className="bg-[#1F1F1F] rounded-xl p-4 text-center"
                    style={{ borderRadius: "12px" }}
                  >
                    <div className="text-3xl font-bold text-[#f59e0b] mb-2">
                      {projects.filter((p) => p.status === "Review").length}
                    </div>
                    <div className="text-sm text-white">In Review</div>
                  </div>
                  <div
                    className="bg-[#1F1F1F] rounded-xl p-4 text-center"
                    style={{ borderRadius: "12px" }}
                  >
                    <div className="text-3xl font-bold text-[#86837E] mb-2">
                      {todoProjects.length}
                    </div>
                    <div className="text-sm text-white">Upcoming</div>
                  </div>
                </div>
              </div>
            ) : (
              // Pro View - Original
              <div>
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
            )}
          </div>
        );
      case "Client Progress View":
        return (
          <div className="px-24 pb-8 max-w-[70%]">
            {clientViewMode === "client" ? (
              // Client View - Enhanced Visualizations
              <div className="space-y-8">
                {/* Project Status Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div
                    className="p-3 bg-[#1F1F1F] rounded-xl"
                    style={{ borderRadius: "12px" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#10b981] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Completed
                        </h3>
                        <p className="text-sm text-[#10b981]">
                          {completeProjects.length} projects
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {Math.round(
                        (completeProjects.length / projects.length) * 100
                      )}
                      %
                    </div>
                  </div>

                  <div
                    className="p-3 bg-[#1F1F1F] rounded-xl"
                    style={{ borderRadius: "12px" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#3b82f6] rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          In Progress
                        </h3>
                        <p className="text-sm text-[#3b82f6]">
                          {inProgressProjects.length} projects
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {Math.round(
                        (inProgressProjects.length / projects.length) * 100
                      )}
                      %
                    </div>
                  </div>

                  <div
                    className="p-3 bg-[#1F1F1F] rounded-xl"
                    style={{ borderRadius: "12px" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#86837E] rounded-full flex items-center justify-center">
                        <Circle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Upcoming
                        </h3>
                        <p className="text-sm text-[#86837E]">
                          {todoProjects.length} projects
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {Math.round(
                        (todoProjects.length / projects.length) * 100
                      )}
                      %
                    </div>
                  </div>
                </div>

                {/* Project Cards with Progress Rings */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredProjects.map((project) => {
                    const progress =
                      project.status === "Completed"
                        ? 100
                        : project.status === "In Progress"
                        ? 65
                        : project.status === "Review"
                        ? 85
                        : 0;

                    return (
                      <motion.div
                        key={project.id}
                        className="p-6 bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-all cursor-pointer rounded-xl"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {project.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                              <span
                                className={`px-3 py-1 text-xs font-medium ${
                                  project.status === "Completed"
                                    ? "bg-[#10b981] text-white"
                                    : project.status === "In Progress"
                                    ? "bg-[#3b82f6] text-white"
                                    : project.status === "Review"
                                    ? "bg-[#f59e0b] text-white"
                                    : "bg-[#6b7280] text-white"
                                }`}
                                style={{ borderRadius: "4px" }}
                              >
                                {project.status === "Completed"
                                  ? ""
                                  : project.status === "In Progress"
                                  ? ""
                                  : project.status === "Review"
                                  ? ""
                                  : ""}{" "}
                                {project.status}
                              </span>
                            </div>
                          </div>

                          {/* Progress Ring */}
                          <div className="relative w-16 h-16">
                            <svg
                              className="w-16 h-16 transform -rotate-90"
                              viewBox="0 0 36 36"
                            >
                              <path
                                className="text-[#3d3d3d]"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <motion.path
                                className={`${
                                  project.status === "Completed"
                                    ? "text-[#10b981]"
                                    : project.status === "In Progress"
                                    ? "text-[#3b82f6]"
                                    : project.status === "Review"
                                    ? "text-[#f59e0b]"
                                    : "text-[#6b7280]"
                                }`}
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={`${progress}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                initial={{ strokeDasharray: "0, 100" }}
                                animate={{
                                  strokeDasharray: `${progress}, 100`,
                                }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                              />
                            </svg>
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 1 }}
                            >
                              <span className="text-sm font-bold text-white">
                                {progress}%
                              </span>
                            </motion.div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-[#86837E]">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Due:{" "}
                              {new Date(project.deadline).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-[#86837E]">
                            <Users className="w-4 h-4" />
                            <span>{project.clientType}</span>
                          </div>

                          {project.status === "In Progress" && (
                            <div className="p-3 bg-[#1a1f26] rounded-lg">
                              <p className="text-sm text-[#3b82f6]">
                                Currently working on design mockups and user
                                flow
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Recent Updates */}
                <div className="bg-[#2d2d2d] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Recent Updates
                  </h3>
                  <div className="space-y-4">
                    {getClientVisibleUpdates()
                      .slice(0, 3)
                      .map((update) => (
                        <div
                          key={update.id}
                          className="flex items-start gap-3 p-3 bg-[#3d3d3d] rounded-lg"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {update.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-white">
                                {update.author}
                              </span>
                              <span className="text-xs text-[#86837E]">
                                {new Date(
                                  update.timestamp
                                ).toLocaleDateString()}
                              </span>
                              {update.isNewForClient && (
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              )}
                            </div>
                            <p className="text-sm text-[#e5e5e5]">
                              {update.content}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              // Pro View - Original Layout
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
                              ? "#0E7B6C"
                              : project.status === "In Progress"
                              ? "#0C6E99"
                              : project.status === "Review"
                              ? "#f59e0b"
                              : project.status === "On Hold"
                              ? "#E03D3E"
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
                  className="p-4 bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors cursor-pointer border-2 border-dashed"
                  style={{ borderRadius: "12px" }}
                  whileHover={{ opacity: 0.8 }}
                  whileTap={{ opacity: 0.9 }}
                >
                  <div className="flex flex-col items-center justify-center h-full min-h-[120px]">
                    <Plus
                      className="w-6 h-6 mb-2"
                      style={{ color: "#86837E" }}
                    />
                    <span className="text-sm" style={{ color: "#86837E" }}>
                      New item
                    </span>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        );
      case "Feed":
        return (
          <div className="px-24 pb-8 flex justify-center max-w-[70%] mx-auto">
            <div className="w-[600px]">
              {clientViewMode === "client" ? (
                // Client View - Team Updates Only
                <div className="space-y-6">
                  {getClientVisibleUpdates().map((update) => (
                    <motion.div
                      key={update.id}
                      className="p-4 bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors"
                      style={{ borderRadius: "12px" }}
                      whileHover={{ opacity: 0.95 }}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {update.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-white">
                              {update.author}
                            </span>
                            <span className="text-xs text-[#86837E]">
                              •{" "}
                              {new Date(update.timestamp).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                            {update.isNewForClient && (
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm leading-relaxed text-[#e5e5e5]">
                          {update.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-sm hover:text-[#e5e5e5] transition-colors text-[#86837E]">
                          <MessageCircle className="w-4 h-4" />
                          <span>Reply</span>
                        </button>
                        <button className="flex items-center gap-2 text-sm hover:text-[#e5e5e5] transition-colors text-[#86837E]">
                          <TrendingUp className="w-4 h-4" />
                          <span>Like</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  {getClientVisibleUpdates().length === 0 && (
                    <div className="text-center py-12">
                      <MessageCircle className="w-12 h-12 text-[#86837E] mx-auto mb-4" />
                      <p className="text-[#86837E]">No updates yet</p>
                      <p className="text-sm text-[#86837E]">
                        Your team will share updates here
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                // Pro View - Original Feed
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <button
                      className="text-sm hover:text-[#e5e5e5] transition-colors px-2 py-1 rounded"
                      style={{ color: "#86837E" }}
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                      Filter by Client
                    </button>
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
                            <span
                              className="text-xs"
                              style={{ color: "#86837E" }}
                            >
                              • 5h ago
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "#86837E" }}
                            >
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
                          Just finished the initial mockups for the new
                          marketing campaign. Looking for feedback on the color
                          scheme and overall direction. The client wants
                          something that feels modern but approachable.
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
                              well. Maybe we could try a slightly warmer tone
                              for the CTA buttons?
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
                              className="w-full bg-transparent text-xs py-2 px-3 border rounded-md focus:outline-none focus:border-[#4d4d4d] transition-colors"
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
                            <span
                              className="text-xs"
                              style={{ color: "#86837E" }}
                            >
                              • 8h ago
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "#86837E" }}
                            >
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
                              className="w-full bg-transparent text-xs py-2 px-3 border rounded-md focus:outline-none focus:border-[#4d4d4d] transition-colors"
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
                            <span
                              className="text-xs"
                              style={{ color: "#86837E" }}
                            >
                              • 1d ago
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "#86837E" }}
                            >
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
                          suggestions for topics that would resonate with our
                          target audience?
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
                              How about a series on "Design Trends 2025"? That
                              seems to be getting a lot of engagement lately.
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
                              className="w-full bg-transparent text-xs py-2 px-3 border rounded-md focus:outline-none focus:border-[#4d4d4d] transition-colors"
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
                            <span
                              className="text-xs"
                              style={{ color: "#86837E" }}
                            >
                              • 2d ago
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "#86837E" }}
                            >
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
                              className="w-full bg-transparent text-xs py-2 px-3 border rounded-md focus:outline-none focus:border-[#4d4d4d] transition-colors"
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
                            <span
                              className="text-xs"
                              style={{ color: "#86837E" }}
                            >
                              • 3d ago
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "#86837E" }}
                            >
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
                          Launch day is approaching! All assets are ready and
                          the team is excited. Let's make sure we're all aligned
                          on the rollout timeline.
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
                              className="w-full bg-transparent text-xs py-2 px-3 border rounded-md focus:outline-none focus:border-[#4d4d4d] transition-colors"
                              style={{ color: "#e5e5e5" }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "Timeline":
        return (
          <div className="px-24 pb-8 max-w-[70%]">
            {clientViewMode === "client" ? (
              // Client View - Payment Overview
              <div className="space-y-8">
                {/* Payment Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-[#2d2d2d] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#10b981] rounded-lg">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Paid</h3>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      $
                      {filteredInvoices
                        .filter((inv) => inv.status === "Paid")
                        .reduce((sum, inv) => sum + inv.amount, 0)
                        .toLocaleString()}
                    </div>
                    <div className="text-sm text-[#86837E]">
                      {
                        filteredInvoices.filter((inv) => inv.status === "Paid")
                          .length
                      }{" "}
                      invoices
                    </div>
                  </div>

                  <div className="bg-[#2d2d2d] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#3b82f6] rounded-lg">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        Pending
                      </h3>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      $
                      {filteredInvoices
                        .filter((inv) => inv.status === "Sent")
                        .reduce((sum, inv) => sum + inv.amount, 0)
                        .toLocaleString()}
                    </div>
                    <div className="text-sm text-[#86837E]">
                      {
                        filteredInvoices.filter((inv) => inv.status === "Sent")
                          .length
                      }{" "}
                      invoices
                    </div>
                  </div>

                  <div className="bg-[#2d2d2d] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#ef4444] rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        Overdue
                      </h3>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      $
                      {getFilteredOverdueInvoices()
                        .reduce((sum, inv) => sum + inv.amount, 0)
                        .toLocaleString()}
                    </div>
                    <div className="text-sm text-[#86837E]">
                      {getFilteredOverdueInvoices().length} invoices
                    </div>
                  </div>
                </div>

                {/* Invoice List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Recent Invoices
                  </h3>
                  {filteredInvoices.slice(0, 5).map((invoice, index) => (
                    <motion.div
                      key={invoice.id}
                      className="bg-[#2d2d2d] rounded-xl p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">
                            {invoice.projectName}
                          </h4>
                          <p className="text-sm text-[#86837E]">
                            {invoice.clientType}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-white">
                            ${invoice.amount.toLocaleString()}
                          </div>
                          <div
                            className={`inline-block text-xs px-1.5 py-0.5 rounded-full ${
                              invoice.status === "Paid"
                                ? "bg-[#10b981] text-white"
                                : invoice.status === "Sent"
                                ? "bg-[#3b82f6] text-white"
                                : invoice.status === "Overdue"
                                ? "bg-[#ef4444] text-white"
                                : "bg-[#6b7280] text-white"
                            }`}
                          >
                            {invoice.status}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-[#86837E]">
                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              // Pro View - Payment Tracker
              <div className="space-y-8">
                {/* Overdue Invoices Alert */}
                {getFilteredOverdueInvoices().length > 0 && (
                  <div className="bg-[#2d1a1a] rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
                      <h3 className="text-lg font-semibold text-white">
                        Overdue Invoices
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {getFilteredOverdueInvoices().map((invoice) => (
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between bg-[#1a0f0f] rounded-lg p-3"
                        >
                          <div>
                            <div className="text-white font-medium">
                              {invoice.projectName}
                            </div>
                            <div className="text-sm text-[#86837E]">
                              {invoice.clientType}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">
                              ${invoice.amount.toLocaleString()}
                            </div>
                            <div className="text-xs text-[#ef4444]">
                              {Math.ceil(
                                (new Date().getTime() -
                                  new Date(invoice.dueDate).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              days overdue
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upcoming Payments */}
                {getFilteredUpcomingInvoices().length > 0 && (
                  <div className="bg-[#1a1f26] rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-5 h-5 text-[#3b82f6]" />
                      <h3 className="text-lg font-semibold text-white">
                        Due This Week
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {getFilteredUpcomingInvoices().map((invoice) => (
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between bg-[#0f1419] rounded-lg p-3"
                        >
                          <div>
                            <div className="text-white font-medium">
                              {invoice.projectName}
                            </div>
                            <div className="text-sm text-[#86837E]">
                              {invoice.clientType}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">
                              ${invoice.amount.toLocaleString()}
                            </div>
                            <div className="text-xs text-[#3b82f6]">
                              Due{" "}
                              {new Date(invoice.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Invoices Table */}
                <div className="bg-[#2d2d2d] rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-[#3d3d3d]">
                    <h3 className="text-lg font-semibold text-white">
                      All Invoices
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#3d3d3d]">
                        <tr>
                          <th className="text-left p-3 text-sm font-medium text-gray-300">
                            Project
                          </th>
                          <th className="text-left p-3 text-sm font-medium text-gray-300">
                            Client
                          </th>
                          <th className="text-left p-3 text-sm font-medium text-gray-300">
                            Amount
                          </th>
                          <th className="text-left p-3 text-sm font-medium text-gray-300">
                            Status
                          </th>
                          <th className="text-left p-3 text-sm font-medium text-gray-300">
                            Due Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInvoices.map((invoice, index) => (
                          <motion.tr
                            key={invoice.id}
                            className="border-b border-[#3d3d3d] hover:bg-[#3d3d3d]/50"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <td className="p-3">
                              <div className="text-white font-medium">
                                {invoice.projectName}
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="text-sm text-[#86837E]">
                                {invoice.clientType}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="text-white font-semibold">
                                ${invoice.amount.toLocaleString()}
                              </div>
                            </td>
                            <td className="p-3">
                              <span
                                className={`inline-block px-1.5 py-0.5 text-xs font-medium rounded-full ${
                                  invoice.status === "Paid"
                                    ? "bg-[#10b981] text-white"
                                    : invoice.status === "Sent"
                                    ? "bg-[#3b82f6] text-white"
                                    : invoice.status === "Overdue"
                                    ? "bg-[#ef4444] text-white"
                                    : invoice.status === "Draft"
                                    ? "bg-[#6b7280] text-white"
                                    : "bg-[#f59e0b] text-white"
                                }`}
                              >
                                {invoice.status}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="text-sm text-[#86837E]">
                                {new Date(invoice.dueDate).toLocaleDateString()}
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
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
          <div className="flex items-center mb-2">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-6 h-6" style={{ color: "#e5e5e5" }} />
              <h1
                className="text-2xl font-semibold"
                style={{ color: "#e5e5e5" }}
              >
                Freelance Projects
              </h1>
              <span
                className="text-2xl font-semibold"
                style={{ color: "#86837E" }}
              >
                /
              </span>
              <span
                className="text-2xl font-semibold"
                style={{ color: "#86837E" }}
              >
                Viewing in:
              </span>
            </div>

            {/* View Toggle Button */}
            <div
              className="flex items-center gap-2"
              style={{ marginLeft: "12px" }}
            >
              <motion.button
                className={`flex items-center gap-2 px-4 py-2 transition-all hover:opacity-80 ${
                  clientViewMode === "pro"
                    ? "bg-[#1F1F1F] text-white"
                    : "bg-[#f59e0b] text-white"
                }`}
                style={{ borderRadius: "12px" }}
                onClick={() => {
                  if (clientViewMode === "pro") {
                    setClientViewMode("client");
                    markClientUpdatesAsViewed();
                  } else {
                    setClientViewMode("pro");
                  }
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {clientViewMode === "pro" ? (
                  <>
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Pro</span>
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Client</span>
                    {getNewClientUpdatesCount() > 0 && (
                      <motion.div
                        className="w-2 h-2 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      />
                    )}
                  </>
                )}
              </motion.button>
            </div>

            {/* Client Filter - Show in both client and pro view */}
            <>
              <span
                className="text-2xl font-semibold"
                style={{ color: "#86837E", marginLeft: "16px" }}
              >
                /
              </span>
              <div className="relative">
                <select
                  className="text-2xl font-semibold bg-transparent text-[#86837E] border-none outline-none cursor-pointer pr-8 rounded-lg px-3 py-1"
                  value={selectedClient || ""}
                  onChange={(e) => setSelectedClient(e.target.value || null)}
                  style={{ appearance: "none" }}
                >
                  <option value="" className="bg-transparent text-[#86837E]">
                    All Clients
                  </option>
                  {availableClientTypes.map((clientType) => (
                    <option
                      key={clientType}
                      value={clientType}
                      className="bg-transparent text-[#86837E]"
                    >
                      {clientType}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-[#86837E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </>
          </div>

          {/* Client Communication Indicator */}
          {clientViewMode === "client" && getNewClientUpdatesCount() > 0 && (
            <div
              className="mb-4 p-3 bg-[#1F1F1F] rounded-lg"
              style={{ borderRadius: "12px" }}
            >
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#10b981]" />
                <span className="text-sm text-[#10b981]">
                  {getNewClientUpdatesCount()} new update
                  {getNewClientUpdatesCount() > 1 ? "s" : ""} from your team
                </span>
              </div>
            </div>
          )}

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
              <span className="text-sm">
                {clientViewMode === "client"
                  ? "Project Overview"
                  : "Project Board"}
              </span>
            </button>
            {clientViewMode === "pro" && (
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
            )}
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
              <span className="text-sm">
                {clientViewMode === "client" ? "Progress" : "Chart"}
              </span>
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
              <span className="text-sm">
                {clientViewMode === "client"
                  ? "Milestones"
                  : "Client Progress View"}
              </span>
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
              <span className="text-sm">
                {clientViewMode === "client" ? "Updates" : "Feed"}
              </span>
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
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Payment</span>
            </button>

            <div className="flex items-center gap-2 ml-auto relative">
              {clientViewMode === "pro" && (
                <>
                  <button
                    className="p-2 hover:opacity-70 transition-opacity rounded"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="w-4 h-4" style={{ color: "#86837E" }} />
                  </button>
                  <button className="p-2 hover:opacity-70 transition-opacity rounded">
                    <ArrowUpDown
                      className="w-4 h-4"
                      style={{ color: "#86837E" }}
                    />
                  </button>
                  <button className="p-2 hover:opacity-70 transition-opacity rounded">
                    <Search className="w-4 h-4" style={{ color: "#86837E" }} />
                  </button>
                </>
              )}

              {clientViewMode === "client" && (
                <button className="flex items-center gap-2 px-3 py-2 text-white hover:opacity-80 transition-opacity">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download Summary</span>
                </button>
              )}

              {clientViewMode === "pro" && (
                <button
                  className="flex items-center gap-2 px-3 py-2 text-white hover:opacity-80 transition-opacity"
                  style={{ borderRadius: "50px", backgroundColor: "#0C6E99" }}
                  onClick={handleAddProject}
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">New</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              )}

              {/* Filter Overlay */}
              {isFilterOpen && clientViewMode === "pro" && (
                <div className="absolute top-12 right-0 bg-black/60 backdrop-blur-sm rounded-xl shadow-lg z-10 min-w-[250px]">
                  <div className="px-6 py-6">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="text-xs font-medium"
                        style={{ color: "#86837E" }}
                      >
                        Filter by Person
                      </div>
                      <button
                        className="text-base hover:text-[#e5e5e5] transition-colors"
                        style={{ color: "#86837E" }}
                        onClick={() => setIsFilterOpen(false)}
                      >
                        ×
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            selectedClient === null
                              ? "opacity-100"
                              : "opacity-70 hover:opacity-100"
                          }`}
                          style={{
                            backgroundColor: "#6b7280",
                            color: "white",
                          }}
                          onClick={() => {
                            setSelectedClient(null);
                            setIsFilterOpen(false);
                          }}
                        >
                          All People
                        </button>
                        {allPeople.map((person) => (
                          <button
                            key={person}
                            className={`px-2 py-1 text-xs rounded-full transition-colors ${
                              selectedClient === person
                                ? "opacity-100"
                                : "opacity-70 hover:opacity-100"
                            }`}
                            style={{
                              backgroundColor: getPersonColor(person),
                              color: "white",
                            }}
                            onClick={() => {
                              setSelectedClient(person);
                              setIsFilterOpen(false);
                            }}
                          >
                            {person}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          className="flex-1 overflow-x-auto"
          key={activeTab + clientViewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>

        {/* Modal */}
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProject}
        />

        {/* Client Message Component */}
        {clientViewMode === "client" && (
          <ClientMessage projectId="1" onSendMessage={handleSendMessage} />
        )}
      </div>
    </div>
  );
}
