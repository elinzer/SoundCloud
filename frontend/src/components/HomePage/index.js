import { useSelector } from "react-redux";


const HomePage = () => {

    const sessionUser = useSelector(state => state.session.user)

    let sessionHomePage;
    if (sessionUser) {
        sessionHomePage = (
            <div>
                Hello from logged in user home page
            </div>
        )
    } else {
        sessionHomePage = (
            <div>
                Hello from not logged in home page
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
