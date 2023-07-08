/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>Bistro Boss | {title}</title>
      </Helmet>
    </>
  );
};

export default PageTitle;
