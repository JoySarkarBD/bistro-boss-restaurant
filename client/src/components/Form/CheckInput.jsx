/* eslint-disable react/prop-types */

const CheckInput = ({ title, ...attributes }) => {
  return (
    <>
      <div className='form-control'>
        <label className='cursor-pointer label justify-start'>
          <input className='checkbox checked:bg-blue-500 ' {...attributes} />
          <span className='label-text ps-4 leading-7 text-sm text-gray-600'>
            {title}
          </span>
        </label>
      </div>
    </>
  );
};

export default CheckInput;
