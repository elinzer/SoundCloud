import { useSelector } from "react-redux";
import DisplayAllSongs from "./SongDisplay";
import bgImage from '../../images/people-at-concert-1105666.jpg'
import './HomePage.css'

const HomePage = () => {

    const sessionUser = useSelector(state => state.session.user)

    let sessionHomePage;
    if (sessionUser) {
        sessionHomePage = (
            <div>
                <div>
                    <DisplayAllSongs />
                </div>
            </div>
        )
    } else {
        sessionHomePage = (
            <div className="container">
                <div>
                    <img className="splash-page-bg" src={bgImage} alt='a concert'></img>
                    </div>
                <div>
                    EXPLORE TRACKS:
                    <div>
                        <DisplayAllSongs />
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div>
          {sessionHomePage}
        </div>
    )
}

export default HomePage;
