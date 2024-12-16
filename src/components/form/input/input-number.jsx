import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

function InputNumber({ id, name, label, placeholder, value, register, max, min, validation, errors, ...props }) {
  return (
    <>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          id={id}
          name={name}
          type={"number"}
          value={value}
          step={"0.000000000000001"}
          max={max}
          min={min}
          placeholder={placeholder}
          aria-invalid={errors ? true : false}
          aria-describedby={`${name}-${errors[name] ? "error" : "description"}`}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
            errors[name] ? "pr-10 text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500" : ""
          }`}
          {...register(name, validation)}
          {...props}
        />
        {errors[name] && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ExclamationCircleIcon aria-hidden="true" className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="text-sm text-red-600" style={{ marginTop: 2 }}>
          {errors[name]?.message}
        </p>
      )}
    </>
  );
}

export default InputNumber;
