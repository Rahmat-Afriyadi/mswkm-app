const sizeClasses = {
  small: "px-2.5 py-1.5",
  medium: "px-3 py-2",
  large: "px-3.5 py-2.5",
};

const themeClasses = {
  primary:
    "text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
  danger:
    "text-white bg-red-600 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",
  secondary:
    "bg-white text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
};

function Button({
  label,
  type = "button",
  icon: Icon,
  size = "medium",
  theme = "primary",
  style = {},
  disabled,
  onClick,
}) {
  return (
    <>
      <button
        type={type}
        className={`text-sm font-semibold rounded-md shadow-sm 
          ${themeClasses[theme]} 
          ${sizeClasses[size]} 
          ${Icon && "inline-flex items-center gap-x-1.5"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
        `}
        style={{ ...style }}
        disabled={disabled}
        onClick={onClick}
      >
        {Icon && <Icon aria-hidden="true" className="-mr-0.5 h-5 w-5" />}
        {label}
      </button>
    </>
  );
}

export default Button;
