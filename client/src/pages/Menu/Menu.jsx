import menuCover from "../../assets/menu/banner3.jpg";
import PageCover from "../../components/Shared/Cover/PageCover";
import PageTitle from "../../components/Shared/PageTitle";

const Menu = () => {
  return (
    <div>
      <PageTitle title='Menu' />
      <PageCover
        img={menuCover}
        title='OUR MENU'
        subText='Would you like to try a dish?'></PageCover>
      <h1>Menu Page</h1>
    </div>
  );
};

export default Menu;
