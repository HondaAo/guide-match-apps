import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, FormControl, FormGroup, Jumbotron, ListGroup, Row } from 'react-bootstrap'
import { parse } from 'query-string';
import { AuthContext } from '../auth/AuthState';
import './Component.css'
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Modal from 'react-modal'
import CreateIcon from '@material-ui/icons/Create';


const Message = ({location}) => {
    const query = parse(location.search)
    const [ guide, setGuide ] = useState(null)
    const [ chats, setChats ] = useState([])
    const [ text, setText ] = useState('')
    const [ modal , setModal ] = useState(false);
    const [ date , setDate ] = useState('');
    const [ isBooked, setIsBooked ] =useState(false);
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const [ reservation, setReservation ] =useState(null)
    useEffect(()=>{
    setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    Axios.get(`/api/guide/${query.userId}`)
     .then(res => {
         setGuide(res.data)
         console.log(res.data)
         console.log(res.data.reservations)
         if(res.data.reservations.length > 0){
         setReservation(res.data.reservations.find(reservation => {
          return reservation.clientId === query.myId
         }))
         console.log(reservation)
        }
     })
     .catch(err => console.log(err))
     Axios.get(`/api/chat?userId=${query.userId}&myId=${query.myId}`)
     .then(res => {
       setChats(res.data)
       console.log(res.data)
     })
     .catch(err => console.log(err))
    },[])
    const onSubmit = (e)=>{
      e.preventDefault();
      const message = {
        userId: guide.userId,
        username: guide.name,
        sendername: userInfo.name,
        myId: userInfo._id,
        text,
        sender: userInfo._id
      }
      Axios.post('http://localhost:5000/api/chat',message)
      .then(res => {
        setChats([...chats, res.data])
        setText('');
      })
      .catch(err => console.log(err))
    }
    const onSubmitHandler = (e)=>{
      e.preventDefault();
      const reservation = {
        name: userInfo.name,
        date,
        clientId: userInfo._id
      }
      const travel = {
        guidename: guide.name,
        date,
        guideId: guide._id,
        landscape: guide.landscape
      }
      Axios.post(`/api/guide/book/${guide._id}`,reservation)
      .then(res => {
        console.log(res.data)
        setIsBooked(true)
        setModal(false)
        Axios.post(`/api/user/travellist/${userInfo._id}`,travel)
       .then(res => console.log(res.data))
       .catch(err => console.log(err))
        alert("Successfully booked")
      })
      .catch(err => alert(err))
      
    }
    return (
         <>
        { guide  ? (
          <>
          <Row style={{ marginTop: '40px'}}>
              <Col md={{ span: 6, offset: 3}} className="overflow-auto">
               <h2>Chat Message</h2>
               <div style={{ display: 'flex', justifyContent: 'space-between'}}>
               <Link to={`/profile/${guide._id}`}><h3>{guide.name}</h3></Link>
              <>
              { reservation && reservation.isBooked ? null : <button className="ui basic button" onClick={()=> {
                console.log(reservation.isBooked)
                setModal(prev => !prev)
               }}>reservation</button>}
              </>
              </div>
               { chats.length === 0 ? (
                 <h3>Start Chatting!!</h3>
                 ) : ( 
                 <>
                 { chats.map(chat => (
                   <>
                   { chat.sender === chat.myId ? (
                   <div className="mychat-design">
                    <div className="chat-left">
                     <p>{chat.text}</p>
                     <p>{chat.createdAt.slice(11,19)}</p>
                    </div>
                    <div className="chat-right">
                      <Avatar />
                      <p>{chat.sendername}</p>
                    </div>
                   </div>
                   ):(
                   <div className="userchat-design">
                   <div className="chat-left">
                     <Avatar />
                     <p>{guide.name}</p>
                   </div>
                   <div className="chat-right">
                    <p>{chat.text}</p>
                    <p className="text-lightgrey">{chat.createdAt.slice(11,19)}</p>
                   </div>
                  </div>
                   )}
                   </>
                 ))}
                 { reservation && reservation.isBooked ? (
                  <>
                 <Link to={`/chat/payment/${guide._id}`}><div class="ui blue message" style={{ width: '70%', margin: '0 auto'}}><i class="inbox icon"></i>Payment</div></Link> 
                 </>): null }
                 { reservation && reservation.isFinished ? (
                  <>
                 <Link to={`/review/${guide._id}`}><div class="ui blue message" style={{ width: '70%', margin: '0 auto'}}><i class="inbox icon"></i>write a review</div></Link> 
                 </>): null }
                </>
                )}
               <form onSubmit={onSubmit}>
               <div class="panel-footer">
                    <div class="input-group">
                        <input id="btn-input" type="text" class="form-control input-sm" placeholder="Type your message here..." value={text} onChange={(e)=> setText(e.target.value)} />
                        <span class="input-group-btn">
                            <Button class="btn btn-warning btn-sm" id="btn-chat" type="submit" variant="danger">
                                Send</Button>
                        </span>
                    </div>
                </div>
              </form>
              </Col>
          </Row>
          <Modal
          isOpen={modal}
          style={customStyles}
          onRequestClose={()=> setModal(false)}
          contentLabel="Example Modal">
         <h1>Reservation</h1>
         <Form onSubmit={onSubmitHandler}>
          <FormGroup>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="NickName" value={userInfo.name} readOnly/>
          </FormGroup>
          <FormGroup>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" placeholder="date" value={date} onChange={(e)=> setDate(e.target.value)} required/>
          </FormGroup>
          <FormGroup>
            <Form.Label>Rate($)</Form.Label>
            <Form.Control type="text" placeholder="Readonly input here..." value={guide.rate} readOnly />
          </FormGroup>
          <button className="ui button twitter" type="submit" style={{  width: '100%'}}>
            Submit
          </button>
         </Form>
         </Modal>
         </>
        ):(
          <div className="ui active inline loader"></div>
        )}
        
        </>
    )
      }
      const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          padding               : '5%',
          margin                : '0 auto',
          transform             : 'translate(-50%, -50%)',
          textAlign             : 'center',
          width                 : '90%',

       }
      };
export default Message
