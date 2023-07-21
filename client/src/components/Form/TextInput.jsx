// eslint-disable-next-line react/prop-types
const TextInput = ({ title, ...attributes }) => {
  return (
    <>
      <div className='my-2'>
        <label
          htmlFor='email'
          className='block leading-7 text-sm text-gray-600 mb-2'>
          {title}
        </label>
        <input
          className='w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition-colors duration-300'
          autoComplete='false'
          {...attributes}
        />
      </div>
    </>
  );
};

export default TextInput;
