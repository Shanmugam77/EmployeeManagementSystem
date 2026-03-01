
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
import { useEffect } from "react";
import Instance from "../../Axiosconfig";
import { showErrorAlert, showSuccessAlert } from "../../globalConstant";
import Swal from "sweetalert2";

const DepartmentList = () => {

    let [departmentData,setDepartmentData] = useState([{id:1,name:'ADMIN',description:'ADMIN Department'},{id:2,name:'HR',description:'HUMAN RESOURCE'},{id:3, name:'IT',description:'INFORMATION TECHNOLOGY'}])
    let [addDepView,setAddDepView] = useState(false);
    let [editDepView,setEditDepView] = useState(false);
    let [addDepData,setAddDepData] = useState({});
    let [pageRefresher,setPageRefresher] = useState(false)

    let fieldChange = (e,fieldName) => {
      setAddDepData((prevData)=>{
        return({
          ...prevData,
          [fieldName]:e?.target?.value
        })
      })
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
      fetchDepartment();
    },[pageRefresher])

    const createDepartment = async() => {
      try {
        let payload = addDepData;
        const response = await Instance.post("/department",payload,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.status == 201) {
          // console.log(response);
          setAddDepData({});
          showSuccessAlert(response?.data?.message)
          setAddDepView(false);
          setPageRefresher(!pageRefresher);
        }
        
      } catch (error) {
        console.log(error?.response?.data);
        showErrorAlert(error?.response?.data?.message);
      }
    }

    const deleteDepartment = async(id) => {
      try {
        const response = await Instance.delete(`/department/${id}`,{
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
        showErrorAlert(error?.response?.data?.message);
      }
    };

    const editDepartmentPageSetup = async(id) => {
      try {
        let editData = await departmentData.filter((x)=> x._id == id);
        if (!editData[0]) {
          showErrorAlert("Record already Deleted or Something problem in _id")
        }
        setAddDepData(editData[0]);
        // console.log(editData[0]);
        setEditDepView(true) 
      } catch (error) {
        console.log(error?.response?.data);
        showErrorAlert(error?.response?.data?.message);
      }
    }

    const handleEdit = async(id) => {
      try {
        let payload = {
          departmentId: addDepData?.departmentId,
          departmentName: addDepData?.departmentName,
          description: addDepData?.description
        }
        const response = await Instance.put(`/department/${id}`,payload,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.status == 200) {
          setPageRefresher(!pageRefresher);
          setAddDepData({})
          setEditDepView(false)
          showSuccessAlert(response?.data?.message);
        } 
      } catch (error) {
        console.log(error?.response?.data);
        showErrorAlert(error?.response?.data?.message);
      }
    }



    const columns = [
            {
              title: "Department ID",
              render: (text, item) => (
                <div>
                  {item?.departmentId || 'N/A'}
                </div>
              ),
            //   sorter: (a, b) => a?.id.localeCompare(b?.id),
            },
            {
              title: "Department Name",
              render: (text, item) => (
                <div>
                  {item?.departmentName || 'N/A'}
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
                  onClick={() => {editDepartmentPageSetup(record?._id)}}
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
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure",
                      text: "You want to Delete?",
                      showCancelButton: true,
                      confirmButtonColor: "#008BA6",
                      cancelButtonColor: "#D1D1D1",
                      confirmButtonText: "Yes, Delete!"
                    }).then((result) => {
                      if (result.isConfirmed) {
                        // deleteDepartment(record._id)
                      }
                    })
                  }}
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
                         <Button className="CDbutton" onClick={createDepartment}> Add Department</Button>
                     </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="addDeppage" style={{display:editDepView?'flex':'none'}}>
              <div className="addDepBody">
                <button className="cancleButton" onClick={()=>{setEditDepView(false)}}>
                  <CloseIcon fontSize="inherit"/>
                </button>
                <div className="addDepcard"> 
                  <h3 className="addDeptitle">
                    EDIT DEPARTMENT
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
                         <Button className="CDbutton" onClick={()=>{handleEdit(addDepData?._id)}}> Update Department</Button>
                     </div>
                  </form>
                </div>
              </div>
            </div>
            

        </div>
    )
}
export default DepartmentList;