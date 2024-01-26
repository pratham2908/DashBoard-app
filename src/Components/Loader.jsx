import "../Styles/Loader.css";
const Loader = () => {
    return (
        <div className="loader">
            <h1>Loading Data ...</h1>
            <div className="loader-dot-parent">
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
            </div>
        </div>
    );
};

export default Loader;