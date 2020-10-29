import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, FormControl, FormGroup, Jumbotron, ListGroup, Row } from 'react-bootstrap'
import { parse } from 'query-string';
import { AuthContext } from '../../auth/AuthState';
import '../Component.css'
import { Avatar } from '@material-ui/core';

const MessageForGuide = ({location}) => {
    const query = parse(location.search)
    console.log(query)
    const [ chats, setChats ] = useState([])
    const [ text, setText ] = useState('')
    const { userInfo, setUserInfo } = useContext(AuthContext);
    useEffect(()=>{
    setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
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
        userId: query.userId,
        username: userInfo.name,
        sendername: userInfo.name,
        myId: query.myId,
        text,
        sender: userInfo._id
      }
      Axios.post('/api/chat',message)
      .then(res => {
        setChats([...chats, res.data])
        setText('');
      })
      .catch(err => console.log(err))
    }
    return (
         <>
        { userInfo ? (
          <Row style={{ marginTop: '40px'}}>
              <Col md={{ span:6, offset: 3}}>
               <h2>Chat Message</h2>
               <hr />
               <div className="overflow-auto">
               { chats.length === 0 ? <h3>Start Chatting!!</h3> : (
                 chats.map(chat => (
                   <>
                   { chat.sender === userInfo._id ? (
                   <div className="mychat-design">
                    <div className="chat-left">
                     <p>{chat.text}</p>
                     <p className="text-lightgrey">{chat.createdAt.slice(11,19)}</p>
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
                      <p>{chat.sendername}</p>
                    </div>
                    <div className="chat-right">
                     <p>{chat.text}</p>
                     <p className="text-lightgrey">{chat.createdAt.slice(11,19)}</p>
                    </div>
                    
                   </div>
                   )}
                   </>
                 ))
               )}
               </div>
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
export default MessageForGuide

