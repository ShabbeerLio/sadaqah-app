import bnimg from "../../Assets/Banner/Banner.jpg";
import "./Banner.css";

const Banners = () => {
  return (
    <>
      <div className="Banners">
        <div className="Banners-main">
          <div className="banner-image">
            <img src={bnimg} alt="" />
          </div>
          <div className="Banners-detail">
            <div className="banner-left"></div>
            <div className="banner-right">
              <h1></h1>
            </div>
          </div>
          <div className="banner-reserve">
          </div>
        </div>
      </div>
    </>
  );
};

export default Banners;
