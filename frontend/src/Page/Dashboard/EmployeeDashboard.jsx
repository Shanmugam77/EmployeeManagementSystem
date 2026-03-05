import React from 'react'
import Sidebar from '../../Layout/sidebar'
import Header from '../../Layout/Header'
import EmployeeDashboard from '../../components/dashboard/EmployeeDashboard'

const EmployeeDashboardPage = () => {
  return (
    <div>
      <Sidebar/>
      <Header/>
      <div className="main-wrapper">
        <EmployeeDashboard/>
      </div>
    </div>
  )
}

export default EmployeeDashboardPage;