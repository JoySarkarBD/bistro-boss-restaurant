import PageCover from "../Shared/Cover/PageCover";
import PageTitle from "../Shared/PageTitle";
import img from "./../../assets/home/featured.jpg";


const TermsAndCondition = () => {
    return (
        <>
            <PageTitle title="Terms & Condition"/>
            <PageCover img={img} title="Terms & Condition" subText="Terms & Condition" />

            <div>
                <h2>Accept Terms & Condition</h2>
            </div>
        </>
    );
};

export default TermsAndCondition;