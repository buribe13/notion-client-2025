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
    <div className="flex h-screen bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Bar */}
        <div className="bg-gray-800 border-b border-gray-700 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
              <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-300 text-sm lg:text-base truncate">
                dashboard / breadcrumb...
              </span>
              <span className="text-gray-500 hidden lg:inline">/</span>
              <span className="text-white text-sm lg:text-base truncate">
                Freelance Projects
              </span>
            </div>

            <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
              <span className="text-xs lg:text-sm text-gray-400 hidden sm:inline">
                Edited just now
              </span>
              <button className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-1 text-gray-400 hover:text-white">
                <Share className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="hidden lg:inline">Share</span>
              </button>
              <button className="text-gray-400 hover:text-yellow-400">
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
          className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 w-12 h-12 lg:w-14 lg:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-40"
          whileHover={{ scale: 1.1 }}
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
