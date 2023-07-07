// eslint-disable-next-line react/prop-types
const FormBtn = ({ title, ...attributes }) => {
    return (
      <>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 mt-4 w-full rounded focus:outline-none focus:shadow-outline"
          {...attributes}
        >
          {title}
        </button>
      </>
    );
  };
  
  export default FormBtn;
  