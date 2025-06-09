import bnimg from "../../Assets/Banner/Banner.jpg";
import "./Ads.css";

const Ads = () => {
  return (
    <>
      <div className="Ads">
        <div className="Ads-main">
          <div className="Ads-image">
            <img src={bnimg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Ads;
