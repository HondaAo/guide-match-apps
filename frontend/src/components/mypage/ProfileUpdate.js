import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './Mypage.css'
import { AuthContext } from '../../auth/AuthState';
import { Link } from 'react-router-dom';
import { InputBase, InputLabel } from '@material-ui/core';
import Axios from 'axios';

const ProfileUpdate = ({match}) => {
  const guideId = match.params.id
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [ guideInfo, setGuideInfo ] = useState([])
  const [ name, setName ] = useState(null)
  const [ telephone, setTelephone ] = useState()
  const [ email, setEmail] = useState('');
  const [ title, setTitle ] = useState('');
  const [ rate, setRate ] = useState('20');
  useEffect(()=>{
    setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    Axios.get(`/api/guide/${guideId}`)
    .then(res => {
        setGuideInfo(res.data)
        console.log(res.data)
    })
    .catch(err => alert(err))
  },[])
  const onSubmit = (e)=>{
      e.preventDefault()
      const info = {
          name,
          email,
          telephone,
          title,
          rate,
      }
      Axios.put(`/api/guide/setting/${guideInfo._id}`,info)
      .then(res => {
          console.log(res.data)
      })
      .catch(err => alert(err))
  }
    return (
    <>
    { guideInfo && userInfo  ?  (
        <Row>
         <Col md={{span:8, offset:2}}>
             <form onSubmit={onSubmit}>
             <div className="header">
             <Link to={`/profile/${guideInfo._id}`}> <ArrowBackIosIcon /></Link>
             <button type="submit" className="ui button">Store</button>
             </div>
             <div className="personal-content">
                 <h2 style={{ marginLeft: '25px'}}>Guide Information</h2>
                 <div className="personal-input">
                 <InputLabel shrink>Name</InputLabel>
                 <InputBase
                   className=""
                   value={guideInfo.name}
                   inputProps={{ 'aria-label': 'naked' }}
                   onChange={(e)=> setName(e.target.value)}
                   required
                 />
                 <hr />
                 <InputLabel shrink>Phone number</InputLabel>
                 <InputBase
                   className=""
                   value={guideInfo.telephone}
                   placeholder="enter your phonenumber"
                   inputProps={{ 'aria-label': 'naked' }}
                   onChange={(e)=> setTelephone(e.target.value)}
                   required
                 />
                 <hr />
                 <InputLabel shrink>Email</InputLabel>
                 <InputBase
                   className=""
                   placeholder={guideInfo.email}
                   inputProps={{ 'aria-label': 'naked' }}
                   onChange={(e)=> setEmail(e.target.value)}
                   required
                 />
                 <hr />
                 <InputLabel shrink>title</InputLabel>
                 <InputBase
                   className=""
                   value={guideInfo.title}
                   inputProps={{ 'aria-label': 'naked' }}
                   onChange={(e)=> setTitle(e.target.value)}
                 />
                 <hr />
                 <InputLabel shrink>rate</InputLabel>
                 <InputBase
                   className=""
                   value={guideInfo.rate}
                   inputProps={{ 'aria-label': 'naked' }}
                   onChange={(e)=> setRate(e.target.value)}
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

export default ProfileUpdate
