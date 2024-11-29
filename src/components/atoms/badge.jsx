const colorClasses = {
  gray: "bg-gray-100 text-gray-600 ring-gray-600/20",
  red: "bg-red-100 text-red-600 ring-red-600/20",
  yellow: "bg-yellow-100 text-yellow-600 ring-yellow-600/20",
  green: "bg-green-100 text-green-600 ring-green-600/20",
  blue: "bg-blue-100 text-blue-600 ring-blue-600/20",
  indigo: "bg-indigo-100 text-indigo-600 ring-indigo-600/20",
  purple: "bg-purple-100 text-purple-600 ring-purple-600/20",
  pink: "bg-pink-100 text-pink-600 ring-pink-600/20",
};
function Badge({ color = "gray", label }) {
  return (
    <>
      <span
        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${colorClasses[color]}`}
      >
        {label}
      </span>
    </>
  );
}

export default Badge;
