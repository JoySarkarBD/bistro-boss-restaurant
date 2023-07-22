import UserProfileForm from "../../components/Form/UpdateProfileForm";

const UserProfile = () => {
  return (
    <section className='min-h-screen flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-md w-[600px]'>
        <h2 className='text-3xl border-gray-300 border-b-2 py-3 font-bold text-[#344767] mb-8'>
          Update Profile
        </h2>
        <UserProfileForm />
      </div>
    </section>
  );
};

export default UserProfile;
