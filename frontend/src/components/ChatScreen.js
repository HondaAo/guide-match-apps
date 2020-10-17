import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  IconButton  from '@material-ui/core/IconButton'
import { AuthContext } from '../auth/AuthState';
import { Avatar } from '@material-ui/core';

const ChatScreen = ({ match }) => {
  const roomId = match.params.id;
  const [ chats, setChats ] = useState([])
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [ seeall, setSeeall ] = useState(true);
  useEffect(()=>{
    setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    Axios.get(`/api/chat/${roomId}`)
    .then(res=> {
      setChats(res.data)
      console.log(res.data)
      if(res.data.length > 10 ){
        setSeeall(false)
      }
    })
    .catch(err => console.log(err))
  },[])
    return (
    <>
    { chats.length > 0 ? (
      <>
      <Row style={{ marginTop: '30px',padding: '3%'}}>
      <Col md={{ span: 6, offset: 3}}>
      <div style={{ justifyContent: 'space-between', display: 'flex'}}>
      <h3>Chats List</h3> 
      { userInfo ? (userInfo.isGuide ? (
      <button className="ui button youtube"><Link to={`/chatforguide/${userInfo._id}`} style={{color: 'white', textDecoration: 'none'}}>Go Chat page as guide</Link></button>
      ): null
      ):null}
      </div>
      <hr />
     
        { chats.map(chat => (
          <div>
          <Link to={`/message?userId=${chat.userId}&myId=${chat.myId}`} style={{ display: 'flex', width: '100%',color: 'black',textDecoration: 'none'}}>
          <div style={{ width: '50%'}}>
          <h4><Avatar />{' '}{chat.username ? chat.username : <h4>unknown</h4>}</h4>
          </div>
          <div style={{ textAlign: 'right', width: '50%'}}>
           <strong><p>{chat.text}</p></strong>
           <p style={{ color: 'lightgrey'}}>{chat.createdAt.slice(11,19)}</p>
          </div>
          </Link>
          <hr />
          </div>
        ))} 
        </Col>
     </Row>
     </>
    
    )
    :
    <>
    <h1 style={{ padding: '5%'}}>No Chat exists</h1>
    <button className="ui button youtube" type="submit" style={{ width: '100%'}}>
    { userInfo && userInfo.guideId ? (
    <Link to={`/chatforguide/${userInfo._id}`} style={{color: 'white', textDecoration: 'none'}}>
             Chat page for guide
    </Link>
    ) : (
      <Link to={`/guideList`} style={{color: 'white', textDecoration: 'none'}}>
      Get started
      </Link>
    )}
     </button>
      </>}
    
    </>
    )
}

export default ChatScreen
