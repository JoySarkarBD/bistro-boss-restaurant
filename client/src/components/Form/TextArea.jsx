// eslint-disable-next-line react/prop-types
const TextArea = ({ title, ...attributes }) => {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
      <div className="mt-1">
        <textarea
          rows="4"
          className="shadow-sm px-4 py-2 focus:outline-none focus:border-indigo-500 mt-1 block w-full border-2 border-gray-300 rounded-md transition-colors duration-300"
          {...attributes}
        />
      </div>
    </>
  );
};

export default TextArea;
