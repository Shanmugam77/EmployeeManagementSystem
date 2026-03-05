import Header from "../../Layout/Header"
import Sidebar from "../../Layout/sidebar"

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