import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  IconButton  from '@material-ui/core/IconButton'
import { AuthContext } from '../auth/AuthState';
import { Avatar } from '@material-ui/core';
import MediaQuery from 'react-responsive';

const ChatScreen = ({ match }) => {
  const roomId = match.params.id;
  const [ chats, setChats ] = useState([])
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [ messages, setMessages ] = useState([])
  const [ seeall, setSeeall ] = useState(true);
  const [ guide, setGuide ] = useState({})
  const [ text, setText ] = useState('')
  const [isOpen, setIsOpen ] = useState(false)
  useEffect(()=>{
    setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    Axios.get(`/api/chat/${roomId}`)
    .then(res=> {
      if(res.data.length > 0){
        console.log(res.data)
        setChats(res.data)
      }
    })
    .catch(err => console.log(err))
  },[])
  const onSubmit = e => {
     e.preventDefault();
     const message = {
      userId: guide._id,
      myId: userInfo._id,
      username: guide.name,
      text,
      sender: userInfo._id,
      sendername: userInfo.name
    }
    Axios.post('/api/chat',message)
    .then(res => {
      setMessages([...messages, res.data])
      setText('');
    })
    .catch(err => console.log(err))
  }
    return (
    <>
    {userInfo ? (
    <>
    <MediaQuery query="(min-width: 767px)">
    { chats.length > 0 ? (
      <>
        <div className="mypage-header">
          <div className="mypage-header-left">
            <Link to="/" style={{ color: 'black'}}><strong>Expo</strong></Link>
          </div>
          <div className="mypage-header-right">
          <div className="ui compact menu">
            <div className="ui simple dropdown item">
            <i className="ui icon user"></i>{userInfo.name}
              <i className="dropdown icon"></i>
              <div className="menu">
                <Link to={`/chat/${userInfo._id}`} className="item">Chat</Link>
                { userInfo.userId ? <Link to={`/guide`} className="item">become a guide</Link> : <Link to={`/profile/${userInfo.userId}`} className="item" >Guide Profile</Link>}
                <Link to={`/travellist/${userInfo._id}`} className="item">Travel List</Link>
              </div>
            </div>
          </div> 
          </div>
         </div>
        <hr />
      <Row style={{padding: '3%'}}>
      <Col md={5}>
      <div style={{ justifyContent: 'space-between', display: 'flex'}}>
      <h3>Chats List</h3>
      </div>
      <hr />
     
        { chats.map(chat => {
          return (
          <div>
          <div onClick={()=> {
            setIsOpen(true)
            Axios.get(`/api/chat?userId=${chat.userId}&myId=${userInfo._id}`)
            .then(res => {
               setMessages(res.data)
               Axios.get(`/api/guide/${chat.userId}`)
               .then(res => setGuide(res.data))
               .catch(err => console.log(err))
             })
            .catch(err => console.log(err))
          }} style={{ display: 'flex', width: '100%',color: 'black',textDecoration: 'none'}}>
          <div style={{ width: '50%'}}>
          <h4>{chat.username}</h4>
          </div>
          <div style={{ textAlign: 'right', width: '50%'}}>
           <strong><p>{chat.text}</p></strong>
           <p style={{ color: 'lightgrey'}}>{chat.createdAt.slice(0,19)}</p>
          </div>
          </div>
          <hr />
          </div>
        )})} 
        </Col>
        <Col md={7}>
         {messages && isOpen ? (
        <>
          <div className="chat-page-header">
           <strong>Message</strong>
           <p><Link to={`/profile/${guide._id}`}>{guide.name}</Link></p>
          </div>
          <hr />
         <div className="chat-screen" style={{ height: '60vh', overflow: 'auto'}}>
         { messages.map(message => (
           <>
           { message.sender !== message.myid ? (
              <div className="mychat-design">
              <div className="chat-left">
               <p>{message.text}</p>
               <p>{message.createdAt.slice(11,19)}</p>
              </div>
              <div className="chat-right">
                <img src={userInfo.image} style={{ width: '40px', height: '40px', borderRadius: '50%'}} />
                <p>{message.sendername}</p>
              </div>
              </div>
           ): (
            <div className="userchat-design">
             <div className="chat-left">
               <img src={guide.image} style={{ width: '40px', height: '40px', borderRadius: '50%'}} />
               <p>{message.name}</p>
             </div>
             <div className="chat-right">
              <p>{message.text}</p>
              <p className="text-lightgrey">{message.createdAt.slice(11,19)}</p>
             </div>
            </div>
           )}
           </>
          ))}
          <form onSubmit={onSubmit}>
               <div class="panel-footer">
                    <div class="input-group">
                        <input id="btn-input" type="text" class="form-control input-sm" placeholder="Type your message here..." value={text} onChange={(e)=> setText(e.target.value)} />
                        <span class="input-group-btn">
                            <Button class="btn btn-warning btn-sm" id="btn-chat" type="submit" variant="danger">
                                Send
                            </Button>
                        </span>
                    </div>
                </div>
            </form>
         </div>
        </>
         ):(
          <h3>Let's start chatting!!</h3> 
         )}
        </Col>
     </Row>
     </>
    
    )
    :
    <>
    <div style={{ width: '60%', margin:'0 auto'}}>
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
     </div>
      </>}
    </MediaQuery>
    <MediaQuery query="(max-width: 767px)">
    { chats.length > 0  ? (
      <>
        <div className="mypage-header">
          <div className="mypage-header-left">
            <Link to="/" style={{ color: 'black'}}><strong>Expo</strong></Link>
          </div>
          <div className="mypage-header-right">
          <div className="ui compact menu">
            <div className="ui simple dropdown item">
              <i className="ui icon user"></i> {userInfo.name}
              <i className="dropdown icon"></i>
              <div className="menu">
                <Link to={`/chat/${userInfo._id}`} className="item">Chat</Link>
                <Link to={`/guide`} className="item">become a guide</Link>
                <Link to={`/travellist/${userInfo._id}`} className="item">Travel List</Link>
              </div>
            </div>
          </div> 
          </div>
         </div>
        <hr />
      <Row style={{padding: '3%'}}>
      <Col md={{span: 6, offset: 3}}>
      <div style={{ justifyContent: 'space-between', display: 'flex'}}>
      <h3>Chats List</h3>
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
           <p style={{ color: 'lightgrey'}}>{chat.createdAt.slice(0,19)}</p>
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
    </MediaQuery>
    </>
    ): <h2>Loading....</h2>}
    </>
    )
}

export default ChatScreen
