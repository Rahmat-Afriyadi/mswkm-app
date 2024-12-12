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

export function formatDateLongMonth(date) {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function formatCurrency(value) {
  const formattedValue = value
    .replace(/\D/g, "") // Remove all non-digit characters
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas after every 3 digits
  return `Rp ${formattedValue}`; // Add currency symbol (e.g., Rp)
}
