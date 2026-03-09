import { useState } from "react";
import "./leave.css"
import { Input,Select,DatePicker } from 'antd';
import Instance from "../../Axiosconfig";
import { showErrorAlert, showSuccessAlert } from "../../globalConstant";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const RequestLeave = () => {
    const [reqData,setReqData] = useState({});
    const navigate = useNavigate();

    const handleFieldChange = (e,fieldName) => {
        let value = e?.target?.value;
        if (fieldName == "fromDate" || fieldName == "toDate" || fieldName == "resumeDate") {
            value = e;
            // value = e.toDate();
            // console.log(value);  
        }
        if (fieldName == "leaveType") {
             value = e;
        }
        setReqData((prev)=>{
            return{
                ...prev,
                [fieldName]:value
            }
        })
    };

    const handleSubmit = async() => {
        try {
            // console.log("sun",reqData);
            let payload = reqData;
            payload.fromDate = reqData?.fromDate?.toDate();
            payload.toDate = reqData?.toDate?.toDate(); 
            payload.resumeDate = reqData?.resumeDate?.toDate(); 
            // console.log(payload);
            
            const response = await Instance.post("/leave",payload,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status == 201) {
                console.log(response);
                setReqData({});
                showSuccessAlert(response?.data?.message);
                navigate("/userleaves")
            }
            
        } catch (error) { 
            console.log(error?.response?.data);
            showErrorAlert(error?.response?.data?.message)
        }
    };

    return(
        <div className="flex items-center justify-center">
           <div className="outerbox">
            <h3 className="reqleavetitle">Request for Leave</h3>
            <p className="reqleavesubtitle">Submit your leave request for approval</p>
            <div className="reqcardframe">
                <div className="reqleavetypebody">
                    <h3>Leave Type</h3>
                    <Select
                      variant='filled'
                      className="inp"
                      placeholder="Select Leave Type"
                      value={reqData?.leaveType || null}
                      onChange={(e)=>{handleFieldChange(e,"leaveType")}}
                      options={[
                        { label: 'Casual Leave', value: 'Casual Leave' },
                        { label: 'Sick Leave', value: 'Sick Leave' },
                      ]}
                    />
                </div>
                <div className="reqdatebody">
                    <div>
                        <h3>From Date</h3>
                        <DatePicker
                          variant='filled' 
                          placeholder='Select From Date'
                          className='reqleavedobinput'
                          value={reqData?.fromDate || ''}
                          onChange={(e)=>{handleFieldChange(e,"fromDate")}}
                        />
                    </div>
                    <div>
                        <h3>To Date</h3>
                        <DatePicker
                          variant='filled' 
                          placeholder='Select From Date'
                          className='reqleavedobinput'
                          value={reqData?.toDate || ''}
                          onChange={(e)=>{handleFieldChange(e,"toDate")}}
                        />
                    </div>
                    <div>
                        <h3>Resume Date</h3>
                        <DatePicker
                          variant='filled' 
                          placeholder='Select From Date'
                          className='reqleavedobinput'
                          value={reqData?.resumeDate || ''}
                          onChange={(e)=>{handleFieldChange(e,"resumeDate")}}
                        />
                    </div>
                </div>
                <div className="reqleavedescription">
                    <h3>Description</h3>
                    <TextArea 
                      rows={7} 
                      placeholder="Enter Description..." 
                      variant="filled" 
                      value={reqData?.description || ''}
                      onChange={(e)=>{handleFieldChange(e,"description")}}
                    //   className="reqleavedesinp"
                    />
                </div>
                <div className="reqleavesubmit">
                    <button onClick={handleSubmit}>
                        Submit Leave Request
                    </button>
                </div>


            </div>

           </div> 
        </div>
    )
}

export default RequestLeave;