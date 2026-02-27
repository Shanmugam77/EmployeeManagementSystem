import React from 'react'
import Sidebar from '../../Layout/Header/sidebar'
import Header from '../../Layout/Header/Header'
import TeacherLists from '../../components/teacher/TeacherList'

const EmployeelistPage = () => {
  return (
    <div>
      <Sidebar/>
      <Header/>
      <div className="main-wrapper">
        <TeacherLists/>
      </div>
    </div>
  )
}

export default EmployeelistPage;
