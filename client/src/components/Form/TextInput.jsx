// eslint-disable-next-line react/prop-types
const TextInput = ({ title, ...attributes }) => {
    return (
      <>
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {title}
        </label>
        <input
          
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition-colors duration-300"
          autoComplete="false"
          {...attributes}
        />
      </>
    );
  };
  
  export default TextInput;
  