import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthState'
import { Avatar } from '@material-ui/core'
import MediaQuery from 'react-responsive'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarIcon from '@material-ui/icons/Star';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import FlagIcon from '@material-ui/icons/Flag';

const GuideDetail = ({match,history}) => {
    const [ guide, setGuide] = useState(null)
    const [ text, setText ] = useState('');
    const [ message, setMessage ] = useState(null);
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const guideId = match.params.id
    useEffect(()=>{
        setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
        console.log(userInfo)
        Axios.get(`/api/guide/guidelist/${guideId}`)
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
        const { data } = await Axios.post(`/api/chat`,chat)
        if(data){
            history.push(`/message?userId=${data.userId}&myId=${data.myId}`)
        }
    }
    return (
      <>
    <MediaQuery query="(min-width: 767px)">
      <Container>
        <Row style={{ marginTop: '10%'}}>
        {!guide ? <div className="ui active inline loader"></div> :(
        <>
          <Col md={6}>
          <strong>Details</strong>
          <ListGroup variant="flush">
            {/* <ListGroup.Item>Language:{' '}{guide.languages.map(item => <strong>{item}{' '}</strong>)}</ListGroup.Item> */}
            <ListGroup.Item>Place:{' '}<strong>{guide.city} {' '}{ guide.country}</strong></ListGroup.Item>
            <ListGroup.Item>Rating:{' '}<i class="star icon"></i>{' '}<strong>{guide.star}</strong></ListGroup.Item>
            <ListGroup.Item>Experience:{' '}<strong>{guide.experience}</strong></ListGroup.Item>
            <ListGroup.Item>Comments:{' '}<p>{guide.description}</p></ListGroup.Item>
          </ListGroup>
          </Col>
          <hr />
          <Col md={6} style={{ paddingLeft: '5%'}}>
          <strong>Review</strong>
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
          <strong>Get Contact</strong>
          { message ? <Alert variant="primary">{message}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Comments</Form.Label>
                <Form.Control as="textarea" value={text} onChange={(e)=> setText(e.target.value)} rows="3" required />
            </Form.Group>
            { userInfo ? (
            <Button variant="secondary" size="lg" block type="submit">
              Submit
            </Button>
            ):(
              <>
                <Link to="/login"><Button variant="danger">Login</Button></Link>
                <p style={{ fontWeight:'300', color: 'lightgrey'}}>You need to login before sendding message</p>
              </>
            )}
          </Form>
          </Col>
        </>
        )}  
        </Row>
      </Container>
    </MediaQuery>
      { guide ? (
      <MediaQuery query="(max-width: 767px)">
      <header style={{ margin: '3%', display: 'flex', justifyContent: 'space-between'}}>
        <div>
            <Link to={`/place?city=${guide.city}&country=${guide.country}`}>
            <ArrowBackIosIcon style={{ marginRight: '20px'}} /></Link>
            <strong>{guide.name}</strong>
        </div>
        <div>
          <FavoriteBorderIcon />
        </div>
      </header>
      <div className="guide-detail-img">
        <img src={guide.landscape} width="100%" height="auto" />
      </div>
      <div className="guide-detail-content">
       <h2>{guide.title}</h2>
       <div className="guide-detail-content-header">
        <div>
         <p><StarIcon style={{ color: 'red'}} />{guide.star}</p>
         <p><Link to={`/place?city=${guide.city}&country=${guide.country}`} style={{ color: 'lightgrey'}}>{guide.country},{guide.city}</Link></p>
       </div>
       <div style={{margin: '0 50px'}}>
         <strong>{guide.name}</strong>
       </div>
      
      </div>
      <hr />
      <div className="">
        <h4>Thank you for watching me</h4>
        <p style={{ marginTop: '20px'}}> {guide.description}</p>
      </div>
      <hr />
      <div className="guide-review">
        {guide.reviews.length > 0 ? (
        guide.reviews.map(review => (
        <div className="guide-review-cards">
         <div className="guide-review-card">
         <h2>{review.name}{' '}<StarIcon style={{ color: 'red'}} />{review.rating}{' '}</h2>

         <p> comment: {review.comment}</p>
         </div>
        </div>
        ))
        ):( <h3>No review</h3> )}
      </div>
      <hr />
      </div>
      <div className="guide-detail-bottom">
        <div>
          <h3><strong>${guide.rate}</strong></h3>
          <p><StarIcon style={{ color: 'red'}} />{guide.star}</p>
        </div>
        <div>
          <Link to={`/message?userId=${guide._id}&myId=${userInfo._id}`}>
          <button className="ui button youtube">
            Go chat page
          </button></Link>
        </div>
      </div>
      <div className="guide-detail-detail">
       <div style={{ display: 'flex', justifyContent: 'space-between' , padding: '5%'}}>
       <div>
       <h4>Hosted by <strong>{guide.name}</strong></h4>
       <p>{guide.country}</p>
       <p>{guide.city}</p>
       <div style={{ margin: '15px 0'}}>
       <h4><AssignmentTurnedInIcon />{' '}{!guide.isPro ? 'Amatuar' : <>Pro guide</>}</h4>
       <h4><AttachMoneyIcon />{' '}{guide.rate}</h4>
       </div>
       </div>
       <img src={guide.image} alt="img" width="100px" height="100px" style={{ borderRadius: '50%'}} />
      </div>
      </div>
      <hr />
      <div className="report">
        <h3><Link to="/report"><FlagIcon />Report this guide</Link></h3>
      </div>
      <hr />
      <div className="contact-guide">
        <h3>Contact</h3>
      <Form onSubmit={onSubmit}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" value={text} onChange={(e)=> setText(e.target.value)} rows="3" required />
            </Form.Group>
            { userInfo ? (
            <Button variant="secondary" size="lg" block type="submit">
              send
            </Button>
            ):(
              <>
                <Link to="/login"><Button variant="danger">Login</Button></Link>
                <p style={{ fontWeight:'300', color: 'lightgrey'}}>You need to login before sendding message</p>
              </>
            )}
      </Form>
      </div>
      </MediaQuery>
      ): null}
      </>
    )
}

export default GuideDetail
