import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthState'
import './Mypage.css'

const Post = ({ history }) => {
    const [ title, setTitle ] = useState('')
    const [ comment, setComment ] = useState('')
    const { userInfo, setUserInfo, logout } = useContext(AuthContext);
    const [ file, setFile ] = useState({})
    useEffect(()=>{
    setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    const formData = new FormData()
      formData.set('user','')
      formData.set('title', '')
      formData.set('comment', '')
    },[])
    const onSubmit = (e) =>{
      e.preventDefault();
      const formData = new FormData()
      formData.append('user', userInfo._id)
      formData.append('title', title)
      formData.append('comment', comment)
       formData.append('image',file)
        const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
        };
        console.log(file)
        Axios.post(`/api/image/post`,formData)
        .then(res => {
          console.log(res.data)
          history.push(`/mypage/${userInfo._id}`)
        })
        .catch(err => console.log(err))
    }
    return (
    <div>
        <div className="post-experience">
        <div className="mypage-header">
          <div className="mypage-header-left">
            <Link to="/" style={{ color: 'black'}}><strong>Expo</strong></Link>
          </div>
          <div className="mypage-header-right">
          <div className="ui compact menu">
            <div className="ui simple dropdown item">
            {userInfo ? 
            (
            <>
              <i className="ui icon user"></i> {userInfo.name}
              <i className="dropdown icon"></i>
              <div className="menu">
                <Link to={`/chat/${userInfo._id}`} className="item">Chat</Link>
                { userInfo.guideId !== '' ? <Link to={`/profile/${userInfo.guideId}`} className="item">Guide setting</Link> : <Link to={`/guide`} className="item">become a guide</Link> } 
                <Link to={`/travellist/${userInfo._id}`} className="item">Travel List</Link>
              </div>
            </>
            ): null}
            </div>
          </div> 
          </div>
         </div>
         <hr />
         <h1>Please share your experience</h1>
         <p>Let us and every travellers know how fun your experience is and your guide is.</p>
         <hr />
         <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
           <Form.Label>Title</Form.Label>
           <Form.Control type="text" value={title} onChange={(e)=> setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
           <Form.Label>Comment</Form.Label>
           <Form.Control as="textarea" row="4" value={comment} onChange={(e)=> setComment(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.File id="exampleFormControlFile1" label="Photo" type="file" onChange={(e)=> setFile(e.target.files[0])} />
          </Form.Group>
          <hr />
          <button class="fluid ui teal button" type="submit" style={{ marginBottom: '30px'}}>Submit</button>
          <button class="fluid ui button">Check other's posts</button>
         </Form>
        </div>
    </div>
    )
}

export default Post
