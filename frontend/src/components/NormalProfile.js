import { Avatar } from '@material-ui/core';
import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthState';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PaymentIcon from '@material-ui/icons/Payment';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import './Location.css'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import HelpIcon from '@material-ui/icons/Help';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateIcon from '@material-ui/icons/Create';

const NormalProfile = ({ match }) => {
    const myId = match.params.id
    const { userInfo, setUserInfo, logout } = useContext(AuthContext);
    const [ file, setFile] = useState('')
    useEffect(()=>{
     setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
     Axios.get(`/api/user/${myId}`)
     .then(res=>{
        setUserInfo(res.data)
        console.log(res.data)
     })
     .catch(err => console.log(err))
    },[])
    const imageChange = (e)=>{
     e.preventDefault();
     const formData = new FormData()
      formData.append('image', file)
      console.log(file)
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      };
      Axios.post(`/api/image/${userInfo._id}`,formData,config)
      .then(res => alert(res.data))
      .catch(err => alert(err))
    }
    return (
        <>
        { userInfo ? (
        <>

            <Row className="">
             <Col md={{ span: 8, offset: 2}}>
             <div className="profile-header">
               <div className="profile-header-text">
                <h4>{userInfo.name}</h4>
                <p style={{ color: 'lightgrey', marginTop: '20px'}}>registered{' '}{userInfo.createdAt}</p>
               </div>
               <div className="profile-header-image" style={{ minWidth: '120px'}}>
                { userInfo.image !== "" ? (
                  <>
                  <img src={userInfo.image} />
                  <Link to={`/photochange/${userInfo._id}`} style={{ marginLeft: '-30px', color: 'black',fontSize: '10px'}}><p>Change image</p></Link>
                  </>
                ): (
                 <>
                   <Avatar className="avatar" />
                   <Link to={`/photochange/${userInfo._id}`} style={{ marginLeft: '-30px', color: 'black',fontSize: '10px'}}><p>Change image</p></Link>
                 </>
                )}
               </div>
             </div>
             <p>Personal Information</p>
             <hr />
             <div className="personal-information">
              <Link to={`/setting/${userInfo._id}`} style={{ color: 'black'}}><h5 className="info-text"><AccountBoxIcon style={{ marginRight: '15px', fontWeight: "200"}} />{' '}{' '}Personal Setting</h5></Link>
             <hr />
              <Link to={`/setting/${userInfo._id}`} style={{ color: 'black'}}><h5 className="info-text"><PaymentIcon style={{ marginRight: '15px', fontWeight: "200"}} />{' '}{' '}Payment setting</h5></Link>
             <hr />
            { userInfo.guideId !== "" ? (
              <>
             <Link to={`/profile/${userInfo.guideId}`} style={{ color: 'black'}}><h5 className="info-text"><AccountBoxIcon style={{ marginRight: '15px', fontWeight: "200"}} />{' '}{' '}Guide Profile</h5></Link>
             <hr />
             </>
            ):(
             <>
            <Link to={`/guide`} style={{ color: 'black'}}><h5 className="info-text"><CardTravelIcon style={{ marginRight: '15px', fontWeight: "200"}} />{' '}Host a guide or tour</h5></Link>
             <hr />
             </>
            )}  
             <Link to={`/travellist/${userInfo._id}`} style={{ color: 'black'}}><h5 className="info-text"><FlightTakeoffIcon style={{ marginRight: '15px', fontWeight: "200"}} />{' '}Check my travel</h5></Link>
             <hr />
             <Link to={`/write/${userInfo._id}`} style={{ color: 'black'}}><h5 className="info-text"><CreateIcon style={{ marginRight: '15px', fontWeight: "200"}} />{' '}Share your experience</h5></Link>
             <hr />
             </div>
             <p>Support</p>
              <hr />
             <div className="support-center">
             <Link to={`/support`} style={{ color: 'black'}}><h5 className="info-text"><ContactPhoneIcon style={{ marginRight: '15px', fontWeight: "200"}} />{' '}{' '}Help center</h5></Link>
             <hr />
             <Link to={`/questions`} style={{ color: 'black'}}><h5 className="info-text"><HelpIcon style={{ marginRight: '15px', fontWeight: "200"}} />{' '}{' '}Fuliquently asked questions</h5></Link>
             <hr />
             </div>
             <p>Logout</p>
             <hr />
             <div className="logout-section" >
             <div to={`/support`} style={{ color: 'black'}}><h5 className="info-text" onClick={()=>  logout() }><ExitToAppIcon style={{ marginRight: '15px'}} />{' '}{' '}Logout</h5></div>
             </div>
             </Col>
            </Row>
        </>
        ):(
            <div className="ui active inline loader"></div>   
        )} 
        </>
    )
}

export default NormalProfile
