import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Form, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthState'
import { Avatar } from '@material-ui/core'

const GuideDetail = ({match,history}) => {
    const [ guide, setGuide] = useState(null)
    const [ text, setText ] = useState('');
    const [ message, setMessage ] = useState(null);
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const guideId = match.params.id
    useEffect(()=>{
        setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
        console.log(userInfo)
        Axios.get(`http://localhost:5000/api/guide/guidelist/${guideId}`)
        .then(res => {
            setGuide(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    },[])
    const onSubmit = async(e) =>{
        e.preventDefault();
        const chat = {
            text,
            userId: guide._id,
            myId: userInfo._id,
            sender: userInfo._id,
            username: guide.name,
            sendername: userInfo.name
        }
        const { data } = await Axios.post(`http://localhost:5000/api/chat`,chat)
        if(data){
            history.push(`/message?userId=${data.userId}&myId=${data.myId}`)
        }
    }
    return (
        <Row style={{ marginTop: '10%'}}>
        {!guide ? <div className="ui active inline loader"></div> :(
        <>
          <Col md={6}>
          <h2>Details</h2>
          <ListGroup variant="flush">
            <ListGroup.Item>Language:{' '}{guide.languages.map(item => <strong>{item}{' '}</strong>)}</ListGroup.Item>
            <ListGroup.Item>Place:{' '}<strong>{guide.city} {' '}{ guide.country}</strong></ListGroup.Item>
            <ListGroup.Item>Rating:{' '}<i class="star icon"></i>{' '}<strong>{guide.star}</strong></ListGroup.Item>
            <ListGroup.Item>Experience:{' '}<strong>{guide.experience}</strong></ListGroup.Item>
            <ListGroup.Item>Comments:{' '}<p>{guide.description}</p></ListGroup.Item>
          </ListGroup>
          </Col>
          <hr />
          <Col md={6} style={{ paddingLeft: '5%'}}>
          <h2>Review</h2>
          { guide.reviews.length > 0 ?  (guide.reviews.map(review =>(
            <div class="ui comments">
            <div class="comment">
              <a class="avatar">
                <Avatar />
              </a>
              <div class="content">
                <a class="author">{review.name}</a>
                <div class="metadata">
                  <div class="date">{review.updatedAt}</div>
                  <div class="rating">
                    <i class="star icon"></i>
                    {review.rating}
                  </div>
                </div>
                <div class="text">
                  {review.comment}
                </div>
              </div>
            </div>
          </div>
          ))):( <p>Currently no review</p> 
          )}
          <hr />
          <h2>Get Contact</h2>
          { message ? <Alert variant="primary">{message}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Comments</Form.Label>
                <Form.Control as="textarea" value={text} onChange={(e)=> setText(e.target.value)} rows="3" required />
            </Form.Group>
            { userInfo ? (
            <Button variant="primary" type="submit">
              Submit
            </Button>
            ):(
                <Link to="/login"><Button variant="danger">Login</Button></Link>
            )}
          </Form>
          </Col>
        </>
        )}  
        </Row>
    )
}

export default GuideDetail
