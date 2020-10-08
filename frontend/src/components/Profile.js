import { Avatar } from '@material-ui/core';
import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import './Component.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import LanguageIcon from '@material-ui/icons/Language';
import { AuthContext } from '../auth/AuthState';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ContactMailIcon from '@material-ui/icons/ContactMail';

const Profile = ({match}) => {
    const guideId = match.params.id
    const [ guideInfo, setGuideInfo ] = useState({});
    const [ date, setDate ] = useState('')
    const { userInfo, setUserInfo } = useContext(AuthContext);
    useEffect(()=>{
    setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
     Axios.get(`http://localhost:5000/api/guide/${guideId}`)
     .then(res => {
         setGuideInfo(res.data)
         console.log(res.data)
     })
     .catch(err=> console.log(err))
     
    },[])
    
    return (
    <>
        { !guideInfo ? (
         <div className="ui active inline loader"></div>  
        ):(
        <Row className="profile-page">
        <Col md={{ span: 6, offset: 3}}>
         <div className="profile-header">
           <div class="ui center image">
           <Avatar className="profile-avatar" />
           </div>
          <h1>{guideInfo.name}</h1>
          <h3><LocationOnIcon />{' '}{guideInfo.place}</h3>
          <hr />
          <Row>
              <Col md={6}>
               <h3><StarBorderIcon />{' '}{guideInfo.star}</h3>
              </Col>
              <Col md={6}>
               <h3><AttachMoneyIcon />{' '}{ guideInfo.rate}</h3>
              </Col>
          </Row>
         </div>
          <hr />
         <div className="profile-detail">
          <h2><LanguageIcon className="profile-icon"/>{guideInfo.languages}</h2>
          <hr />
          <h2><MailIcon className="profile-icon"/>{guideInfo.email}</h2>
          <hr />
          <h2><ContactMailIcon className="profile-icon"/>{guideInfo.isPro ? <span>Professional</span>: <span>Not Professional</span>}</h2>
          <hr />
          <h2>{guideInfo.description}</h2>
          <hr />
        </div>
        <div className="profile-button">
        <button class="ui right labeled icon button">
          <i class="right arrow icon"></i>
          Next
        </button>
        </div>
        </Col>
        </Row>
      )
    }
    </>
    )
}

export default Profile
