import shopCover from "../../assets/shop/banner2.jpg";
import PageCover from "../../components/Shared/Cover/PageCover";
import PageTitle from "../../components/Shared/PageTitle";

const Shop = () => {
  return (
    <div>
      <PageTitle title='Shop' />
      <PageCover
        img={shopCover}
        title='OUR SHOP'
        subText='Would you like to try a dish?'></PageCover>
      <h1>Shop Page</h1>
    </div>
  );
};

export default Shop;
