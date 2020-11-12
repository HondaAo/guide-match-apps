import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '@brainhubeu/react-carousel/lib/style.css';
import MediaQuery from 'react-responsive';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../auth/AuthState'
import OurCampany from '../layout/OurCompany'

const GuideList = ({ history }) => {
    const [ guides, setGuides ] = useState([])
    const [ destinations, setDestinations ] = useState([])
    const { setUserInfo,userInfo } = useContext(AuthContext);
    useEffect(()=>{
      setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
      Axios.get('/api/guide')
      .then(res => {
          setGuides(res.data)
      })
      .catch(err => console.log(err))
      Axios.get('/api/location/list')
      .then(res => setDestinations(res.data))
      .catch(err => console.log(err))
    },[])
    return (
        <>
        <Helmet>
          <title>You can search your next destination.</title>
        </Helmet>
        <MediaQuery query="(min-width: 767px)">
        <Row className="guide-list-image">
        <div
         style={{ display: 'flex',color: 'white', padding: '3%',height: '80px', justifyContent: 'space-between', width: '100%'}}
        >
          <Link to="/" style={{ color: 'white'}}><h3><strong>Expo-travel</strong></h3></Link>
          { userInfo ? (
            <div style={{ marginRight: '90px'}}>
            <Link to={`/guide`} style={{ color: 'white', marginRight: '30px'}}>Become a guide</Link>
            <Link to={`/mypage/${userInfo._id}`} style={{ color: 'white'}}>My page</Link>
            </div>
          ):(
            <Link to="/login"><button class="ui inverted button">Login</button></Link>
          )}
        </div>
          <div className="text">
          <h2 style={{ fontWeight: '800', fontSize: '60px'}}>New <span >Experience</span> with us</h2> 
          <p>Settle in somewhere new. Discover nearby stays to live, work, or just relax.</p>
          </div>
        </Row>
        <div className="guide-list-place">
          <div className="guidelist-card">
            <Col md={5}>
             <img src="https://images.unsplash.com/photo-1601272211218-78fe77e093b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="100%" height="100%" />
            </Col>
            <Col md={7} style={{ backgroundColor: 'white', padding: '3%'}}>
             <h4><strong>Kuala lumpur</strong></h4>
             <p style={{ marginTop: '20px',lineHeight: '26px'}}>A mix of cultures call Malaysia home and they're evident in the rich artistic hub of its capital. Here there is even diversity in the shopping!</p>
             <Link to={`/place?city=Kuala_Lumpur&country=Malaysia`}><button class="guide-list-button">CHECK MORE</button></Link>
            </Col>
          </div>
          <div className="guidelist-card">
            <Col md={7} style={{ backgroundColor: 'white', padding: '3%'}}>
             <h4><strong>Singapore</strong></h4>
             <p style={{ marginTop: '20px', lineHeight: '30px'}}>The city-state of Singapore is one of Asia's prized gems with islands full of tropical wonders, culinary delicacies, and exotic attractions. The main city reflects this through a beautiful blend of cultures.</p>
             <Link to={`/place?city=Singapore&country=Singapore`}><button class="guide-list-button">CHECK MORE</button></Link>
            </Col>
            <Col md={5}>
             <img src="https://images.unsplash.com/photo-1573525515531-d90d55476c74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"width="100%" height="100%" />
            </Col>
          </div>
        </div>
        <div className="guide-list-other">
         <h2><>Other destinations</></h2>
         <div className="guide-list-other-cards">
          <div className="guide-list-other-card">
           <img src="https://images.unsplash.com/photo-1510379872535-9310dc6fd6a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"width="100%" height="auto" />
           <h4 style={{ marginTop: '20px'}}><strong >Bangkok</strong></h4>
           <p style={{ marginTop: '20px', lineHeight: '30px', fontWeight: '300'}}>This is a city of contrasts at every turn where the familiar and the exotic collide. This City of Angels is the ultimate cultural hub for travelers looking to experience </p>
           <div style={{ width: '100%', textAlign: 'right'}}>
           <button class="ui black button" style={{ alignContent: 'right'}}><Link to={`/place?city=Bangkok&country=Thailand`} style={{ color: 'white'}}>Watch More<i class="angle right icon"></i></Link></button>
           </div>
          </div>
          <div className="guide-list-other-card">
          <img src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"width="100%" height="auto" />
          <h4 style={{ marginTop: '20px'}}><strong >Chiang Mai</strong></h4>
          <p style={{ marginTop: '20px', lineHeight: '30px'}}>The Thai beaches here are some of the finest in the world. In addition to white sand and bustling resorts, Phuket has a unique and colorful old town to explore.</p>
          <div style={{ width: '100%', textAlign: 'right'}}>
           <button class="ui black button" style={{ alignContent: 'right'}}><Link to={`/place?city=Chiang_Mai&country=Thailand`} style={{ color: 'white'}}>Watch More<i class="angle right icon"></i></Link></button>
           </div>
          </div>
          <div className="guide-list-other-card">
          <img src="https://images.unsplash.com/photo-1458013356865-f7ea608ed9a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"width="100%" height="auto" />
          <h4 style={{ marginTop: '20px'}}><strong >Hanoi</strong></h4>
           <p style={{ marginTop: '20px', lineHeight: '30px'}}>History buffs will recall this city's important role in the Vietnam War. In addition to viewing important war relics, there is a fascinating French colonial style here </p>
           <div style={{ width: '100%', textAlign: 'right'}}>
           <button class="ui black button" style={{ alignContent: 'right'}}><Link to={`/place?city=Hanoi&country=Vietnam`} style={{ color: 'white'}}>Watch More<i class="angle right icon"></i></Link></button>
           </div>
          </div>
          <div className="guide-list-other-card">
          <img src="https://images.unsplash.com/photo-1586343275473-d96466f4a94b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"width="100%" height="auto" />
          <h4 style={{ marginTop: '20px'}}><strong >Ho Chi Minh City</strong></h4>
          <p style={{ marginTop: '20px', lineHeight: '30px'}}>Vietnam's capital has a unique city center known for its busy, narrow streets. Among the distinctive Hanoian lifestyle, we'll find centuries-old architecture </p>
          <div style={{ width: '100%', textAlign: 'right'}}>
           <button class="ui black button" style={{ alignContent: 'right'}}><Link to={`/place?city=Ho_Chi_Minh_City&country=Vietnam`} style={{ color: 'white'}}>Watch More<i class="angle right icon"></i></Link></button>
           </div>
          </div>
         </div>
        </div>
        <hr />
    <div className="">
      <Container>
        <Row style={{ display: 'flex', marginTop: '70px'}}>
          <Col md={6}>
           <img src="https://images.unsplash.com/photo-1596574807404-dfb7e486ffd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" width="100%" height="auto" />
          </Col>
          <Col md={6} style={{ padding: '5%'}}>
           <h2><strong>Everyone's Posts</strong></h2>
           <p style={{ marginTop: '60px', lineHeight: '40px'}}>Get to know the sights and sounds of a city, beyond that one main town square. Try climbing the local mountains or skydive over them instead. Just open up the app for access to countless experiences and adventures.</p>
           <Link to="/allpost" style={{ color: '#008489'}}><h5>Watch all posts</h5></Link>
          </Col>
        </Row>
        <Row style={{ display: 'flex', marginTop: '70px', marginBottom: '50px'}}>
          <Col md={6} style={{ padding: '5%'}}>
          <h2><strong>Expo points for next trip</strong></h2>
          <p style={{ marginTop: '60px', lineHeight: '40px'}}>What’s that majestic structure in front of you? Plug in your headphones and find out. SmartGuide sends expertly crafted, engaging audio-stories straight to your ears, so you can stay fully immersed in the world around you, wherever you go.</p>
          <Link to="/setting" style={{ color: '#008489'}}><h5>Learn more about the points</h5></Link>
          </Col>
          <Col md={6}>
           <img src="https://images.unsplash.com/photo-1559271138-f347143c63c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="100%" height="auto" /> 
          </Col>
        </Row>
      </Container>
    </div>
      <OurCampany />
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
      <div className="guide-list-image-iphone">
          <div className="guide-list-image-text-iphone">
          <h2>Unique Experience with us</h2> 
          <p>Settle in somewhere new. Discover nearby stays to live, work, or just relax.</p>
          <button className="ui button black">Get Started</button>
          </div>
      </div> 
      <h5 style={{ margin: '20px'}}>Destinations List</h5>
     { destinations.length === 0 ? null : (
     <div className="destination-list">
      { destinations.map(destination => (
      <Container className="destination-iphone">
      <Link to={`/place?city=${destination.city_url}&country=${destination.country}`} style={{ color: 'black'}}>
       <Row >
         <Col xs={4}>
          <img src={destination.image} width="100%" height="auto"/>
         </Col>
         <Col xs={8} style={{ justifyContent: 'center'}}>
          <p>{destination.city}</p>
          <p style={{ color: 'lightgrey', marginTop: '-5px'}}>{destination.country}</p>
         </Col>
       </Row>
      </Link>
      </Container>
      ))}
      </div>
     )}
     <Container className="other-experience">
      <Row className="unique-list">
          <Col md={4}>
            <Link to="/setting" className="unique-list-card"style={{ color: 'black'}} >
              <div className="unique-list-card-title">
               <img src="https://images.unsplash.com/photo-1504095649265-b37198e9c711?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
              </div>
              <div className="unique-list-card-content" style={{ borderBottomLeftRadius: '30px',borderBottomRightRadius: '30px', border: 'solid 2px lightgrey'}}>
                <strong>Original tour</strong>
                <p>Let's check local tour and guide</p>
              </div>
            </Link>
          </Col>
          <Col md={4}>
          <Link to="/setting" className="unique-list-card" style={{ color: 'black'}}>
              <div className="unique-list-card-title">
               <img src="https://images.unsplash.com/photo-1587127964224-ee5b0a61933d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
              </div>
              <div className="unique-list-card-content"style={{ borderBottomLeftRadius: '30px',borderBottomRightRadius: '30px', border: 'solid 2px lightgrey'}}>
                <strong>Unique store and restaurant</strong>
                <p>Let's unveil local store and restaurant</p>
              </div>
            </Link>
          </Col>
          <Col md={4}>
          <Link to="/setting" className="unique-list-card" style={{ color: 'black'}}>
              <div className="unique-list-card-title" >
               <img src="https://images.unsplash.com/photo-1500981458086-b8a11cd163af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
              </div>
              <div className="unique-list-card-content" style={{ borderBottomLeftRadius: '30px',borderBottomRightRadius: '30px', border: 'solid 2px lightgrey'}}>
                <strong>Traveller's Post</strong>
                <p>Let's check other's posts</p>
              </div>
            </Link>
          </Col>
        </Row>
        <div style={{ width: '100%', textAlign: 'center', margin: "20px 0"}}>
        <Link to={`/allpost`} class="ui secondary button" style={{ width: '100%'}}>
           See all posts
         </Link>
        </div>
     </Container>
     <div className="alert-guide-list">
               <Col xs={{ span: 10, offset: 1}}>
               <div style={{ marginTop: '30px'}}>
                 <strong >About us</strong>
                 <p style={{ marginTop: '10px'}}>Travel expo</p>
                 <p>Our History</p>
                 <p>Contact</p>
                 <p>Creers</p>
                 <p>How we create new society</p>
               </div>
               <hr />
               <div style={{ marginTop: '20px'}}>
                 <strong >Support</strong>
                 <p style={{ marginTop: '10px'}}>COVID-19 news</p>
                 <p>About Privacy</p>
                 <p>Help Center</p>
               </div>
               </Col>
        </div>
      </MediaQuery>
        </>
    )
}

export default GuideList
