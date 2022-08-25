import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import DisplayAllSongs from "./SongDisplay";
import bgImage from '../../images/people-at-concert-1105666.jpg'
import '../../css/HomePage.css'

const HomePage = () => {

    const sessionUser = useSelector(state => state.session.user)

    let sessionHomePage;
    if (sessionUser) {
        sessionHomePage = (
           null
        )
    } else {
        sessionHomePage = (
            <div className="container">
                {/* <div>
                    <img className="splash-page-bg" src={bgImage} alt='a concert'></img>
                    </div> */}
                <div>
                    EXPLORE TRACKS:
                    <div>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div>
          {sessionHomePage}
          <DisplayAllSongs />
        </div>
    )
}

export default HomePage;
