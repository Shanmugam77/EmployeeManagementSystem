import Login from "./components/Login"
import "./index.css"
import {Route,BrowserRouter,Routes} from "react-router-dom"
import DashboardPage from "./Page/Dashboard"
import EmployeelistPage from "./Page/Employeelist"
import SettingPage from "./Page/Setting"
import Protect from "./Protect"
import DepartmentPage from "./Page/Department"
import LeaveListPage from "./Page/Leaves"
import AttendancePage from "./Page/Attendance"
import AttendanceReportPage from "./Page/AttendanceReports"
import AddEmployeePage from "./Page/Employeelist/AddEmployeePage"


const App=()=>{
    return(
        <div >
         <BrowserRouter>
         <Routes>
            <Route element={<Login/>} path="/"/>
            <Route element={<Protect Component={DashboardPage}/>} path="/dashboard"/>
            <Route element={<Protect Component={EmployeelistPage}/>} path="/employeelist"/>
            <Route element={<Protect Component={AddEmployeePage}/>} path="/addemployee"/>
            <Route element={<Protect Component={AttendanceReportPage}/>} path="/attendancereport"/>
            <Route element={<Protect Component={DepartmentPage}/>} path="/department"/>
            <Route element={<Protect Component={LeaveListPage}/>} path="/leaves"/>
            <Route element={<Protect Component={AttendancePage}/>} path="/attendance"/>
            <Route element={<Protect Component={SettingPage}/>} path="/setting"/>
         </Routes>
         </BrowserRouter>
        </div>
    )
}
export default App