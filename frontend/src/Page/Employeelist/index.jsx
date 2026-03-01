import React from 'react'
import Sidebar from '../../Layout/Header/sidebar'
import Header from '../../Layout/Header/Header'
import EmployeeList from '../../components/employee/EmployeeList'

const EmployeelistPage = () => {
  return (
    <div>
      <Sidebar/>
      <Header/>
      <div className="main-wrapper">
        <EmployeeList/>
      </div>
    </div>
  )
}

export default EmployeelistPage;
