import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Form,Col, Row } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthState'
import './aboutUs.css'
import { animateScroll as scroll } from 'react-scroll';

const PostList = ({history}) => {
    const [ title, setTitle ] = useState('')
    const [ comment, setComment ] = useState('')
    const [ file, setFile ] = useState('')
    const { userInfo, setUserInfo, logout } = useContext(AuthContext);
    useEffect(()=>{
    setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    },[])
    const onSubmit = (e) =>{
        e.preventDefault();
        const post = {
            user: userInfo._id,
            title,
            comment,
            image: ''
        }
        Axios.post(`/api/post`,post)
        .then(res => {
         console.log(res.data)
         const formData = new FormData()
         formData.append('image', file)
         const config = {
           headers: {
               'content-type': 'multipart/form-data'
           }
         };
         Axios.post(`/api/image/post/${userInfo._id}`,formData,config)
         .then(res => {
           console.log(res.data)
           history.push(`/mypage/${userInfo._id}`)
         })
         .catch(err => alert(err))
        })
     }
     const scrollToTop = () => {
      scroll.scrollMore(600);
    }
     return(
       <>
          <div className="post-list-header">
              <img src="https://cdn.pixabay.com/photo/2014/02/02/17/40/photos-256887__480.jpg"  />
               <div className="post-list-header-contents">
               <MediaQuery　　query="(min-width: 767px)">
               <h2>Let's check all traveller's photos and memories</h2>
               </MediaQuery>
               <MediaQuery query="(max-width: 767px)">
                 <h3 style={{ marginBottom: '30px'}}>Travel Post</h3>
               </MediaQuery>
               <button class="ui inverted basic button" onClick={scrollToTop} style={{ marginTop: '40px'}}>CONTINUE</button>
              </div>
          </div>  
          <div className="post-list-photos">
              <h2>What's New</h2>
            <div className="photos-grid">
             <img src="https://images.unsplash.com/photo-1517821099606-cef63a9bcda6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
             <img src="https://images.unsplash.com/photo-1492693377442-7f88103dc502?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
             <img src="https://images.unsplash.com/photo-1551924612-a73a41cf64e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
             <img src="https://images.unsplash.com/photo-1590785243113-0fe467e76030?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
             <img src="https://images.unsplash.com/photo-1590785204309-9888edf27ab7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
             <img src="https://images.unsplash.com/photo-1527242263-03150c939169?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
             <img src="https://images.unsplash.com/photo-1579465271302-b1b72c1d0066?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
             <img src="https://images.unsplash.com/photo-1587907708335-db11a34e2b31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
             <img src="https://images.unsplash.com/photo-1589104547265-64df2c078470?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
             <img src="https://images.unsplash.com/photo-1596938131106-fa297da27740?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
             <img src="https://images.unsplash.com/photo-1575206041841-75e1bfb62c0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
             <img src="https://images.unsplash.com/photo-1517458021190-493e7b41037c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80" />
             <img src="https://images.unsplash.com/photo-1582897141885-f55b79b0483e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
             <img src="https://images.unsplash.com/photo-1548432678-bac0d8c9fcff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
             <img src="https://images.unsplash.com/photo-1585930516047-132c58eeaabc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
             <img src="https://images.unsplash.com/photo-1588076077185-e8d6f03b6386?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
            </div>
          </div>
          <Link to="/setting" className="ui button black" style={{ marginLeft: '45%', marginBottom: '50px'}}>See all posts</Link>
          <div >
          <MediaQuery query="(min-width: 767px)">
          <div className="post-yourself">
          <div md={6} className="post-yourself-left">
           <h2 style={{ marginBottom: '30px'}}>About our gallery</h2>
           <p>Mus sed interdum nunc dictum rutrum scelerisque erat a parturient condimentum potenti dapibus vestibulum condimentum per tristique porta. Torquent a ut consectetur a vel ullamcorper a commodo a mattis ipsum class quam sed eros vestibulum quisque a eu nulla scelerisque a elementum vestibulum.
           </p>
           <p>Aliquet dolor ultricies sem rhoncus dolor ullamcorper pharetra dis condimentum ullamcorper rutrum vehicula id nisi vel aptent orci litora hendrerit penatibus erat ad sit. In a semper velit eleifend a viverra adipiscing a phasellus urna praesent parturient integer ultrices montes parturient suscipit posuere quis aenean. Parturient euismod ultricies commodo arcu elementum suspendisse id dictumst at ut vestibulum conubia quisque a himenaeos dictum proin dis purus integer mollis parturient eros scelerisque dis libero parturient magnis.
           </p>
          </div>
          <div md={6} className="post-yourself-right">
            <h3 style={{ marginBottom: '30px'}}>Let's add your memory to gallery</h3>
             <Form onSubmit={onSubmit}>
                 <Form.Group>
                     <Form.Label>Title</Form.Label>
                     <Form.Control type="text" value={title} onChange={(e)=> setTitle(e.target.value)} />
                 </Form.Group>
                 <Form.Group>
                     <Form.Label>Comment</Form.Label>
                     <Form.Control as="textarea" value={comment} onChange={(e)=> setComment(e.target.value)} rows="5" />
                 </Form.Group>
                 <Form.Group>
                   <Form.File id="exampleFormControlFile1" label="Photo" type="file" onChange={(e)=> setFile(e.target.files[0])} />
                 </Form.Group>
                 <button className="post-list-button" type="submit" style={{ color: '#fff', backgroundColor: '#19B5FE'}}>CONTINUE</button>
             </Form> 
          </div>
          </div>
          </MediaQuery>
          <MediaQuery query="(max-width: 767px)">
          <div style={{ backgroundColor: '#ececec', paddingTop: '4%'}}>
          <h3 style={{ margin: '30px'}}>Let's add your memory to gallery</h3>
             <Form onSubmit={onSubmit} style={{ padding: '3%'}}>
                 <Form.Group>
                     <Form.Label>Title</Form.Label>
                     <Form.Control type="text" value={title} onChange={(e)=> setTitle(e.target.value)} />
                 </Form.Group>
                 <Form.Group>
                     <Form.Label>Comment</Form.Label>
                     <Form.Control as="textarea" value={comment} onChange={(e)=> setComment(e.target.value)} rows="5" />
                 </Form.Group>
                 <Form.Group>
                   <Form.File id="exampleFormControlFile1" label="Photo" type="file" onChange={(e)=> setFile(e.target.files[0])} />
                 </Form.Group>
                 <button className="post-list-button" type="submit" style={{ color: '#fff', backgroundColor: '#19B5FE'}}>CONTINUE</button>
             </Form> 
            </div>
          </MediaQuery>
          </div>
        </>
    )
}

export default PostList
