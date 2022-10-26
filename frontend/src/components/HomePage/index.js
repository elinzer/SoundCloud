import { useSelector } from "react-redux";
import DisplayAllSongs from "./SongDisplay";
import '../../css/HomePage.css';
import Carousel from "../Carousel/Carousel";
import header1 from '../../images/scheader1text.png';
import header2 from '../../images/scheader2text.png';

const HomePage = ({ audioProp }) => {


    const sessionUser = useSelector(state => state.session.user)

    let sessionHomePage;
    if (sessionUser) {
        sessionHomePage = (
            <div>
            </div>
        )
    } else {
        sessionHomePage = (
            <div className="container">
                <div className="carousel-con">
                    <Carousel>
                        <img style={{width: '1280px', height: '465px'}} src={header1} alt=''></img>
                        <img style={{ height: '465px' }} src={header2} alt=''></img>
                    </Carousel>
                </div>
            </div>
        )
    }

    return (
        <div>
            {sessionHomePage}
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', fontFamily: 'Overpass'}}>
                <div style={{width: "1260px", display: 'flex', justifyContent: 'center', backgroundColor: 'white'}}><h3>Explore what's popular today:</h3></div>
                <DisplayAllSongs audioProp={audioProp} />
            </div>
        </div>
    )
}

export default HomePage;
