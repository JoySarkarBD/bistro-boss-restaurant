
import SectionTitle from "../Shared/SectionTitle";
import aboutImg from "./../../assets/home/featured.jpg";
import "./About.css";

const About = () => {
  return (
    <section className="featured flex items-center justify-center flex-col my-24 text-white">
      <SectionTitle subheading="---Check it out---" heading="FROM OUR MENU" />

      <div className="body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-xl lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={aboutImg}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h2 className="title-font sm:text-4xl text-xl mb-4 font-medium text-white">
              March 20, 2023
              <br className="hidden lg:inline-block" />
              WHERE CAN I GET SOME?
            </h2>
            <p className="mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              voluptate facere, deserunt dolores maiores quod nobis quas quasi.
              Eaque repellat recusandae ad laudantium tempore consequatur
              consequuntur omnis ullam maxime tenetur.
            </p>
            <div className="flex justify-center">
              <button className="btn flex justify-center mx-auto btn-outline text-white border-0 border-b-4 mt-4">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;