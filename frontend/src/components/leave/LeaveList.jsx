import './leave.css';
import { useEffect, useState } from 'react'
import { Table, Input } from 'antd'
import {
    SearchOutlined,
    FilterOutlined,
    EditOutlined,
    DeleteOutlined
  } from "@ant-design/icons";
import Instance from '../../Axiosconfig';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { showSuccessAlert } from '../../globalConstant';

const LeaveList = () => {
    const [userData,setuserData] = useState([]);
    let [departmentData,setDepartmentData] = useState([]);
    const navigate = useNavigate();
    let [pageRefresher,setPageRefresher] = useState(false)

    // const fetchuserData = async()=>{
    //   try {
    //     const response = await Instance.get("/user",{
    //         headers:{
    //             Authorization:`Bearer ${localStorage.getItem("token")}`
    //         }
    //     })
    //     if (response.status == 200) {
    //         let users = response?.data?.users || [];
    //         // setuserData(users);
    //         let loginUserData =JSON.parse(localStorage.getItem("loginUserData"));
    //         // console.log(loginUserData?.userRole);
    //         if (loginUserData?.userRole == "SUPER-ADMIN") {
    //           users = users?.filter(x => x?.role !== "SUPER-ADMIN");
    //           setuserData(users);
    //         }else{
    //           users = users?.filter(x => x?.role !== "ADMIN" && x?.role !== "SUPER-ADMIN");
    //           setuserData(users);
    //         }
            
            
    //     }    
    //   } catch (error) {
    //       console.log(error?.response?.data);
    //   }
    // }

    // const fetchDepartment = async() => {
    //   try {
    //     const response = await Instance.get("/department",{
    //       headers:{
    //         Authorization:`Bearer ${localStorage.getItem("token")}`
    //       }
    //     })
    //     if (response.status == 200) {
    //       // console.log(response?.data?.departments);
    //       const departments = response?.data?.departments ||[];
    //       setDepartmentData(departments)
    //     }
    //   } catch (error) {
    //     console.log(error?.response?.data);
        
    //   }
    // }

    // useEffect(()=>{
    //    fetchuserData()
    //    fetchDepartment()
    // },[pageRefresher])

    // const displayDepName = (id) => {
    //   if (!id || !departmentData?.length) return "";
    
    //   const result = departmentData.find(
    //     (x) => x?._id?.toString() === id?.toString()
    //   );
    //   return result?.departmentName || "";
    // };



    const columns = [
        {
          title: "Employee Info",
          render: (text, item) => (
            <div>
              {item?.empId || 'N/A'}
            </div>
          ),
        //   sorter: (a, b) => a?.firstName.localeCompare(b?.firstName),
        },
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
          title: "From Data",
          dataIndex: "fromDate",
          render: (text, item) => {
            return new Date(item?.fromDate).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
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
          title: "Action",
          dataIndex: "action",
          render: (_, record) => (
            <DeleteOutlined
              key={`delete-${record._id}`}
              className="delete-button-table"
            //   onClick={() => {
            //     Swal.fire({
            //       title: "Are you sure",
            //       text: "You want to Delete?",
            //       showCancelButton: true,
            //       confirmButtonColor: "#008BA6",
            //       cancelButtonColor: "#D1D1D1",
            //       confirmButtonText: "Yes, Delete!"
            //     }).then((result) => {
            //       if (result.isConfirmed) {
            //         handleDelete(record._id)
            //       }
            //     })
            //   }}
            />
          ),
        },
      ];
  return (
    <div>
      <div className='main-title-all'>
        <span>LEAVE REQUESTED LIST</span>
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
            // dataSource={userData}
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

export default LeaveList;

