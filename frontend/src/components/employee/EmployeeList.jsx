import './employee.css';
import React, { useEffect, useState } from 'react'
import { Button, Table, Input } from 'antd'
import {
    SearchOutlined,
    FilterOutlined,
    EditOutlined,
    DeleteOutlined
  } from "@ant-design/icons";
import Instance from '../../Axiosconfig';
import { json, useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [userData,setuserData] = useState([]);
    let [departmentData,setDepartmentData] = useState([]);
    const navigate = useNavigate();

    const fetchuserData = async()=>{
      try {
        const response = await Instance.get("/user",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        if (response.status == 200) {
            let users = response?.data?.users || [];
            // setuserData(users);
            let loginUserData =JSON.parse(localStorage.getItem("loginUserData"));
            console.log(loginUserData?.userRole);
            if (loginUserData?.userRole == "SUPER-ADMIN") {
              users = users?.filter(x => x?.role !== "SUPER-ADMIN");
              setuserData(users);
            }else{
              users = users?.filter(x => x?.role !== "ADMIN" && x?.role !== "SUPER-ADMIN");
              setuserData(users);
            }
            
            
        }    
      } catch (error) {
          console.log(error?.response?.data);
      }
    }

    const fetchDepartment = async() => {
      try {
        const response = await Instance.get("/department",{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        if (response.status == 200) {
          // console.log(response?.data?.departments);
          const departments = response?.data?.departments ||[];
          setDepartmentData(departments)
        }
      } catch (error) {
        console.log(error?.response?.data);
        
      }
    }

    useEffect(()=>{
       fetchuserData()
       fetchDepartment()
    },[])

    const displayDepName = (id) => {
      if (!id || !departmentData?.length) return "";
    
      const result = departmentData.find(
        (x) => x?._id?.toString() === id?.toString()
      );
      return result?.departmentName || "";
    };


    const columns = [
        {
          title: "Name",
          render: (text, item) => (
            <div>
              {item?.firstName +' '+item?.lastName || 'N/A'}
            </div>
          ),
          sorter: (a, b) => a?.firstName.localeCompare(b?.firstName),
        },
        {
            title: "Email",
            render: (text, item) => (
              <div>
                {item?.email || 'N/A'}
              </div>
            ),
            sorter: (a, b) => a?.email.localeCompare(b?.email),
          },
           {
          title: "Department",
          render: (text, item) => (
            <div>
              {displayDepName(item?.department) || 'N/A'}
            </div>
          ),
        },
          {
          title: "Designation",
          render: (text, item) => (
            <div>
              {item?.designation || 'N/A'}
            </div>
          ),
        },
         {
          title: "Role",
          render: (text, item) => (
            <div>
              {item?.role || 'N/A'}
            </div>
          ),
        },
        {
          title: "DOB",
          dataIndex: "dob",
          // sorter: (a, b) => new Date(a.dob) - new Date(b.dob),
          render: (text, item) => {
            return new Date(item?.dob).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
          },
        },
        {
          title: "Edit",
          dataIndex: "edit",
          render: (_, record) => (
            <EditOutlined
              key={`edit-${record?._id}`}
              className="edit-button-table"
            //   onClick={() => navigate(`/edit-post/${record._id}`)}
            />
          ),
        },
        {
          title: "Delete",
          dataIndex: "delete",
          render: (_, record) => (
            <DeleteOutlined
              key={`delete-${record._id}`}
              className="delete-button-table"
            //   onClick={() => {
            //     Swal.fire({
            //       title: "Are you sure",
            //       text: "You want to Delete?",
            //       showCancelButton: true,
            //       confirmButtonColor: "#555",
            //       cancelButtonColor: "#ce1b28",
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
        <span>Employee List</span>
        <button onClick={()=>{navigate("/addemployee")}}>Add Employee</button>
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
            dataSource={userData}
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

export default EmployeeList;

