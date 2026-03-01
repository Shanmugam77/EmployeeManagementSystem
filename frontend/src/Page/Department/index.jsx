import React from "react";
import Sidebar from "../../Layout/Header/sidebar";
import Header from "../../Layout/Header/Header";
import DepartmentList from "../../components/department/Department";

const DepartmentPage = () => {
    return(
        <div>
            <Sidebar/>
            <Header/>
            <div className="main-wrapper">
                <DepartmentList/>
            </div>

        </div>
    )
}

export default DepartmentPage;