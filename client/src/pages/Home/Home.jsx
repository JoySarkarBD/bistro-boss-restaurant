import About from "../../components/About/About";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import Phone from "../../components/Phone/Phone";
import HomeCover from "../../components/Shared/Cover/HomeCover";
import PageTitle from "../../components/Shared/PageTitle";
import img from "./../../assets/home/chef-service.jpg";

const Home = () => {
  return (
    <div>
      <PageTitle title='Home' />
      <Banner />
      <Categories />
      <HomeCover
        img={img}
        title="Bistro Boss"
        desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo."
      />
      <Phone/>
      <About/>
    </div>
  );
};

export default Home;
