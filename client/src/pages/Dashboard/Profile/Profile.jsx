import ProfileForm from "../../../components/Form/ProfileForm";
import PersonalDetails from "../../../components/PersonalDetails/PersonalDetails";


const Profile = () => {
    return (
        <section className="min-h-screen">
      <div className="grid grid-cols-1 gap-x-5 md:grid-cols-3 lg:grid-cols-3">
        <ProfileForm />
        <PersonalDetails />
      </div>
    </section>
    );
};

export default Profile;