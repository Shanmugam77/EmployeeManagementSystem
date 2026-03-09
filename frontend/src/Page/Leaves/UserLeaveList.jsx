import EmployeeLeaveList from "../../components/leave/EmployeeLeaveList";
import Header from "../../Layout/Header"
import Sidebar from "../../Layout/sidebar"

const EmployeeLeaveListPage = () => {
    return(
        <div>
            <Sidebar/>
            <Header/>
            <div className="main-wrapper">
                <EmployeeLeaveList/>
            </div>
        </div>
    )
}
export default EmployeeLeaveListPage;