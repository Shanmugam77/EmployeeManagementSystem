import Header from "../../Layout/Header/Header"
import Sidebar from "../../Layout/Header/sidebar"

const AttendancePage = () => {
    return(
        <div>
            <Sidebar/>
            <Header/>
            <div className="main-wrapper">
                Attendance page
            </div>
        </div>
    )
}

export default AttendancePage;