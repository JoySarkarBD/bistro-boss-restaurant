import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import Phone from "../../components/Phone/Phone";
import PageTitle from "../../components/Shared/PageTitle";

const Home = () => {
  return (
    <div>
      <PageTitle title='Home' />
      <Banner />
      <Categories />
      <Phone/>
    </div>
  );
};

export default Home;
