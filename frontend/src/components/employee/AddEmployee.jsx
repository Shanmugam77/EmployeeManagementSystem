import { Input,Select,DatePicker } from 'antd';
import './employee.css';
import { useState } from 'react';
import Instance from '../../Axiosconfig';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showErrorAlert, showSuccessAlert } from '../../globalConstant';

const AddEmployee = () => {

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
            value = e.toDate();
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

    let handleAddEmp = async() => {
        try {
            // console.log(empData);
            const payload = empData;
            const response = await Instance.post("/user",payload,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status = 201) {
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

    useEffect(()=>{
        fetchDepData();
    },[])
    return(
        <div>
            <h3 className='addEmployeeTitle'>CREATE EMPLOYEE PROFILE</h3>
            <div className='addemployout'>
                <div className='addempformlayout'>
                    <table>
                        <tr>
                            <td>
                                <h3>First Name</h3>
                                <Input className="inp" placeholder="Enter First Name" variant="filled"  onChange={(e)=>{handleFieldChange(e,"firstName")}}/>

                            </td>
                            <td>
                                <h3>E-mail</h3>
                                <Input className="inp" type='email' placeholder="Enter E-mail" variant="filled" onChange={(e)=>{handleFieldChange(e,"email")}}  />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Last Name</h3>
                                <Input className="inp" placeholder="Enter Last Name" variant="filled" onChange={(e)=>{handleFieldChange(e,"lastName")}}  />
                            </td>
                             <td>
                                <h3>Password</h3>
                                <Input.Password className="inp" placeholder="Enter Password" variant="filled" onChange={(e)=>{handleFieldChange(e,"password")}} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Gender</h3>
                                <Select
                                  variant='filled'
                                  className="inp"
                                  placeholder="select Gender"
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
                                  onChange={(e)=>{handleFieldChange(e,"dob")}}
                                />
                            </td>
                            <td>
                                <h3>Department</h3>
                                <Select
                                  variant='filled'
                                  className="inp"
                                  placeholder="Select Department"
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
                                <Input className="inp" placeholder="Enter Designation" variant="filled" onChange={(e)=>{handleFieldChange(e,"designation")}}  />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Profile Image</h3>
                                <Input disabled className="inp" type='file'  variant="filled" onChange={(e)=>{handleFieldChange(e,"profileImg")}} />
                            </td>
                            <td>
                                <h3>Salary</h3>
                                <Input className="inp" type='Number' placeholder="Enter Salary" variant="filled" onChange={(e)=>{handleFieldChange(e,"salary")}} />
                            </td>
                        </tr>
                    </table>
                    <div className='addempbuttonlayout'>
                        <button className='addempbutton' onClick={handleAddEmp}>ADD USER</button>
                        <button className='addempbutton' onClick={()=>{navigate(-1)}}>CANCLE</button>
                    </div>

                </div>

            </div>


        </div>
    )
}
export default AddEmployee;