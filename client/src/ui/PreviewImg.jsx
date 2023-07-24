/* eslint-disable react/prop-types */
import { useState } from "react";

const PreviewImg = ({ file }) => {
  const [preview, setPreview] = useState(null);
  const reader = new FileReader();
  reader.onload = () => {
    setPreview(reader.result);
  };
  reader.readAsDataURL(file);
  return (
    <div className='w-[149px] h-[149px] mt-10'>
      <img src={preview} alt='' className='w-full h-full rounded-lg' />
    </div>
  );
};

export default PreviewImg;
