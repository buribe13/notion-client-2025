export type ProjectStatus =
  | "Completed"
  | "In Progress"
  | "On Hold"
  | "Not Started"
  | "Review";
export type ProjectPriority = "Low" | "Medium" | "High" | "Urgent";
export type ClientType =
  | "Individual"
  | "Startup"
  | "Non-profit"
  | "Enterprise"
  | "International"
  | "Regular Client"
  | "New Client";

export interface Project {
  id: string;
  name: string;
  clientType: ClientType;
  status: ProjectStatus;
  deadline: string;
  priority: ProjectPriority;
  budget: number;
  hoursSpent: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFilters {
  status?: ProjectStatus[];
  priority?: ProjectPriority[];
  clientType?: ClientType[];
}

export interface ProjectSort {
  field: keyof Project;
  direction: "asc" | "desc";
}

export type ViewType = "table" | "board" | "calendar";
export type ClientViewMode = "pro" | "client";

export interface ClientUpdate {
  id: string;
  projectId: string;
  author: string;
  content: string;
  timestamp: string;
  isVisibleToClient: boolean;
  isNewForClient: boolean;
}

export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";
export type PaymentMethod =
  | "Bank Transfer"
  | "PayPal"
  | "Stripe"
  | "Check"
  | "Cash";

export interface Invoice {
  id: string;
  projectId: string;
  projectName: string;
  clientType: ClientType;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  sentDate?: string;
  paidDate?: string;
  paymentMethod?: PaymentMethod;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardState {
  projects: Project[];
  filters: ProjectFilters;
  sort: ProjectSort;
  view: ViewType;
  searchQuery: string;
  selectedProject?: Project;
  isModalOpen: boolean;
  clientViewMode: ClientViewMode;
  clientUpdates: ClientUpdate[];
  invoices: Invoice[];
}
