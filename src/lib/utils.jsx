import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function toSnakeCase(str) {
  return str
    .trim() // Remove leading/trailing spaces
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/-+/g, "_") // Replace hyphens with underscores
    .replace(/_+/g, "_"); // Replace multiple underscores with a single underscore
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatCurrency(value) {
  const formattedValue = value
    .replace(/\D/g, "") // Remove all non-digit characters
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas after every 3 digits
  return `Rp ${formattedValue}`; // Add currency symbol (e.g., Rp)
}
