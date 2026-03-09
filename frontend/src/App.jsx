import "./index.css"
import Login from "./components/Login"
import DashboardPage from "./Page/Dashboard"
import EmployeelistPage from "./Page/Employeelist"
import SettingPage from "./Page/Setting"
import Protect from "./Protect"
import DepartmentPage from "./Page/Department"
import LeaveListPage from "./Page/Leaves"
import AttendancePage from "./Page/Attendance"
import AttendanceReportPage from "./Page/AttendanceReports"
import AddEmployeePage from "./Page/Employeelist/AddEmployeePage"
import EditEmployeePage from "./Page/Employeelist/EditEmployeePage"
import ProfilePage from "./Page/Profile"
import EmployeeDashboardPage from "./Page/Dashboard/EmployeeDashboard"
import RequestLeavePage from "./Page/Leaves/RequestLeave"

import { useAuth } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EmployeeLeaveListPage from "./Page/Leaves/UserLeaveList"

const App = () => {
 const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* Unauthorized route or Public Route */}
        <Route
          path="/login"
          element={
            user ? (
              user.userRole !== "EMPLOYEE"
                ? <Navigate to="/dashboard" />
                : <Navigate to="/employee-dashboard" />
            ) : (
              <Login />
            )
          }
        />

        {/* Protected Routes & Authorrized routes */}
        <Route element={<Protect />}>

          {user?.userRole !== "EMPLOYEE" ? (
            <>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/employee" element={<EmployeelistPage />} />
              <Route path="/addemployee" element={<AddEmployeePage />} />
              <Route path="/editemployee/:id" element={<EditEmployeePage />} />
              <Route path="/department" element={<DepartmentPage />} />
              <Route path="/leaves" element={<LeaveListPage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/employee-dashboard" />} />
              <Route path="/employee-dashboard" element={<EmployeeDashboardPage />} />
              <Route path="/userleaves" element={<EmployeeLeaveListPage />} />
              <Route path="/requestleave" element={<RequestLeavePage />} />
            </>
          )}
          {/* common route for both admin & employeee */}
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/profile" element={<ProfilePage />} />

        </Route>

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;