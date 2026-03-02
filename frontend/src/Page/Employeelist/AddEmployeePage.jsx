import React from 'react'
import Sidebar from '../../Layout/Header/sidebar'
import Header from '../../Layout/Header/Header'
import AddEmployee from '../../components/employee/AddEmployee'

const AddEmployeePage = () => {
  return (
    <div>
      <Sidebar/>
      <Header/>
      <div className="main-wrapper">
        <AddEmployee/>
      </div>
    </div>
  )
}

export default AddEmployeePage;