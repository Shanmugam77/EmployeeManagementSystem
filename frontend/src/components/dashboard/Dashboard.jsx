import { useEffect, useState } from 'react'
import "./dashboard.css";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PaymentsIcon from '@mui/icons-material/Payments';
import SummarizeIcon from '@mui/icons-material/Summarize';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import Instance from '../../Axiosconfig';

const Dashboard = () => {
  const [countData,setCountData] = useState({});

  const handleCount = (value,fieldName) => {
    setCountData((prev)=>{
      return{
        ...prev,
        [fieldName]:value
      }
    })
  }

  const fetchEmployeeData = async() => {
    try {
      const response = await Instance.get("/user",{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.status == 200) {
        // console.log("emp",response?.data);
        let data = response?.data?.users;
        let empData = data.filter((x)=>{return x?.role == "EMPLOYEE"}) || [];
        let totalSalary = empData.reduce((acc,curr)=>{return acc+curr?.salary},0)
        // console.log(empData.length);
        handleCount(empData.length,"EmployeeCount");
        handleCount(totalSalary,"TotalEmployeeSalary")
      }

    } catch (error) {
      console.log(error?.response?.data);
    }
  }

  const fetchDepartmentData = async() => {
    try {
      const response = await Instance.get("/department",{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.status == 200) {
        // console.log("dep",response?.data); 
        let data = response?.data?.departments;
        // console.log(data.length);
        handleCount(data.length,"DepartmentCount");
      }

    } catch (error) {
      console.log(error?.response?.data);
    }
  }

  const fetchLeaveData = async() => {
    try {
      const response = await Instance.get("/leave",{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.status == 200) {
        // console.log("dep",response?.data); 
        let data = response?.data?.leaves;
        let pending = data.filter((x)=>{return x?.action == "Pending"}) || [];
        let approved = data.filter((x)=>{return x?.action == "Approved"}) || [];
        let rejected = data.filter((x)=>{return x?.action == "Rejected"}) || [];


        // console.log(data.length);
        handleCount(data.length,"LeaveCount");
        handleCount(pending.length,"PendingLeaveCount"); 
        handleCount(approved.length,"ApprovedLeaveCount"); 
        handleCount(rejected.length,"RejectedLeaveCount"); 
      }

    } catch (error) {
      console.log(error?.response?.data);
    }
  }

  useEffect(()=>{
    fetchEmployeeData();
    fetchDepartmentData();
    fetchLeaveData();
  },[])

  return (
    <div>
        <h3 className='dashboardTitle'>Welcome to Dashboard, admin</h3>
        <div className='dashboardLayout'>
          <div className='dashboardSubLayout'>
            <h3 className='dashboardSubTitle'>Dashboard Overview</h3>
            <div className='card-list'>
              <div className='card bg-blue-600'>
                <div className='minicard'>
                  <div className='minisubcard'>
                    <div className='card-text'>
                      <h6>Total Employee</h6>
                      <h3>{countData?.EmployeeCount || 0}</h3>
                    </div>
                    <div className='card-icon bg-blue-600'>
                      <GroupsOutlinedIcon fontSize='inherit'/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card bg-green-600'>
                <div className='minicard'>
                  <div className='minisubcard'>
                    <div className='card-text'>
                      <h6>Total Departments</h6>
                      <h3>{countData?.DepartmentCount || 0}</h3>
                    </div>
                    <div className='card-icon bg-green-600'>
                      <ApartmentIcon fontSize='inherit'/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card bg-purple-600'>
                <div className='minicard'>
                  <div className='minisubcard'>
                    <div className='card-text'>
                      <h6>Monthly Salary</h6>
                      <h3>${countData?.TotalEmployeeSalary || 0}</h3>
                    </div>
                    <div className='card-icon bg-purple-600'>
                      <PaymentsIcon fontSize='inherit'/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='dashboardSubLayout'>
            <h3 className='dashboardSubTitle'>Leave Details</h3>
            <div className='card-list'>
              <div className='card bg-orange-600'>
                <div className='minicard'>
                  <div className='minisubcard'>
                    <div className='card-text'>
                      <h6>Leave Applied</h6>
                      <h3>{countData?.LeaveCount || 0}</h3>
                    </div>
                    <div className='card-icon bg-orange-600'>
                      <SummarizeIcon fontSize='inherit'/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card bg-green-600'>
                <div className='minicard'>
                  <div className='minisubcard'>
                    <div className='card-text'>
                      <h6>Leave Approved</h6>
                      <h3>{countData?.ApprovedLeaveCount || 0}</h3>
                    </div>
                    <div className='card-icon bg-green-600'>
                      <CheckCircleIcon fontSize='inherit'/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card bg-yellow-600'>
                <div className='minicard'>
                  <div className='minisubcard'>
                    <div className='card-text'>
                      <h6>Leave Pending</h6>
                      <h3>{countData?.PendingLeaveCount || 0}</h3>
                    </div>
                    <div className='card-icon bg-yellow-600'>
                      <HourglassEmptyIcon fontSize='inherit'/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card bg-red-600'>
                <div className='minicard'>
                  <div className='minisubcard'>
                    <div className='card-text'>
                      <h6>Leave Rejected</h6>
                      <h3>{countData?.RejectedLeaveCount || 0}</h3>
                    </div>
                    <div className='card-icon bg-red-600' >
                      <CancelIcon fontSize='inherit'/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
