import "./profile.css"
import { useEffect, useState } from "react";
import Instance from "../../Axiosconfig";
import { json } from "react-router-dom";

const Profile = () => {
    const [userData,setUserData] = useState({});

    let fetchUserData = async() =>{
        try {
            let loginUserData =JSON.parse(localStorage.getItem("loginUserData"));
            const response = await Instance.get(`/user/withDepDetails/${loginUserData?.userId}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status == 200) {
                // console.log(response?.data?.user);
                setUserData(response?.data?.user);
            }    
        } catch (error) {
            console.log(error?.response?.message);
        }
    }

    useEffect(()=>{
        fetchUserData();
    },[])


    return(
        <div>
            <div className='main-title-all'>
             <span>PROFILE PAGE</span>
            </div>
           <div className="profilebody">
            <div className="prfileframe">
                <h3>My Profile</h3>
                <div className="profilelayout">
                    <div className="imgcontent">
                        <div className="imgoverline">

                        </div>
                        <h3>{userData?userData?.firstName+' '+userData?.lastName : ''}</h3>
                        <p>{userData?userData?.email : ''}</p>
                        <button>{userData?userData?.role : ''}</button>
                    </div>
                    <div className="textcontent">
                        <div className="detailslayout">
                            <div className="infocard">
                                <h3>Personal Information</h3>
                                <div className="infolayout">
                                   <div className="infofield">
                                       <div className="singlefield">
                                           <h5>Date of Birth:</h5>
                                           <h6>{userData?new Date(userData?.dob).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }) : ''}</h6>
                                       </div>
                                   </div>
                                   <div className="infofield">
                                       <div className="singlefield">
                                           <h5>Gender:</h5>
                                           <h6>{userData?userData?.gender : ''}</h6>
                                       </div>
                                   </div>
                                   <div className="infofield">
                                       <div className="singlefield">
                                           <h5>Marital Status:</h5>
                                           <h6>{userData?userData?.maritalStatus : ''}</h6>
                                       </div>
                                   </div>
                                </div>
                            </div>
                            <div className="infocard">
                                <h3>Professional Information</h3>
                                <div className="infolayout">
                                  <div className="infofield">
                                    <div className="singlefield">
                                        <h5>Role:</h5>
                                        <h6>{userData?userData?.role : ''}</h6>
                                    </div>
                                  </div>
                                  <div className="infofield">
                                    <div className="singlefield">
                                        <h5>Department:</h5>
                                        <h6>{userData?userData?.department?.departmentName : ''}</h6>
                                    </div>
                                  </div>
                                  <div className="infofield">
                                    <div className="singlefield">
                                        <h5>Salary:</h5>
                                        <h6>₹{userData?userData?.salary : ''}</h6>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                        <div className="quickstats">
                            <div className="quicklayout">
                                <h3>Quick Stat</h3>
                                <div className="quicktextlayout">
                                    <div className="singlefield">
                                        <h5>Status:</h5>
                                        <h6>{userData?userData?.status : ''}</h6>
                                    </div>
                                    <div className="singlefield">
                                        <h5>DOJ:</h5>
                                        <h6>{userData?new Date(userData?.createdAt).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }) : ''}</h6>
                                    </div>
                                    <div className="singlefield">
                                        <h5>Last Updated:</h5>
                                        <h6>{userData?new Date(userData?.updatedAt).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }) : ''}</h6>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>


           </div>

        </div>
    )
}

export default Profile;