import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './Mypage.css'
import { AuthContext } from '../../auth/AuthState';
import { Link } from 'react-router-dom';
import { InputBase, InputLabel } from '@material-ui/core';
import Axios from 'axios';

const PersonalSetting = ({match}) => {
  const myId = match.params.id
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [ name, setName ] = useState();
  const [ sex, setSex ] = useState();
  const [ email, setEmail ] = useState();
  const [ isGuide, setIsGuide ] = useState(false);
  useEffect(()=>{
    setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    Axios.get(`/api/user/${myId}`)
    .then(res => {
        setName(res.data.name)
        setEmail(res.data.email)
        setSex(res.data.sex)
        setIsGuide(res.data.isGuide)
    })
  },[])
  const onSubmit = (e)=>{
      e.preventDefault()
      const info = {
          name,
          sex,
          email
      }
      Axios.put(`/api/user/setting/${userInfo._id}`,info)
      .then(res => {
          alert(res.data)
      })
      .catch(err => alert(err))
  }
    return (
    <>
    { userInfo ?  (
        <Row>
         <Col md={{span:8, offset:2}}>
             <form onSubmit={onSubmit}>
             <div className="header">
             <Link to={`/mypage/${userInfo._id}`}> <ArrowBackIosIcon /></Link>
             <button type="submit" className="ui button">Store</button>
             </div>
             <div className="personal-content">
                 <h2 style={{ marginLeft: '25px'}}>Personal Information</h2>
                 <div className="personal-input">
                 <InputLabel shrink>Name</InputLabel>
                 <InputBase
                   className=""
                   defaultValue={userInfo.name}
                   inputProps={{ 'aria-label': 'naked' }}
                   onChange={(e)=> setName(e.target.value)}
                   required
                 />
                 <hr />
                 <InputLabel shrink>Sex</InputLabel>
                 <InputBase
                   className=""
                   defaultValue={userInfo.sex ? userInfo.sex :  '' }
                   placeholder="select your sex"
                   inputProps={{ 'aria-label': 'naked' }}
                   onChange={(e)=> setSex(e.target.value)}
                   required
                 />
                 <hr />
                 <InputLabel shrink>Email</InputLabel>
                 <InputBase
                   className=""
                   defaultValue={userInfo.email}
                   inputProps={{ 'aria-label': 'naked' }}
                   onChange={(e)=> setEmail(e.target.value)}
                   required
                 />
                 <hr />
                 <InputLabel shrink>Guide status</InputLabel>
                 <InputBase
                   className=""
                   defaultValue={userInfo.isGuide ? 'registered' :  'unregistered' }
                   inputProps={{ 'aria-label': 'naked' }}
                   readOnly
                 />
                 <hr />
                 </div>
             </div></form>
         </Col>   
        </Row>
    ): null}
    </>   
    )
}

export default PersonalSetting
