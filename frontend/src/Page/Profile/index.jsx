import Profile from "../../components/profile/Profile";
import Header from "../../Layout/Header"
import Sidebar from "../../Layout/sidebar"

const ProfilePage = () => {
    return(
        <div>
            <Sidebar/>
            <Header/>
            <div className="main-wrapper">
                <Profile/>
            </div>
        </div>
    )
}
export default ProfilePage;