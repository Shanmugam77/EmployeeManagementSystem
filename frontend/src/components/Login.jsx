import {TextField,FormControl,Button} from "@mui/material"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import React from "react";
import { Input } from 'antd';
import { showErrorAlert } from "../globalConstant";
import Instance from "../Axiosconfig";
import { useAuth } from "../context/AuthContext";

const Login=()=>{
    const { login } = useAuth();
    let navigate=useNavigate()
    let [email,setEmail] = useState(localStorage.getItem("remEmail") ? localStorage.getItem("remEmail") : "");
    let [password,setPassword] = useState(localStorage.getItem("remPassword") ? localStorage.getItem("remPassword") : "");
    let [rememberPassword,setRememberPassword] = useState(localStorage.getItem("remFlag")?true:false);


    let handleSubmit = async()=>{
        try {
            if (!email || email.trim() === "") {
                showErrorAlert("Please Enter Email");
                return;
            }
            if (!password || password.trim() === "") {
                showErrorAlert("Please Enter Password");
                return;
            }
            let payload = {email,password};
            const response = await Instance.post("/auth/login",payload);
            if (response.status === 200) {
                if (rememberPassword) {
                    localStorage.setItem("remFlag",true)
                    localStorage.setItem("remEmail",email);
                    localStorage.setItem("remPassword",password);
                }else{
                    localStorage.removeItem("remFlag")
                    localStorage.removeItem("remEmail")
                    localStorage.removeItem("remPassword")  
                }
                // console.log(response.data.responseData);
                
                login(response.data.responseData);
                if (response.data.responseData.role !== "EMPLOYEE") {
                  navigate("/dashboard");
                } else {
                  navigate("/employee-dashboard");
                }
                        
            }
        } catch (error) {
            console.error(error);
            showErrorAlert(error?.response?.data?.message || "An error occurred. Please try again later.");  
        }
    }

    return(
        <section className="h-[100vh] w-[100%] flex flex-col justify-center items-center">
            <FormControl className="h-[50vh] w-[40vh] rounded-[10px] p-3 shadow-sm shadow-black flex flex-col justify-evenly items-center">
                <h1>Login Page</h1>
                <Input 
                  placeholder="Enter Email"  
                  size="large" 
                  style={{width:"90%"}} 
                  onChange={(e)=>{
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
                <Input.Password 
                  placeholder="Enter password"  
                  size="large" 
                  style={{width:"90%"}}
                  onChange={(e)=>{
                    setPassword(e.target.value)
                  }}
                  value={password}
                />
                <div className="w-[90%] h-auto flex justify-center items-center gap-3">
                    <input className="mt-1" type="checkbox" checked={rememberPassword} onChange={(e)=>{setRememberPassword(e?.target?.checked)}} />
                    <h2>Remember Password</h2>
                </div>

                <Button onClick={handleSubmit} variant="contained">Sign In</Button>
            </FormControl>

        </section>
    )
}
export default Login