import { useAuth } from "../../context/AuthContext";
import "./dashboard.css";
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const EmployeeDashboard = () => {
    const {user} = useAuth();
    return(
        <div>
          <h3 className='dashboardTitle'>Welcome to Dashboard, {user?.userName || 'User'}</h3>
          <div className="welcometextbox">
            <h3>Welcome back, {user?.userName || 'User'}</h3>
            <p>Here's your dashboard overview for today</p>
          </div>
          <div className="userDetailslayout">
            <div>
                <div>
                    <PermContactCalendarIcon className="empuserlogo bg-lime-300 text-green-800"/>
                    <TrendingUpIcon className="empusersublogo text-green-800"/>  
                </div>
                <h4>88%</h4>
                <h6>Attendance Rate</h6>
                <p>22/25 days</p>
            </div>
            <div>
                <div>
                    <CalendarTodayIcon className="empuserlogo bg-sky-300 text-sky-800"/>
                    <ErrorOutlineIcon className="empusersublogo text-sky-800"/>  
                </div>
                <h4>27</h4>
                <h6>Total Leave Days</h6>
                <p>Annual: 15,Sick: 7</p>
            </div>
          </div>
          <div className="userDetailslayout">
            <div>
                <div>
                    <AccessTimeIcon className="empuserlogo bg-purple-300 text-purple-800"/>
                    <CalendarMonthIcon className="empusersublogo text-purple-800"/>  
                </div>
                <h4>168h</h4>
                <h6>This Month</h6>
                <p>Avg: 8.4h/day</p>
            </div>
            <div>
                <div>
                    <AttachMoneyIcon className="empuserlogo bg-yellow-300 text-yellow-800"/>
                    <ChatBubbleOutlineIcon className="empusersublogo text-yellow-800"/>  
                </div>
                <h4>$20000</h4>
                <h6>Current Salary</h6>
                <p>Last Paid: 2026-03-01</p>
            </div>
          </div>

        </div>
    )
}

export default EmployeeDashboard;