import React from 'react'
import Sidebar from '../../Layout/sidebar'
import Header from '../../Layout/Header'
import EditEmployee from '../../components/employee/EditEmployee'

const EditEmployeePage = () => {
  return (
    <div>
      <Sidebar/>
      <Header/>
      <div className="main-wrapper">
        <EditEmployee/>
      </div>
    </div>
  )
}

export default EditEmployeePage;