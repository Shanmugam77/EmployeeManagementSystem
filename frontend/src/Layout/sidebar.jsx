import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./header.css";
import Swal from 'sweetalert2';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { logout,user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#555",
      cancelButtonColor: "#008BA6",
      confirmButtonText: "Yes, logout me!"
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        // Redirect to login page
        navigate("/login", { replace: true });
      }
    });
  };

  const conditionalClass = (path) =>
    `nav-link py-2 rounded-xl mb-2 ${location.pathname === path ? "active-nav-links" : ""}`;

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      {/* <button className="toggle-btn d-block d-sm-none" onClick={toggleSidebar}>
        <span className="visually-hidden">Toggle sidebar</span>
        <span className="navbar-toggler-icon" />
      </button> */}
      <div className="sidebar-header">
        <div className="logo-card">
          <div className="logo-icon">
            <PeopleAltOutlinedIcon fontSize="large"/>
          </div>
          <div className="logo-text">
            <h3>EMPLOYEE MS</h3>
            <p>{user?.userRole != "EMPLOYEE"?"Management System":"Employee Portal"}</p>
          </div>
        </div>
          
      </div>

      <aside className="sidebar-content">
        <nav className="sidebar-nav">
          <ul className="mt-2">
            {user?.userRole != "EMPLOYEE"?
            <>
                <li>
                  <Link to="/dashboard" className={conditionalClass("/dashboard")}>
                    <span className="me-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/employee" className={conditionalClass("/employee")}>
                    <span className="me-3">Employees</span>
                  </Link>
                </li>
                <li>
                  <Link to="/department" className={conditionalClass("/department")}>
                    <span className="me-3">Department</span>
                  </Link>
                </li>
                <li>
                  <Link to="/leaves" className={conditionalClass("/leaves")}>
                    <span className="me-3">Leaves</span>
                  </Link>
                </li>
                {/* <li>
                  <Link to="/attendance" className={conditionalClass("/attendance")}>
                    <span className="me-3">Attendance</span>
                  </Link>
                </li>
                <li>
                  <Link to="/attendancereport" className={conditionalClass("/attendancereport")}>
                    <span className="me-3">Attendance Reports</span>
                  </Link>
                </li> */}

            </> 
            : 
            <>
                <li>
                  <Link to="/employee-dashboard" className={conditionalClass("/employee-dashboard")}>
                    <span className="me-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/userleaves" className={conditionalClass("/userleaves")}>
                    <span className="me-3">Request Leave</span>
                  </Link>
                </li>
    
            </>}
            
            <li>
              <Link to="/profile" className={conditionalClass("/profile")}>
                <span className="me-3">My Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/setting" className={conditionalClass("/setting")}>
                <span className="me-3">Setting</span>
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout} className="nav-link py-2 rounded-xl">
                <span className="me-3">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
