// eslint-disable-next-line react/prop-types
const FormBtn = ({ title, type, ...attributes }) => {
  return (
    <>
      <button
        type={type}
        className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 mt-4 w-1/2 rounded focus:outline-none focus:shadow-outline mx-auto '
        {...attributes}>
        {title}
      </button>
    </>
  );
};

export default FormBtn;
