import "./Hero.css";
import ReactPlayer from "react-player";
import heroVid from "../../assets/video.mp4";

const Hero = () => {



  return (
    <>
      <div className="hero">
        <div className="heroText">
          <h1>Discover Best Hotels around You!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo earum
            libero at? Nostrum distinctio est rem beatae,
            <br /> facere libero velit enim, voluptas, adipisci quo aut quos
            mollitia deserunt maxime voluptate?
          </p>
        </div>
          <form className="destinationSearch">
            <i className="fa fa-location-dot"></i>
            <input type="search" placeholder="Where are you going?" />
            <button>search</button>
          </form>

        <div className="videoPlayer">
          <ReactPlayer
            url={heroVid}
            controls={false}
            loop={true}
            muted={true}
            autoplay={true}
            playing={true}
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;

// https://player.vimeo.com/progressive_redirect/playback/798709446/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=19e86d001599ac1866feb882ef2c8d8931b38e0742e6c8ae4fad26af32da51f2
