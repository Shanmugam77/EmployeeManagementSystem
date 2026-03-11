import { useAuth } from "../../context/AuthContext";
import "./dashboard.css";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from "react";
import Instance from "../../Axiosconfig";

const EmployeeDashboard = () => {
    const {user} = useAuth();
    const [userDisplayData,setUserDisplayData] = useState({});
    

    let hadlediplaydata = (value,fieldName) => {
        setUserDisplayData(prev => {
            return{
                ...prev,
                [fieldName]:value
            }
        })
    };

    let fetchUserInfo = async() => {
        try {
            let response = await Instance.get(`/user/withDepDetails/${user?.userId}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status == 200) {
                // console.log(response?.data?.user);
                hadlediplaydata(response?.data?.user?.salary,"currentSalary");
                hadlediplaydata(response?.data?.user?.updatedAt,"lastUpdated");
                hadlediplaydata(response?.data?.user?.department,"department");
            }
        } catch (error) {
            console.log(error?.response?.data);
        }
    }

    let fetchTotalUser = async () => {
      try {
        let response = await Instance.get(`/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
    
        if (response.status === 200) {
        //   console.log(response?.data?.users);
          let users = response?.data?.users;
          let currentUser = users.filter(x=>x?._id == user?.userId);
          let usersInMyDep = users.filter(
            (x) => currentUser[0]?.department?.toString() === x?.department?.toString()
          );
        //   console.log(usersInMyDep);
          hadlediplaydata(usersInMyDep.length, "totalUsersInMyDepartment");
        }
      } catch (error) {
        console.log(error?.response?.data);
      }
    };

    let fetchleaveDetails = async() => {
        try {
            let response = await Instance.get(`/leave/${user?.userId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            });
            if (response.status === 200) {
                // console.log(response?.data?.leaves);
                let leaves = response?.data?.leaves;
                hadlediplaydata(leaves?.length,"totalleave");
                let approved = leaves.filter((x)=> x?.action === "Approved");
                hadlediplaydata(approved?.length,"leaveApproved");
                let rejected = leaves.filter((x)=> x?.action === "Rejected");
                hadlediplaydata(rejected?.length,"leaveRejected");   
            }
        } catch (error) {
            console.log(error?.response?.data);
        }
    }

    useEffect(()=>{
        // console.log(user);
        fetchUserInfo();
        fetchTotalUser();
        fetchleaveDetails();
    },[])
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
                    <ApartmentIcon className="empuserlogo bg-sky-300 text-sky-800"/>
                    <TrendingUpIcon className="empusersublogo text-sky-800"/>  
                </div>
                <h4>{userDisplayData?.department?.departmentName || "N/A"}</h4>
                <h6>{userDisplayData?.department?.description || "N/A"}</h6>
                <p>Total Persons In Your Department :{userDisplayData?.totalUsersInMyDepartment || 0}</p>
            </div>
            <div>
                <div>
                    <CheckIcon className="empuserlogo bg-green-300 text-green-800"/>
                    <CalendarMonthIcon className="empusersublogo text-green-800"/>  
                </div>
                <h4>{userDisplayData?.leaveApproved || 0}</h4>
                <h6>Total Leave Approved</h6>
                <p>Total Leave Applied:{userDisplayData?.totalleave || 0}</p>
            </div>
          </div>
          <div className="userDetailslayout">
            <div>
                <div>
                    <ClearIcon className="empuserlogo bg-red-300 text-red-800"/>
                    <CalendarTodayIcon className="empusersublogo text-red-800"/>  
                </div>
                <h4>{userDisplayData?.leaveRejected || 0}</h4>
                <h6>Total Leave Rejected</h6>
                <p>Total Leave Applied:{userDisplayData?.totalleave || 0}</p>
            </div>
            <div>
                <div>
                    <AttachMoneyIcon className="empuserlogo bg-yellow-300 text-yellow-800"/>
                    <ChatBubbleOutlineIcon className="empusersublogo text-yellow-800"/>  
                </div>
                <h4>${userDisplayData?.currentSalary || 0}</h4>
                <h6>Current Salary</h6>
                <p>Last Your Profile Updated: {new Date(userDisplayData?.lastUpdated).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }) || "9999-01-01"} </p>
            </div>
          </div>

        </div>
    )
}

export default EmployeeDashboard;