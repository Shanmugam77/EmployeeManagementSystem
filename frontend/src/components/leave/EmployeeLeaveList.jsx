import './leave.css';
import { useEffect, useState } from 'react'
import { Table, Input } from 'antd'
import {SearchOutlined} from "@ant-design/icons";
import Instance from '../../Axiosconfig';
import Swal from "sweetalert2";
import { showErrorAlert, showSuccessAlert } from '../../globalConstant';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EmployeeLeaveList = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [leaveData,setLeaveData] = useState([]);
    let [pageRefresher,setPageRefresher] = useState(false)

    const fetchLeaveData = async()=>{
      try {
        const response = await Instance.get(`/leave/${user?.userId}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        if (response.status == 200) {
            let leaves = response?.data?.leaves || [];
            console.log(response?.data?.leaves);
            
            // leaves = leaves?.filter(x => x?.action == "Pending");
            setLeaveData(leaves); 
        }    
      } catch (error) {
          console.log(error?.response?.data);
      }
    }


    useEffect(()=>{
       fetchLeaveData();
    },[pageRefresher])


    const handleAction = async(id,value) => {
      try {
        let payload = {action:value};
        const response = await Instance.put(`/leave/${id}`,payload,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.status == 200) {
          setPageRefresher(!pageRefresher);
          showSuccessAlert(response?.data?.message);
        }
      } catch (error) {
        console.log(error?.response?.data);
        showErrorAlert(error?.response?.data?.message)
      }
    }

    
    const columns = [
        {
          title: "Leave Type",
          render: (text, item) => (
            <div>
              {item?.leaveType || 'N/A'}
            </div>
          ),
          // sorter: (a, b) => a?.email.localeCompare(b?.email),
        },
        {
          title: "Description",
          render: (text, item) => (
            <div>
              {item?.description || 'N/A'}
            </div>
          ),
        },
        {
          title: "From Date - To Date",
          dataIndex: "fromDate",
          render: (text, item) => {
            return `${new Date(item?.fromDate).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })} - ${new Date(item?.toDate).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}` ;
          },
        },
        {
          title: "Resume Date",
          dataIndex: "resumeDate",
          render: (text, item) => {
            return new Date(item?.resumeDate).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
          },
        },
        {
          title: "Requested Date",
          dataIndex: "createdAt",
          // sorter: (a, b) => new Date(a.dob) - new Date(b.dob),
          render: (text, item) => {
            return new Date(item?.createdAt).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
          },
        },
        {
          title: "Status",
          render: (text, item) => (
            <div className={`text-red-200 ${item?.action == 'Pending' ?('text-yellow-400'):(item?.action =="Approved"?"text-green-400":"text-red-400")}`}>
              {item?.action || 'N/A'}
            </div>
          ),
        },
        // {
        //   title: "Action",
        //   dataIndex: "action",
        //   render: (_, record) => (
        //     <div className='actionButtons'>
        //       <button 
        //         className='bg-red-500'
        //         onClick={() => {
        //         Swal.fire({
        //             title: "Are you sure",
        //             text: "You want to Delete?",
        //             showCancelButton: true,
        //             confirmButtonColor: "#008BA6",
        //             cancelButtonColor: "#D1D1D1",
        //             confirmButtonText: "Yes, Delete!"
        //           }).then((result) => {
        //             if (result.isConfirmed) {
        //               // handleAction(record._id,"Rejected")
        //             }
        //           })
        //         }}
        //       >
        //         Delete
        //       </button>
        //     </div>
        //   ),
        // },
      ];
  return (
    <div>
      <div className='main-title-all'>
        <span>LEAVE REQUESTED LIST</span>
         <button 
         onClick={()=>{navigate("/requestleave")}}
         >
            Add-Leave
        </button>
      </div>
      <div className='admin-list-section'>
           <div className="search-table-container">
            <Input
              placeholder="Search..."
            //   value={fileterParameters?.searchText}
            //   onChange={(e) => {
            //     let newData = { ...fileterParameters };
            //     newData['searchText'] = e.target.value;
            //     setFilterParameters(newData);
            //   }}
              className="search-input-table"
              prefix={<SearchOutlined />}
            />
            </div>
      </div>
      <div className="table-list">
          <Table
            columns={columns}
            dataSource={leaveData}
            rowKey={(data) => data._id}
            
            // rowSelection={{
            //   type: 'checkbox',
            //   onChange: (selectedRowKeys, selectedRows) => {
            //     setFilterParameters(prevData => ({
            //       ...prevData,
            //       ['selectedRows']: selectedRowKeys
            //     }));
            //   },
            // }}
          />
        </div>
    </div>
  )
}

export default EmployeeLeaveList;

