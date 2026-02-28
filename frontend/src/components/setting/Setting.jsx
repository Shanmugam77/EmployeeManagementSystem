import "./setting.css";
import LockIcon from '@mui/icons-material/Lock';
import { Input,Button } from 'antd';


const Setting = () => {
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
                            <Input.Password className="inpas" placeholder="Enter your current password" />
                        </div>
                        <div>
                            <h5>New Password</h5>
                            <Input.Password className="inpas" placeholder="Enter your new password" />
                            <p>Password must be at least 6 characters long</p>
                        </div>
                        <div>
                            <h5>Confirm New Password</h5>
                            <Input.Password className="inpas" placeholder="Confirm your new password" />
                        </div>
                        <div style={{height:'70px'}}>
                            <Button  className="Sbutton" block> <LockIcon/> Change Password</Button>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}
export default Setting;