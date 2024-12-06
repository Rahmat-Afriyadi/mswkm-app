function Checkbox({ id, name, label, register }) {
  return (
    <>
      <div className="flex items-center cursor-pointer mb-[2px]">
        <input
          id={id}
          name={name}
          type="checkbox"
          className="w-8 h-8 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600 cursor-pointer"
          {...register(name)}
        />
        {label && (
          <label htmlFor={id} className="block ml-3 text-sm leading-6 text-gray-900 font-medium cursor-pointer">
            {label}
          </label>
        )}
      </div>
    </>
  );
}

export default Checkbox;
