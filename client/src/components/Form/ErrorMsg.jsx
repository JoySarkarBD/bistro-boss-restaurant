/* eslint-disable react/prop-types */
const ErrorMsg = ({ subject }) => {
  return (
    <>
      <p className='text-red-600 px-2 font-normal bg-red-200 p-0.5 rounded-lg'>
        {subject || "This is fucking err"}{" "}
      </p>
    </>
  );
};

export default ErrorMsg;
