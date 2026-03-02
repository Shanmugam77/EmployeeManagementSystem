import { Input,Select,DatePicker } from 'antd';
import './employee.css';
import { useState } from 'react';
import Instance from '../../Axiosconfig';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { showErrorAlert, showSuccessAlert } from '../../globalConstant';
import dayjs from "dayjs";

const EditEmployee = () => {
    const editUserId = useParams();
    const navigate = useNavigate();
    let [depData,setDepData] = useState([]);
    let [empData,setEmpData] = useState({});

    let handleFieldChange = (e,fieldName) => {
        // console.log(e?.target?.value,e);
        
        let value = e?.target?.value;
        if (fieldName == "profileImg") {
           const file = e.target.files[0];
           if (!file) return;
         
           // Optional validation
           if (!file.type.startsWith("image/")) {
             showErrorAlert("Only image files allowed")
             return;
           }
         
           const reader = new FileReader();
         
           reader.onload = () => {
             setEmpData((prev) => ({
               ...prev,
               [fieldName]: reader.result, //Base64 string
             }));
           };
         
           reader.onerror = (err) => {
             console.error("Image conversion error", err);
           };
         
           reader.readAsDataURL(file);
           return
        }
        if (fieldName == "dob") {
            value = e;
            console.log(value);
            if (!value) return;
            // value = e?.toDate();
            // console.log(value);  
        }
        if (fieldName == "gender" || fieldName == "maritalStatus" || fieldName == "role"|| fieldName == "department" ) {
             value = e;
        }
        setEmpData((prev)=>{
            return{
                ...prev,
                [fieldName]:value
            }
        });
    };

    let handleUpdateEmp = async() => {
        try {
            // console.log("before",empData);
            let payload = empData;
            payload.dob = payload?.dob?.toDate();
            // console.log(payload);
            
            const response = await Instance.put(`/user/${editUserId.id}`, payload,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status = 200) {
                navigate("/employeelist");
                showSuccessAlert(response?.data?.message);
            }
        } catch (error) {
           console.log(error);
           showErrorAlert(error?.response?.data?.message)  
        }
    }


    let fetchDepData = async() => {
       try {
        const response = await Instance.get("/department",{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        if (response.status == 200) {
          // console.log(response?.data?.departments);
          const departments = response?.data?.departments ||[];
          let options = departments.map((x)=>{return{label: x?.departmentName, value: x?._id}})
          setDepData(options)
        }
      } catch (error) {
        console.log(error?.response?.data); 
      }
    };

    let fetchEditUserData = async() => {
        try {
            const response = await Instance.get(`/user/${editUserId.id}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status == 200) {
                // console.log(response?.data?.user);
                let result = response?.data?.user;
                result.dob = dayjs(result.dob);
                setEmpData(result);    
            }
        } catch (error) {
            console.log(error);
            showErrorAlert(error?.response?.data?.message)
        }
    }

    useEffect(()=>{
        // console.log(editUserId);
        fetchEditUserData();
        fetchDepData();
    },[])
    return(
        <div>
            <h3 className='addEmployeeTitle'>EDIT EMPLOYEE PROFILE</h3>
            <div className='addemployout'>
                <div className='addempformlayout'>
                    <table>
                        <tr>
                            <td>
                                <h3>First Name</h3>
                                <Input className="inp" placeholder="Enter First Name" variant="filled"  onChange={(e)=>{handleFieldChange(e,"firstName")}} value={empData?.firstName || ""}/>

                            </td>
                            <td>
                                <h3>E-mail</h3>
                                <Input className="inp" type='email' placeholder="Enter E-mail" variant="filled" onChange={(e)=>{handleFieldChange(e,"email")}}  value={empData?.email || ""}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Last Name</h3>
                                <Input className="inp" placeholder="Enter Last Name" variant="filled" onChange={(e)=>{handleFieldChange(e,"lastName")}}  value={empData?.lastName || ""}/>
                            </td>
                             <td>
                                <h3>Password</h3>
                                <Input.Password className="inp" placeholder="Enter Password" variant="filled" onChange={(e)=>{handleFieldChange(e,"password")}} disabled value={empData?.password || ""}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Gender</h3>
                                <Select
                                  variant='filled'
                                  className="inp"
                                  placeholder="select Gender"
                                  value={empData?.gender}
                                //   defaultValue={'male'}
                                  onChange={(e)=>{handleFieldChange(e,"gender")}}
                                  options={[
                                    { label: 'Male', value: 'Male' },
                                    { label: 'Female', value: 'Female' },
                                    { label: 'Other', value: 'Other' },
                                  ]}
                                />
                            </td>
                            <td>
                                <h3>Role</h3>
                                <Select
                                  variant='filled'
                                  className="inp"
                                  placeholder="Select Role"
                                  value={empData?.role || ""}
                                //   defaultValue={'Employee'}
                                  onChange={(e)=>{handleFieldChange(e,"role")}}
                                  options={[
                                    { label: 'Admin', value: 'ADMIN' },
                                    { label: 'Employee', value: 'EMPLOYEE' },
                                  ]}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>DOB</h3>
                                <DatePicker
                                  variant='filled' 
                                  placeholder='Select DOB'
                                  className='dobinput'
                                  value={empData?.dob}
                                //   disabled
                                  onChange={(e)=>{handleFieldChange(e,"dob")}}
                                />
                            </td>
                            <td>
                                <h3>Department</h3>
                                <Select
                                  variant='filled'
                                  className="inp"
                                  placeholder="Select Department"
                                  value={empData?.department}
                                //   defaultValue={'Unmarried'}
                                  onChange={(e)=>{handleFieldChange(e,"department")}}
                                  options={depData}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Marital Status</h3>
                                <Select
                                  variant='filled'
                                  className="inp"
                                  placeholder="Select Marital Status"
                                  value={empData?.maritalStatus}
                                //   defaultValue={'Unmarried'}
                                  onChange={(e)=>{handleFieldChange(e,"maritalStatus")}}
                                  options={[
                                    { label: 'Married', value: 'Married' },
                                    { label: 'Un-Married', value: 'Unmarried' },
                                  ]}
                                />
                            </td>
                            <td>
                                <h3>Designation</h3>
                                <Input className="inp" placeholder="Enter Designation" variant="filled" onChange={(e)=>{handleFieldChange(e,"designation")}} value={empData?.designation || ""} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Profile Image</h3>
                                <Input disabled className="inp" type='file'  variant="filled" onChange={(e)=>{handleFieldChange(e,"profileImg")}} />
                            </td>
                            <td>
                                <h3>Salary</h3>
                                <Input className="inp" type='Number' placeholder="Enter Salary" variant="filled" onChange={(e)=>{handleFieldChange(e,"salary")}} value={empData?.salary || null} />
                            </td>
                        </tr>
                    </table>
                    <div className='addempbuttonlayout'>
                        <button className='addempbutton' onClick={handleUpdateEmp}>UPDATE USER</button>
                        <button className='addempbutton' onClick={()=>{navigate(-1)}}>CANCLE</button>
                    </div>

                </div>

            </div>


        </div>
    )
}
export default EditEmployee;