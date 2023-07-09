
import contactCover from "../../assets/contact/banner.jpg";
import PageCover from "../../components/Shared/Cover/PageCover";
import PageTitle from "../../components/Shared/PageTitle";
import ContactForm from "./ContactForm";
import OurLocation from "./OurLocation";

const Contact = () => {
  return (
    <div>
      <PageTitle title='Contact' />
      <PageCover
        img={contactCover}
        title='contact us'
        subText='Would you like to try a dish?'></PageCover>

      <OurLocation/>
      <ContactForm/>
    </div>
  );
};

export default Contact;
