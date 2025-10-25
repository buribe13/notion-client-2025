import { create } from "zustand";
import {
  Project,
  ProjectFilters,
  ProjectSort,
  ViewType,
  DashboardState,
  ClientViewMode,
  ClientUpdate,
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
  setClientViewMode: (mode: ClientViewMode) => void;
  addClientUpdate: (update: ClientUpdate) => void;
  markUpdateAsVisibleToClient: (updateId: string) => void;
  markClientUpdatesAsViewed: () => void;

  // Computed
  getFilteredProjects: () => Project[];
  getClientVisibleUpdates: () => ClientUpdate[];
  getNewClientUpdatesCount: () => number;
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
  clientViewMode: "pro",
  clientUpdates: [
    {
      id: "1",
      projectId: "1",
      author: "Benjamin Uribe",
      content:
        "Initial mockups completed for Marketing Collateral project. Looking for feedback on color scheme.",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      isVisibleToClient: true,
      isNewForClient: true,
    },
    {
      id: "2",
      projectId: "2",
      author: "Alex Chen",
      content:
        "User flow design completed for App UI/UX Redesign. Ready for client review.",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      isVisibleToClient: true,
      isNewForClient: false,
    },
    {
      id: "3",
      projectId: "3",
      author: "Maria Rodriguez",
      content:
        "Q1 content calendar finalized. Focus on thought leadership and case studies.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      isVisibleToClient: false,
      isNewForClient: false,
    },
  ],

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

  setClientViewMode: (clientViewMode) => set({ clientViewMode }),

  addClientUpdate: (update) =>
    set((state) => ({
      clientUpdates: [...state.clientUpdates, update],
    })),

  markUpdateAsVisibleToClient: (updateId) =>
    set((state) => ({
      clientUpdates: state.clientUpdates.map((update) =>
        update.id === updateId ? { ...update, isVisibleToClient: true } : update
      ),
    })),

  markClientUpdatesAsViewed: () =>
    set((state) => ({
      clientUpdates: state.clientUpdates.map((update) => ({
        ...update,
        isNewForClient: false,
      })),
    })),

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

  getClientVisibleUpdates: () => {
    const { clientUpdates } = get();
    return clientUpdates.filter((update) => update.isVisibleToClient);
  },

  getNewClientUpdatesCount: () => {
    const { clientUpdates } = get();
    return clientUpdates.filter(
      (update) => update.isVisibleToClient && update.isNewForClient
    ).length;
  },
}));
