import UpdateProfileForm from "../../components/Form/UpdateProfileForm";

const UpdateProfile = () => {
  return (
    <section>
    <div className="bg-white p-8 rounded-lg shadow-md w-[600px]">
      <h2 className="text-3xl border-gray-300 border-b-2 py-3 font-bold text-[#344767] mb-8">
        Update Profile
      </h2>
      <UpdateProfileForm/>
    </div>
  </section>
  );
};

export default UpdateProfile;
