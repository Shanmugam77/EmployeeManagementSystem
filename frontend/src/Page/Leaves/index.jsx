import LeaveList from "../../components/leave/LeaveList";
import Header from "../../Layout/Header/Header"
import Sidebar from "../../Layout/Header/sidebar"

const LeaveListPage = () => {
    return(
        <div>
            <Sidebar/>
            <Header/>
            <div className="main-wrapper">
                <LeaveList/>
            </div>
        </div>
    )
}
export default LeaveListPage;