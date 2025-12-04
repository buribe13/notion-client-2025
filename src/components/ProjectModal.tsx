"use client";

import { useState, useEffect } from "react";
import { X, Calendar, DollarSign, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, ProjectStatus, ProjectPriority, ClientType } from "@/types";
import { useDashboardStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { addProject, updateProject } = useDashboardStore();
  const palette = {
    card: {
      backgroundColor: "hsl(var(--card))",
      border: "1px solid hsl(var(--border))",
    },
    muted: { color: "hsl(var(--muted-foreground))" },
    text: { color: "hsl(var(--foreground))" },
    input: {
      backgroundColor: "hsl(var(--muted))",
      borderColor: "hsl(var(--border))",
      color: "hsl(var(--foreground))",
    },
    primary: {
      backgroundColor: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
    },
  };
  const [formData, setFormData] = useState({
    name: "",
    clientType: "Individual" as ClientType,
    status: "Not Started" as ProjectStatus,
    deadline: "",
    priority: "Medium" as ProjectPriority,
    budget: "",
    hoursSpent: "",
    description: "",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        clientType: project.clientType,
        status: project.status,
        deadline: project.deadline,
        priority: project.priority,
        budget: project.budget.toString(),
        hoursSpent: project.hoursSpent.toString(),
        description: project.description || "",
      });
    } else {
      setFormData({
        name: "",
        clientType: "Individual",
        status: "Not Started",
        deadline: "",
        priority: "Medium",
        budget: "",
        hoursSpent: "",
        description: "",
      });
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const projectData: Omit<Project, "id" | "createdAt" | "updatedAt"> = {
      name: formData.name,
      clientType: formData.clientType,
      status: formData.status,
      deadline: formData.deadline,
      priority: formData.priority,
      budget: parseFloat(formData.budget) || 0,
      hoursSpent: parseInt(formData.hoursSpent) || 0,
      description: formData.description,
    };

    if (project) {
      updateProject(project.id, projectData);
    } else {
      const newProject: Project = {
        ...projectData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      addProject(newProject);
    }

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
            style={palette.card}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold" style={palette.text}>
                  {project ? "Edit Project" : "Add New Project"}
                </h2>
                <button
                  onClick={onClose}
                  className="hover:opacity-80"
                  style={palette.muted}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={palette.muted}>
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                    style={palette.input}
                    required
                  />
                </div>

                {/* Client Type */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={palette.muted}>
                    Client Type
                  </label>
                  <select
                    value={formData.clientType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clientType: e.target.value as ClientType,
                      })
                    }
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                    style={palette.input}
                  >
                    <option value="Individual">Individual</option>
                    <option value="Startup">Startup</option>
                    <option value="Non-profit">Non-profit</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="International">International</option>
                    <option value="Regular Client">Regular Client</option>
                    <option value="New Client">New Client</option>
                  </select>
                </div>

                {/* Status and Priority */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={palette.muted}>
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as ProjectStatus,
                        })
                      }
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={palette.input}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Review">Review</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={palette.muted}>
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priority: e.target.value as ProjectPriority,
                        })
                      }
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={palette.input}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={palette.muted}>
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({ ...formData, deadline: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                    style={palette.input}
                    required
                  />
                </div>

                {/* Budget and Hours */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={palette.muted}>
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Budget
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={palette.input}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={palette.muted}>
                      <Clock className="w-4 h-4 inline mr-2" />
                      Hours Spent
                    </label>
                    <input
                      type="number"
                      value={formData.hoursSpent}
                      onChange={(e) =>
                        setFormData({ ...formData, hoursSpent: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                      style={palette.input}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={palette.muted}>
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                    style={palette.input}
                    placeholder="Project description..."
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-md hover:opacity-80"
                    style={{
                      color: "hsl(var(--muted-foreground))",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--muted))",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md hover:opacity-90"
                    style={palette.primary}
                  >
                    {project ? "Update Project" : "Add Project"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
