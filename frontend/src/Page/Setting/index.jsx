import React from "react";
import Sidebar from "../../Layout/Header/sidebar";
import Header from "../../Layout/Header/Header";
import Setting from "../../components/setting/Setting";

const SettingPage = () => {
    return(
        <div>
            <Sidebar/>
            <Header/>
            <div className="main-wrapper" style={{padding:0}}>
                <Setting/>
            </div>

        </div>
    )
}

export default SettingPage;