import ProfileForm from "../../../components/Form/ProfileForm";
import UpdatePasswordForm from "../../../components/Form/UpdatePasswordForm";
import PersonalDetails from "../../../components/PersonalDetails/PersonalDetails";
import PageTitle from "../../../components/Shared/PageTitle";

const Profile = () => {
  return (
    <>
      <PageTitle title='Profile' />
      <section className='min-h-screen'>
        <div className='grid grid-cols-1 gap-x-5 xl:grid-cols-3'>
          <ProfileForm />
          <PersonalDetails />
        </div>
        <UpdatePasswordForm />
      </section>
    </>
  );
};

export default Profile;
