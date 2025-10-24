import { create } from "zustand";
import {
  Project,
  ProjectFilters,
  ProjectSort,
  ViewType,
  DashboardState,
} from "@/types";
import { mockProjects } from "@/lib/data/projects";

interface DashboardStore extends DashboardState {
  // Actions
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setFilters: (filters: ProjectFilters) => void;
  setSort: (sort: ProjectSort) => void;
  setView: (view: ViewType) => void;
  setSearchQuery: (query: string) => void;
  setSelectedProject: (project?: Project) => void;
  setIsModalOpen: (isOpen: boolean) => void;

  // Computed
  getFilteredProjects: () => Project[];
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  // Initial state
  projects: mockProjects,
  filters: {},
  sort: { field: "name", direction: "asc" },
  view: "table",
  searchQuery: "",
  selectedProject: undefined,
  isModalOpen: false,

  // Actions
  setProjects: (projects) => set({ projects }),

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id
          ? {
              ...project,
              ...updates,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : project
      ),
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    })),

  setFilters: (filters) => set({ filters }),

  setSort: (sort) => set({ sort }),

  setView: (view) => set({ view }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setSelectedProject: (selectedProject) => set({ selectedProject }),

  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),

  // Computed
  getFilteredProjects: () => {
    const { projects, filters, sort, searchQuery } = get();

    let filtered = projects;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.clientType
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter((project) =>
        filters.status!.includes(project.status)
      );
    }

    // Apply priority filter
    if (filters.priority && filters.priority.length > 0) {
      filtered = filtered.filter((project) =>
        filters.priority!.includes(project.priority)
      );
    }

    // Apply clientType filter
    if (filters.clientType && filters.clientType.length > 0) {
      filtered = filtered.filter((project) =>
        filters.clientType!.includes(project.clientType)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sort.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return filtered;
  },
}));
