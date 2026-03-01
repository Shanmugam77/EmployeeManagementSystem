
import "./department.css"
import { Button, Table, Input } from 'antd'
import {
    SearchOutlined,
    FilterOutlined,
    EditOutlined,
    DeleteOutlined
  } from "@ant-design/icons";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const DepartmentList = () => {

    let [departmentData,setDepartmentData] = useState([{id:1,name:'ADMIN',description:'ADMIN Department'},{id:2,name:'HR',description:'HUMAN RESOURCE'},{id:3, name:'IT',description:'INFORMATION TECHNOLOGY'}])
    let [addDepView,setAddDepView] = useState(false);
    let [addDepData,setAddDepData] = useState({});

    let fieldChange = (e,fieldName) => {
      setAddDepData((prevData)=>{
        return({
          ...prevData,
          [fieldName]:e?.target?.value
        })
      })
    }

    let addDepartment = () => {
      console.log('depInfo',addDepData);
      setAddDepData({});
      setAddDepView(false);
    }



    const columns = [
            {
              title: "Department ID",
              render: (text, item) => (
                <div>
                  {item?.id || 'N/A'}
                </div>
              ),
            //   sorter: (a, b) => a?.id.localeCompare(b?.id),
            },
            {
              title: "Department Name",
              render: (text, item) => (
                <div>
                  {item?.name || 'N/A'}
                </div>
              ),
              // sorter: (a, b) => a?.name.localeCompare(b?.name),
            },
            {
              title: "Description",
              render: (text, item) => (
                <div>
                  {item?.description || 'N/A'}
                </div>
              ),
              // sorter: (a, b) => a?.description.localeCompare(b?.description),
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
    return(
        <div className="deparment-body"> 
            <div className='main-title-all'>
              <span>DEPARTMENT LIST</span>
              <button onClick={()=>{setAddDepView(true)}}>Add Department</button>
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
                  dataSource={departmentData}
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

            <div className="addDeppage" style={{display:addDepView?'flex':'none'}}>
              <div className="addDepBody">
                <button className="cancleButton" onClick={()=>{setAddDepView(false)}}>
                  <CloseIcon fontSize="inherit"/>
                </button>
                <div className="addDepcard"> 
                  <h3 className="addDeptitle">
                    CREATE DEPARTMENT
                  </h3>
                  <form className="depform">
                    <div>
                         <h5>Department ID</h5>
                         <Input className="inp" placeholder="Enter Department ID" variant="filled" onChange={(e)=>{fieldChange(e,'departmentId')}} value={addDepData?.departmentId || ''} />
                         
                     </div>
                     <div>
                         <h5>Department Name</h5>
                         <Input className="inp" placeholder="Enter Department Name" variant="filled" onChange={(e)=>{fieldChange(e,'departmentName')}} value={addDepData?.departmentName || ''}/>
                         
                     </div>
                     <div>
                         <h5>Description</h5>
                         <Input className="inp" placeholder="Enter Department Description" variant="filled" onChange={(e)=>{fieldChange(e,'description')}} value={addDepData?.description || ''}/>   
                     </div>
                     <div style={{height:'70px'}}>
                         <Button className="CDbutton" onClick={addDepartment}> Add Department</Button>
                     </div>
                  </form>
                </div>

              </div>
            </div>
            

        </div>
    )
}
export default DepartmentList;