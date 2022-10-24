import { useSelector } from "react-redux";
import DisplayAllSongs from "./SongDisplay";
import bgImage from '../../images/Screen Shot 2022-08-25 at 8.14.10 PM.png';
import '../../css/HomePage.css';
import Carousel from "../Carousel/Carousel";

const HomePage = ({ audioProp }) => {


    const sessionUser = useSelector(state => state.session.user)

    let sessionHomePage;
    if (sessionUser) {
        sessionHomePage = (
            <div className="container">
                <img className="splash-page-bg" src={bgImage} alt='a concert'></img>
                <div>
                    <h3>Explore what's popular today:</h3>
                    <div>
                    </div>
                </div>

            </div>
        )
    } else {
        sessionHomePage = (
            <div className="container">
                <div className="carousel-con">
                <Carousel>
                    <img style={{height: '465px'}} src="https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_a-3bb2d420.jpg" alt=''></img>
                    <img src="https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_featured_artists-8081257b.jpg" alt=''></img>
                </Carousel>
                </div>
                {/* <img className="splash-page-bg" src={bgImage} alt='a concert'></img> */}
                <div>
                    <h3>Explore what's popular today:</h3>
                    <div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {sessionHomePage}
            <DisplayAllSongs audioProp={audioProp} />
        </div>
    )
}

export default HomePage;
