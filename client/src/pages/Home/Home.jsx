import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import PageTitle from "../../components/Shared/PageTitle";

const Home = () => {
  return (
    <div>
      <PageTitle title='Home' />
      <Banner />
      <Categories />
    </div>
  );
};

export default Home;
