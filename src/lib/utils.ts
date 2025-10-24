import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getStatusColor(status: string): string {
  const colors = {
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "In Progress":
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "On Hold": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    "Not Started":
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    Review:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  };
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
}

export function getPriorityColor(priority: string): string {
  const colors = {
    Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    High: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    Urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };
  return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";
}

export function getClientColor(client: string): string {
  const colors = {
    "Acme Corp": "text-white", // Notion Red Regular #E03D3E
    TechStart: "text-white", // Notion Blue Regular #0C6E99
    "Sarah Johnson": "text-white", // Notion Green Regular #0E7B6C
    Individual: "text-white", // Notion Orange Regular #D9730B
    Startup: "text-white", // Notion Purple Regular #693FA5
    "Non-profit": "text-white", // Notion Green Regular #0E7B6C
    Enterprise: "text-white", // Notion Purple Regular #693FA5
    International: "text-white", // Notion Red Regular #E03D3E
    "Regular Client": "text-white", // Notion Green Regular #0E7B6C
    "New Client": "text-white", // Notion Blue Regular #0C6E99
  };
  return colors[client as keyof typeof colors] || "text-white";
}
