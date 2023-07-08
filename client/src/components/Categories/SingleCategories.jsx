// eslint-disable-next-line react/prop-types
const SingleCategories = ({category}) => {
    const {name,img}=category ||{}
    return (
        <div className="categories">
            <img src={img} style={{height:'350px'}} alt="IMG" />
            <h3 className="text-3xl font-semibold text-white">{name}</h3>
        </div>
    );
};

export default SingleCategories;