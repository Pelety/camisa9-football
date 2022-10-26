export const Input = ({ name, error, ...props }) => (
  <div className="flex flex-col">
    <input
      {...props}
      name={name}
      id={name}
      className={`p-3 border boder-gray-700 rounded-xl focus:outline focus:outline-1 ${
        error && "border-red-300"
      }`}
    />
    <span className="p-2 text-sm text-red-300">{error}</span>
  </div>
);
