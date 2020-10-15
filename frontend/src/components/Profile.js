import { Avatar, IconButton } from '@material-ui/core';
import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import './Component.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import LanguageIcon from '@material-ui/icons/Language';
import { AuthContext } from '../auth/AuthState';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Modal from 'react-modal'
import MediaQuery from 'react-responsive';

Modal.setAppElement('#root')
const Profile = ({match}) => {
    const guideId = match.params.id
    const [ guideInfo, setGuideInfo ] = useState({});
    const [ date, setDate ] = useState('')
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ email, setEmail ] = useState('');
    const [ comment, setComment ] = useState('');
    const [ image, setImage ] = useState(null);
    const [ file, setFile] = useState('')
    const { userInfo, setUserInfo } = useContext(AuthContext);
    useEffect(()=>{
    setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
     Axios.get(`/api/guide/${guideId}`)
     .then(res => {
         setGuideInfo(res.data)
         console.log(res.data)
         setImage(res.guide.image)
     })
     .catch(err=> console.log(err))
     
    },[])
    const reportHandler = (e)=>{
       e.preventDefault();
       const report = {
         email,
         comment
       }
       Axios.post('/api/request',report)
       .then(res => alert(res.data))
       .catch(err => console.log(err))
    }
    const closeModal = ()=>{
      setIsModalOpen(false)
    }
    const onSubmit = (e)=>{
      e.preventDefault();
      const formData = new FormData()
      formData.append('image', file)
      console.log(file)
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      };
      Axios.post(`/api/image/${guideInfo._id}`,formData,config)
      .then(res => alert(res.data))
      .catch(err => alert(err))
    }
    const changeImage = ()=>{
     
    }
    return (
    <>
      <MediaQuery query="(min-width: 767px)">
        { !guideInfo ? (
         <div className="ui active inline loader"></div>  
        ):(
        <Row className="profile-page">
        <Col md={{ span: 8, offset: 2}}>
        <div className="profile-header">
          <div className="profile-header-text">
           <h4>Hello, I'm {guideInfo.name}</h4>
           <p style={{ color: 'lightgrey'}}>registered{' '}{guideInfo.createdAt}</p>
           <Link to={`/update/${guideInfo._id}`} style={{ color: 'black'}}><p>edit profile</p></Link>
          </div>
          <div className="profile-header-image">
           { guideInfo.image !== "" ? (
             <img src={guideInfo.image} onClick={changeImage}/>
           ): <Avatar className="avatar" onClick={changeImage}/>}
          </div>
        </div>
        <hr />
        <div className="profile-introduction">
          <h1>Introduction</h1>
          <p><LocationOnIcon />{' '}{guideInfo.city}/{guideInfo.country}</p>
          <p><LanguageIcon />{' '}{guideInfo.languages}</p>
        </div>
        <hr />
        <div className="profile-rating" style={{ display: 'flex', justifyContent: 'space-between'}}>
          <h3><StarBorderIcon />{' '}Rating {guideInfo.star}</h3>
          <button className="ui button youtube" onClick={()=> alert("No review exists")}>
            See all reviews
          </button>
        </div>
        <div className="profile-button">
        { userInfo ? userInfo._id !== guideInfo.userId ? (
          <>
          <Link to={`/message?userId=${guideInfo.userId}&myId=${userInfo._id}`}>
          <button className="ui linkedin button">
          <i className="comment icon"></i>
           Go Chat
          </button></Link>
          <button className="negative ui button" onClick={()=> setIsModalOpen(prev => !prev)}><i className="bullhorn icon"></i>Report</button>
          <Link to={`/review/${guideInfo._id}`}><button className="ui twitter button"><i class="edit icon"></i>Assessment</button></Link>
          </>
        ): null : null }
         </div>
        </Col>
        </Row>
      )
    }
    </MediaQuery>
   <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 >Report</h2>
          <Form onSubmit={reportHandler}>
          <Form.Group controlId="formBasicEmail">
           <Form.Label>Guide's Email address</Form.Label>
           <Form.Control type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
           <Form.Label>Example textarea</Form.Label>
           <Form.Control as="textarea" rows={3} value={comment} onChange={(e)=> setComment(e.target.value)} />
          </Form.Group>
           <Button variant="danger" type="submit">Send</Button>
          </Form>
          <button onClick={()=> setIsModalOpen(false)} className="ui button">Close</button>
   </Modal>
   <MediaQuery query="(max-width: 767px)">
   { !guideInfo ? (
         <div className="ui active inline loader"></div>  
        ):(
        <Row className="profile-page">
        <Col md={{ span: 8, offset: 2}}>
        <div className="profile-header">
          <div className="profile-header-text">
           <h4>{guideInfo.name}</h4>
           <p style={{ color: 'lightgrey'}}>registered{' '}{guideInfo.createdAt}</p>
           <Link to={`/update/${guideInfo._id}`} style={{ color: 'black'}}><p>edit profile</p></Link>
          </div>
          <div className="profile-header-image">
           { guideInfo.image !== "" ? (
             <img src={guideInfo.image} onClick={changeImage}/>
           ): <Avatar className="avatar" onClick={changeImage}/>}
          </div>
        </div>
        <hr />
        <div className="profile-introduction">
          <h1>Introduction</h1>
          <p><LocationOnIcon />{' '}{guideInfo.city}/{guideInfo.country} </p>
          <p><LanguageIcon />{' '}{guideInfo.languages}</p>
          <p><AttachMoneyIcon />{' '}{guideInfo.rate}</p>
        </div>
        <hr />
        <div className="profile-rating">
          <h3><StarBorderIcon />{' '}Rating {guideInfo.star}</h3>
          <p>see reviews</p>
        </div>
        <div className="profile-button">
        { userInfo ? userInfo._id !== guideInfo.userId ? (
          <>
          <Link to={`/message?userId=${guideInfo._id}&myId=${userInfo._id}`}>
          <button className="ui linkedin button">
          <i className="comment icon"></i>
           Go Chat
          </button></Link>
          <button className="negative ui button" onClick={()=> setIsModalOpen(prev => !prev)}><i className="bullhorn icon"></i>Report</button>
          <Link to={`/review/${guideInfo._id}`}><button className="ui twitter button"><i class="edit icon"></i>Assessment</button></Link>
          </>
        ): null : null }
         </div>
        </Col>
        </Row>
      )
    }
   </MediaQuery>
    </>
    )
}
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
 }
};
export default Profile
