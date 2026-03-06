import "./leave.css"
import { Input,Select,DatePicker } from 'antd';
const { TextArea } = Input;

const RequestLeave = () => {
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
                    //   onChange={(e)=>{handleFieldChange(e,"leaveType")}}
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
                        //   onChange={(e)=>{handleFieldChange(e,"dob")}}
                        />
                    </div>
                    <div>
                        <h3>To Date</h3>
                        <DatePicker
                          variant='filled' 
                          placeholder='Select From Date'
                          className='reqleavedobinput'
                        //   onChange={(e)=>{handleFieldChange(e,"dob")}}
                        />
                    </div>
                    <div>
                        <h3>Resume Date</h3>
                        <DatePicker
                          variant='filled' 
                          placeholder='Select From Date'
                          className='reqleavedobinput'
                        //   onChange={(e)=>{handleFieldChange(e,"dob")}}
                        />
                    </div>
                </div>
                <div className="reqleavedescription">
                    <h3>Description</h3>
                    <TextArea 
                      rows={7} 
                      placeholder="Enter Description..." 
                      variant="filled"  
                    //   className="reqleavedesinp"
                    />
                </div>
                <div className="reqleavesubmit">
                    <button >
                        Submit Leave Request
                    </button>
                </div>


            </div>

           </div> 
        </div>
    )
}

export default RequestLeave;