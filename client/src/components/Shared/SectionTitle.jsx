// eslint-disable-next-line react/prop-types
const SectionTitle = ({ subheading, heading }) => {
  return (
    <div className='container'>
      <div className='max-w-[424px] mx-auto text-center my-4'>
        <h4 className='text-[#D99904] text-xl'>{subheading}</h4>
        <h2 className='border-b-4 border-t-4 py-5 mt-4 text-4xl'>{heading}</h2>
      </div>
    </div>
  );
};

export default SectionTitle;
