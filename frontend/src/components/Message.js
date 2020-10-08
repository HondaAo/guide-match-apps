import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, FormControl, FormGroup, Jumbotron, ListGroup, Row } from 'react-bootstrap'
import { parse } from 'query-string';
import { AuthContext } from '../auth/AuthState';
import './Component.css'
import { Avatar } from '@material-ui/core';

const Message = ({location}) => {
    const query = parse(location.search)
    console.log(query)
    const [ guide, setGuide ] = useState(null)
    const [ chats, setChats ] = useState([])
    const [ text, setText ] = useState('')
    const { userInfo, setUserInfo } = useContext(AuthContext);
    useEffect(()=>{
    setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    Axios.get(`http://localhost:5000/api/guide/${query.userId}`)
     .then(res => {
         setGuide(res.data)
         console.log(res.data)
     })
     .catch(err => console.log(err))
     Axios.get(`http://localhost:5000/api/chat?userId=${query.userId}&myId=${query.myId}`)
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
    return (
         <>
        { guide ? (
          <Row style={{ marginTop: '40px'}}>
              <Col md={{ span: 6, offset: 3}} className="overflow-auto">
               <h2>Chat Message</h2>
               { chats.length === 0 ? <h3>Start Chatting!!</h3> : (
                 chats.map(chat => (
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
                      <p>{chat.text}</p>
                     <p>{guide._name}</p>
                   </div>
                   )}
                   </>
                 ))
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
        ):(
          <div className="ui active inline loader"></div>
        )}
        </>
    )
      }
export default Message
