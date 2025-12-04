"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  Filter,
  Search,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  FileText,
} from "lucide-react";
import { Project, ProjectSort } from "@/types";
import { useDashboardStore } from "@/lib/store";
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getPriorityColor,
  getClientColor,
} from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProjectTableProps {
  projects: Project[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
  const { sort, setSort, setSelectedProject, setIsModalOpen, deleteProject } =
    useDashboardStore();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const palette = {
    text: { color: "hsl(var(--foreground))" },
    muted: { color: "hsl(var(--muted-foreground))" },
    primary: {
      backgroundColor: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
    },
    card: { backgroundColor: "hsl(var(--secondary))" },
  };

  const handleSort = (field: keyof Project) => {
    const newDirection =
      sort.field === field && sort.direction === "asc" ? "desc" : "asc";
    setSort({ field, direction: newDirection });
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
    }
  };

  const SortIcon = ({ field }: { field: keyof Project }) => {
    if (sort.field !== field) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />;
    }
    return sort.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 text-white" />
    ) : (
      <ChevronDown className="w-4 h-4 text-white" />
    );
  };

  return (
    <div className="notion-main flex-1 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6" style={palette.text} />
          <h1 className="text-2xl font-bold" style={palette.text}>
            Freelance Projects
          </h1>
        </div>

        {/* View Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto">
          {[
            { id: "table", label: "All Projects", icon: "📋" },
            { id: "board", label: "Project Board", icon: "📌" },
            { id: "calendar", label: "Calendar View", icon: "📅" },
            { id: "progress", label: "Client Progress View", icon: "👥" },
            { id: "timeline", label: "Client Timeline", icon: "⏰" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                tab.id === "table"
                  ? "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] border-b-2"
                  : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]"
              )}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Table Controls */}
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-1 lg:gap-2">
            <button className="p-2 rounded-md hover:bg-[hsl(var(--accent))]">
              <Filter className="w-4 h-4" style={palette.muted} />
            </button>
            <button className="p-2 rounded-md hover:bg-[hsl(var(--accent))]">
              <ChevronUp className="w-4 h-4" style={palette.muted} />
            </button>
            <button className="p-2 rounded-md hover:bg-[hsl(var(--accent))]">
              <Search className="w-4 h-4" style={palette.muted} />
            </button>
            <button className="p-2 rounded-md hover:bg-[hsl(var(--accent))]">
              <MoreHorizontal className="w-4 h-4" style={palette.muted} />
            </button>
          </div>
          <button
            className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-md text-sm font-medium"
            style={palette.primary}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="notion-card rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead style={palette.card}>
              <tr>
                <th
                  className="text-left p-2 lg:p-4 text-xs lg:text-sm font-medium cursor-pointer transition-colors"
                  style={palette.muted}
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1 lg:gap-2">
                    <span className="text-xs lg:text-sm">📝</span>
                    <span className="hidden sm:inline">Project Name</span>
                    <span className="sm:hidden">Name</span>
                    <SortIcon field="name" />
                  </div>
                </th>
                <th
                  className="text-left p-2 lg:p-4 text-xs lg:text-sm font-medium cursor-pointer transition-colors"
                  style={palette.muted}
                  onClick={() => handleSort("clientType")}
                >
                  <div className="flex items-center gap-1 lg:gap-2">
                    <span className="text-xs lg:text-sm">👤</span>
                    <span className="hidden sm:inline">Client</span>
                    <span className="sm:hidden">Client</span>
                    <SortIcon field="clientType" />
                  </div>
                </th>
                <th
                  className="text-left p-2 lg:p-4 text-xs lg:text-sm font-medium cursor-pointer transition-colors"
                  style={palette.muted}
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1 lg:gap-2">
                    <span className="text-xs lg:text-sm">⚡</span>
                    <span className="hidden sm:inline">Status</span>
                    <span className="sm:hidden">Status</span>
                    <SortIcon field="status" />
                  </div>
                </th>
                <th
                  className="text-left p-2 lg:p-4 text-xs lg:text-sm font-medium cursor-pointer transition-colors"
                  style={palette.muted}
                  onClick={() => handleSort("deadline")}
                >
                  <div className="flex items-center gap-1 lg:gap-2">
                    <span className="text-xs lg:text-sm">📅</span>
                    <span className="hidden sm:inline">Deadline</span>
                    <span className="sm:hidden">Due</span>
                    <SortIcon field="deadline" />
                  </div>
                </th>
                <th
                  className="text-left p-2 lg:p-4 text-xs lg:text-sm font-medium cursor-pointer transition-colors"
                  style={palette.muted}
                  onClick={() => handleSort("priority")}
                >
                  <div className="flex items-center gap-1 lg:gap-2">
                    <span className="text-xs lg:text-sm">⬆️</span>
                    <span className="hidden sm:inline">Priority</span>
                    <span className="sm:hidden">Priority</span>
                    <SortIcon field="priority" />
                  </div>
                </th>
                <th
                  className="text-left p-2 lg:p-4 text-xs lg:text-sm font-medium cursor-pointer transition-colors"
                  style={palette.muted}
                  onClick={() => handleSort("budget")}
                >
                  <div className="flex items-center gap-1 lg:gap-2">
                    <span className="text-xs lg:text-sm">💰</span>
                    <span className="hidden sm:inline">Budget</span>
                    <span className="sm:hidden">Budget</span>
                    <SortIcon field="budget" />
                  </div>
                </th>
                <th
                  className="text-left p-2 lg:p-4 text-xs lg:text-sm font-medium cursor-pointer transition-colors"
                  style={palette.muted}
                  onClick={() => handleSort("hoursSpent")}
                >
                  <div className="flex items-center gap-1 lg:gap-2">
                    <span className="text-xs lg:text-sm">⏰</span>
                    <span className="hidden sm:inline">Hours Spent</span>
                    <span className="sm:hidden">Hours</span>
                    <SortIcon field="hoursSpent" />
                  </div>
                </th>
                <th
                  className="text-left p-2 lg:p-4 text-xs lg:text-sm font-medium"
                  style={palette.muted}
                >
                  <span className="hidden sm:inline">Actions</span>
                  <span className="sm:hidden">...</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  className="transition-colors"
                  style={{ backgroundColor: hoveredRow === project.id ? "hsl(var(--accent))" : "transparent" }}
                  onMouseEnter={() => setHoveredRow(project.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <td className="p-2 lg:p-4">
                    <div className="font-medium text-sm lg:text-base" style={palette.text}>
                      {project.name}
                    </div>
                  </td>
                  <td className="p-2 lg:p-4">
                    <span
                      className={cn(
                        "px-1 lg:px-2 py-1 rounded-full text-xs font-medium",
                        getClientColor(project.clientType)
                      )}
                    >
                      {project.clientType}
                    </span>
                  </td>
                  <td className="p-2 lg:p-4">
                    <div className="flex items-center gap-1 lg:gap-2">
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      <span
                        className={cn(
                          "px-1 lg:px-2 py-1 rounded-full text-xs font-medium",
                          getStatusColor(project.status)
                        )}
                      >
                        {project.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-2 lg:p-4 text-xs lg:text-sm" style={palette.muted}>
                    {formatDate(project.deadline)}
                  </td>
                  <td className="p-2 lg:p-4">
                    <span
                      className={cn(
                        "px-1 lg:px-2 py-1 rounded-full text-xs font-medium",
                        getPriorityColor(project.priority)
                      )}
                    >
                      {project.priority}
                    </span>
                  </td>
                  <td className="p-2 lg:p-4 text-xs lg:text-sm" style={palette.muted}>
                    {formatCurrency(project.budget)}
                  </td>
                  <td className="p-2 lg:p-4 text-xs lg:text-sm" style={palette.muted}>
                    {project.hoursSpent}h
                  </td>
                  <td className="p-2 lg:p-4">
                    <div
                      className={cn(
                        "flex items-center gap-1 lg:gap-2",
                        hoveredRow === project.id ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-1 rounded hover:bg-[hsl(var(--muted))]"
                      >
                        <Edit className="w-3 h-3 lg:w-4 lg:h-4" style={palette.muted} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1 rounded hover:bg-[hsl(var(--muted))]"
                      >
                        <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" style={palette.muted} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Item Row */}
        <div className="p-2 lg:p-4">
          <button className="flex items-center gap-2 text-xs lg:text-sm notion-tile rounded-md px-2 py-1">
            <Plus className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="hidden sm:inline">New item</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>
    </div>
  );
}
