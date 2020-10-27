import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GoogleMapReact, { MapOptions, Maps } from 'google-map-react'
import RoomIcon from '@material-ui/icons/Room';
import { Avatar, IconButton } from '@material-ui/core'
import {styles} from './GoogleMapStyle'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Carousel from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css';
import MediaQuery from 'react-responsive';
import SearchIcon from '@material-ui/icons/Search';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../auth/AuthState'
import OurCampany from '../layout/OurCompany'

const GuideList = ({ history }) => {
    const [ guides, setGuides ] = useState([])
    const [ choosingPlace, setChoosingPlace ] = useState('Plase choose location from left map')
    const [ pickedGuides, setPickedGuides ] = useState([]);
    const [ destinations, setDestinations ] = useState([])
    const [ text, setText ] = useState('')
    const [ country, setCountry ] = useState('')
    const { setUserInfo,userInfo } = useContext(AuthContext);
    useEffect(()=>{
      setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
      Axios.get('/api/guide')
      .then(res => {
          console.log(res.data)
          setGuides(res.data)
      })
      .catch(err => console.log(err))
      Axios.get('/api/location/list')
      .then(res => setDestinations(res.data))
      .catch(err => console.log(err))
    },[])
    const pins = [
      {
        lat: 1.287953,
        lng: 103.851959,
        name: 'Singapore'
      },
      {
        lat: 21.033333,
        lng: 105.85,
        name: 'Hanoi'
      },
      {
        lat: 16.0544,
        lng: 1108.221,
        name: 'Danang'
      },
      {
        lat: 2.230,
        lng: 102.30,
        name: 'Malacca'
      },
      {
        lat: 10.762622,
        lng: 106.660172,
        name: 'HoChiMinh'
      },
      {
        lat: 3.3547,
        lng: 117.5965,
        name: 'Borneo'
      },
      {
        lat: 3.140853,
        lng: 101.693207,
        name: 'Kualalumpur'
      }
    ]
    const createMapOptions = (maps) => {
      return {
        mapTypeControlOptions: {
          position: maps.ControlPosition.TOP_RIGHT,
        },
        mapTypeControl: false,
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: styles
      }
    }
    const Search = (e)=>{
      e.preventDefault();
      if( text === 'Hanoi' || text === 'HoChiminh' || text　=== 'Danang'){
        setCountry('Vietnam')
      }
      if( text === 'Kualalupur' || text === 'Malacca'){
        setCountry('Malaysia')
      }
      if( text === 'Singapore'){
        setCountry('Singapore')
      }
      history.push(`/place?city=${text}&country=${country}`)
    }
    return (
        <>
        <Helmet>
          Location List
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
        {/* <Row className="google-map">
        <Col md={7} style={{ height: '75vh'}} >
        <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.GOOGLE_API_KEY,
          language: 'en'
        }}
        defaultCenter={{
          lat: 7.287953,
          lng: 103.851959
        }}
        defaultZoom={5}
        options={createMapOptions}
      >
      {
        pins.map((pin) => (
         
          <pin
            lat={pin.lat}
            lng={pin.lng}
          >
          <IconButton onClick={()=> {
            setChoosingPlace(pin.name)
            Axios.get(`/api/guidelist?place=${pin.name}`)
            .then(res => {
              console.log(res.data)
              setPickedGuides(res.data)
            })
            .catch(err => console.log(err))
          }}>
          <RoomIcon style={{ color : 'red'}}/> 
          <string style={{ color : 'white'}}>{pin.name}</string> 
          </IconButton>
          </pin>
         
        ))
      }
      </GoogleMapReact>
      </Col>
      <Col md={{ span: 4, offset: 1}}>
      <p>Popular destinations</p>
      <hr />
      { destinations.length !== 0  ? (
      <>
      <div className="destination-list-laptop">
      { destinations.map(destination => (
      <Link to={`/place?city=${destination.city}&country=${destination.country}`} style={{ color: 'black'}} className="destination-iphone">
       <Row className="destination-iphone-card">
         <Col xs={3}>
          <img src={destination.image} width="100%" height="auto"/>
         </Col>
         <Col xs={{ span: 8, offset: 1}} style={{ justifyContent: 'center'}}>
          <p>{destination.city}</p>
          <p style={{ color: 'lightgrey', marginTop: '-5px'}}>{destination.country}</p>
         </Col>
       </Row>
      </Link>
      ))}
      </div>
      </>
      ): null}
      </Col>
      </Row> */}
    {/* <div style={{ backgroundColor: 'black', color: 'white'}}>
     <Container>
      <Row >
        <div className="list-header">
        <h2>Find unique experience</h2>
        <h3>________</h3>
        </div>
        <div className="unique-list">
          <Col md={4}>
            <div className="unique-list-card">
              <div className="unique-list-card-title">
               <img src="https://images.unsplash.com/photo-1504095649265-b37198e9c711?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
              </div>
              <div className="unique-list-card-content" >
                <strong>Local Experience</strong>
                <p>Let's check local tour and guide</p>
              </div>
            </div>
          </Col>
          <Col md={4}>
          <div className="unique-list-card">
              <div className="unique-list-card-title">
               <img src="https://images.unsplash.com/photo-1587127964224-ee5b0a61933d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
              </div>
              <div className="unique-list-card-content">
                <strong>Unique store and restaurant</strong>
                <p>Let's unveil local store and restaurant</p>
              </div>
            </div>
          </Col>
          <Col md={4}>
          <div className="unique-list-card">
              <div className="unique-list-card-title">
               <img src="https://images.unsplash.com/photo-1500981458086-b8a11cd163af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
              </div>
              <div className="unique-list-card-content">
                <strong>Experiental Post</strong>
                <p>Let's check other's posts</p>
              </div>
            </div>
          </Col>
        </div>
      </Row>
    </Container>
    </div> */}
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
      {/* <form className="search-bar-iphone" onSubmit={Search}>
      <div class="ui action input" style={{ width: '100%'}}>
        <input type="text" placeholder="Where do you go? ....." value={text} onChange={(e)=> setText(e.target.value)} style={{ width: '70%'}}/>
        <button class="ui icon button" type="submit">
          <i class="search icon"></i>
        </button>
      </div>
      </form> */}
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
