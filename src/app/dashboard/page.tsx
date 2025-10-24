"use client";

import { Sidebar } from "@/components/Sidebar";
import { ProjectTable } from "@/components/ProjectTable";
import { ProjectModal } from "@/components/ProjectModal";
import { useDashboardStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Sparkles, Share, Star } from "lucide-react";

export default function DashboardPage() {
  const {
    getFilteredProjects,
    isModalOpen,
    selectedProject,
    setIsModalOpen,
    setSelectedProject,
  } = useDashboardStore();

  const projects = getFilteredProjects();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(undefined);
  };

  const handleAddProject = () => {
    setSelectedProject(undefined);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#181818" }}>
      <Sidebar />

      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Bar */}
        <div className="px-3 py-1" style={{ backgroundColor: "#181818" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
              <span
                className="text-xs lg:text-sm truncate"
                style={{ color: "#86837E" }}
              >
                dashboard / breadcrumb...
              </span>
              <span className="hidden lg:inline" style={{ color: "#86837E" }}>
                /
              </span>
              <span
                className="text-xs lg:text-sm truncate"
                style={{ color: "#e5e5e5" }}
              >
                Freelance Projects
              </span>
            </div>

            <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
              <span
                className="text-xs lg:text-sm hidden sm:inline"
                style={{ color: "#86837E" }}
              >
                Edited just now
              </span>
              <button
                className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-1 hover:opacity-80"
                style={{ color: "#86837E" }}
              >
                <Share className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="hidden lg:inline">Share</span>
              </button>
              <button className="hover:opacity-80" style={{ color: "#86837E" }}>
                <Star className="w-3 h-3 lg:w-4 lg:h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <ProjectTable projects={projects} />

        {/* Floating Action Button */}
        <motion.button
          onClick={handleAddProject}
          className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 w-12 h-12 lg:w-14 lg:h-14 text-white rounded-full shadow-lg flex items-center justify-center z-40"
          style={{ backgroundColor: "#3d3d3d" }}
          whileHover={{ scale: 1.1, backgroundColor: "#4d4d4d" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <span className="text-xl lg:text-2xl">+</span>
        </motion.button>

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
