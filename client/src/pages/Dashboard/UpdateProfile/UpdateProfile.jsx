
import UserProfileForm from "../../../components/Form/UpdateProfileForm";
import PersonalDetails from "../../../components/PersonalDetails/PersonalDetails";

const UpdateProfile = () => {
  return (
    <section className="min-h-screen">
      <div className="grid grid-cols-1 gap-x-5 md:grid-cols-3 lg:grid-cols-3">
        <UserProfileForm/>
        <PersonalDetails />
      </div>
    </section>
  );
};

export default UpdateProfile;
