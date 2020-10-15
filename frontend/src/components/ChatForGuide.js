import { Avatar } from '@material-ui/core'
import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthState'

const ChatForGuide = ({match}) => {
    const chatId = match.params.id
    const [ chats, setChats ] = useState([])
    const { userInfo, setUserInfo } = useContext(AuthContext);
    useEffect(()=>{
    setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
      Axios.get(`http://localhost:5000/api/chat/guide/${chatId}`)
      .then(res => {
          setChats(res.data)
          console.log(res.data)
      })
      .catch(err => console.log(err))
    },[])
    return (
        <Row style={{ marginTop: '40px', padding: '3%'}}>
          <Col md={{ span: 6, offset: 3}}>
            <h3>Chat List</h3>
            <hr />
           { chats ? chats.map(chat => (
                <div>
                <Link to={`/messageforguide?userId=${userInfo._id}&myId=${chat.sender}`} style={{ display: 'flex', width: '100%', color: 'black', textDecoration: 'none'}}>
                <div style={{ width: '50%'}}>
                <h4><Avatar />{' '}{chat.sendername}</h4>
                </div>
                <div style={{ textAlign: 'right', width: '50%'}}>
                 <strong><h4>{chat.text}</h4></strong>
                 <p style={{ color: 'lightgrey'}}>{chat.createdAt.slice(11,19)}</p>
                </div>
                </Link>
                <hr />
                </div>
           )):(
               <h3>No chat data</h3>
           )}
          </Col>  
        </Row>
    )
}

export default ChatForGuide
