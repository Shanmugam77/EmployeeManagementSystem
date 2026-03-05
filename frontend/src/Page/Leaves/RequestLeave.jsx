import RequestLeave from "../../components/leave/RequestLeave";
import Header from "../../Layout/Header"
import Sidebar from "../../Layout/sidebar"

const RequestLeavePage = () => {
    return(
        <div>
            <Sidebar/>
            <Header/>
            <div className="main-wrapper">
                <RequestLeave/>
            </div>
        </div>
    )
}
export default RequestLeavePage;