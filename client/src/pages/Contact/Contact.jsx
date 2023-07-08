import contactCover from "../../assets/contact/banner.jpg";
import PageCover from "../../components/Shared/Cover/PageCover";

import PageTitle from "../../components/Shared/PageTitle";
const Contact = () => {
  return (
    <div>
      <PageTitle title='Contact' />
      <PageCover
        img={contactCover}
        title='contact us'
        subText='Would you like to try a dish?'></PageCover>
      <h1>Contact Page</h1>
    </div>
  );
};

export default Contact;
