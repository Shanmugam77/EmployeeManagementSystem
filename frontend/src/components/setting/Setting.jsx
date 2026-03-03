import "./setting.css";
import LockIcon from '@mui/icons-material/Lock';
import { Input,Button } from 'antd';
import { useState } from "react";
import { showErrorAlert, showSuccessAlert } from "../../globalConstant";
import Instance from "../../Axiosconfig";


const Setting = () => {
    let [passwordData,setPasswordData] = useState({});

    let handleFieldChange = (e,fieldName) => {
        setPasswordData((prev)=>{
            return{
                ...prev,
                [fieldName]:e?.target?.value
            }
        })
    }

    let handleSubmit = async() => {
        try {
            // console.log(passwordData);
            if (!passwordData?.currentPassword) return showErrorAlert("Current password is required");
            if (!passwordData?.newPassword || passwordData.newPassword.length < 6) return showErrorAlert("New Password must be at least 6 characters long");
            if (!passwordData?.confirmNewPassword || passwordData?.newPassword !== passwordData?.confirmNewPassword) return showErrorAlert("New password & Confirm new password must be same");
            // console.log(passwordData);
            let loginUserData =JSON.parse(localStorage.getItem("loginUserData"));

            let payLoad = passwordData;
            const response = await Instance.put(`/user/changePassword/${loginUserData?.userId}`,payLoad,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status == 200) {
                setPasswordData({})
                showSuccessAlert(response?.data?.message);
            }   
        } catch (error) {
            console.log(error?.response?.data);
            showErrorAlert(error?.response?.data?.message)
        }

    };
    return(
        <div className="setting-outB">
            <div className="setting-inB">
                <h2 className="setting-title">MANAGE SETTINGS</h2>
                <p className="setting-subtitle">Manage your account settings and security</p>
                <div className="settingcard">
                    <div className="settingcardHead">
                        <div className="cardHeadsub">
                            <div className="Scard-icon">
                                <LockIcon fontSize="inherit"/>
                            </div>
                            <div className="Scard-Htext">
                                <h3>Change Password</h3>
                                <p>Update your account password for better security</p>
                            </div>
                        </div>
                    </div>
                    <div className="settingcardBody">
                        <div>
                            <h5>Current Password</h5>
                            <Input.Password className="inpas" placeholder="Enter your current password" onChange={(e)=>{handleFieldChange(e,"currentPassword")}} value={passwordData?.currentPassword || ''}/>
                        </div>
                        <div>
                            <h5>New Password</h5>
                            <Input.Password className="inpas" placeholder="Enter your new password" onChange={(e)=>{handleFieldChange(e,"newPassword")}} value={passwordData?.newPassword || ''}/>
                            <p>Password must be at least 6 characters long</p>
                        </div>
                        <div>
                            <h5>Confirm New Password</h5>
                            <Input.Password className="inpas" placeholder="Confirm your new password" onChange={(e)=>{handleFieldChange(e,"confirmNewPassword")}} value={passwordData?.confirmNewPassword || ''}/>
                        </div>
                        <div style={{height:'70px'}}>
                            <Button  className="Sbutton" onClick={handleSubmit}> <LockIcon/> Change Password</Button>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}
export default Setting;