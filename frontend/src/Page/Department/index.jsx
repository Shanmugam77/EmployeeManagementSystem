import React from "react";
import Sidebar from "../../Layout/Header/sidebar";
import Header from "../../Layout/Header/Header";

const DepartmentPage = () => {
    return(
        <div>
            <Sidebar/>
            <Header/>
            <div className="main-wrapper">
                Department page
            </div>

        </div>
    )
}

export default DepartmentPage;