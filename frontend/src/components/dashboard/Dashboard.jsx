import React from 'react'
import "./dashboard.css";
import { Carousel } from 'antd';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PaymentsIcon from '@mui/icons-material/Payments';
import SummarizeIcon from '@mui/icons-material/Summarize';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';

const Dashboard = () => {
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
                      <h3>3</h3>
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
                      <h3>4</h3>
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
                      <h3>$60000</h3>
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
                      <h3>0</h3>
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
                      <h3>0</h3>
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
                      <h3>0</h3>
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
                      <h3>0</h3>
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
