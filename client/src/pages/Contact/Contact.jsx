import contactCover from "../../assets/contact/banner.jpg";
import Cover from "../../components/Shared/Cover/Cover";
import PageTitle from "../../components/Shared/PageTitle";
const Contact = () => {
  return (
    <div>
      <PageTitle title='Contact' />
      <Cover
        img={contactCover}
        title='contact us'
        subText='Would you like to try a dish?'></Cover>
      <h1>Contact Page</h1>
    </div>
  );
};

export default Contact;
