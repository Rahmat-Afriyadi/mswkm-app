const themeClasses = {
  primary: "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600",
  danger: "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600",
  secondary: "bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600",
};

const sizeClasses = {
  small: "p-1",
  medium: "p-1.5",
  large: "p-2",
};

export default function ActionButton({
  size = "medium",
  theme = "primary",
  onClick,
  icon: Icon,
  disabled = false,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-md p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
        ${themeClasses[theme]} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
        ${sizeClasses[size]}
      `}
    >
      {Icon && <Icon aria-hidden="true" className="w-5 h-5" />}
    </button>
  );
}
