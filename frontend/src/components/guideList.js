import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
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

const GuideList = ({ history }) => {
    const [ guides, setGuides ] = useState([])
    const [ choosingPlace, setChoosingPlace ] = useState('Plase choose location from left map')
    const [ pickedGuides, setPickedGuides ] = useState([]);
    const [ destinations, setDestinations ] = useState([])
    const [ text, setText ] = useState('')
    const [ country, setCountry ] = useState('')
    useEffect(()=>{
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
        <MediaQuery query="(min-width: 767px)">
        <Row className="guide-list-image">
          <div className="text">
          <h2>New Experience with us</h2> 
          <p>Settle in somewhere new. Discover nearby stays to live, work, or just relax.</p>
          </div>
        </Row>
        
        <Row className="google-map">
        <Col md={7} style={{ height: '75vh'}} >
          <h2>Popular destination In South East Asia</h2>
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
      <Col md={5}>
      <p>Popular destinations</p>
      <hr />
      { destinations.length !== 0  ? (
      <>
      { destinations.map(destination => (
      <Link to={`/place?city=${destination.city}&country=${destination.country}`} style={{ color: 'black'}}>
       <Row className="destination-iphone">
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
      </>
      ): null}
      </Col>
      </Row>
      <Row>
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
              <div className="unique-list-card-content">
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
      <Row className="our-aim">
        <Col md={6}>
          <h2>
            <strong>
             The society we gonna create<br />
             Everyone can live without any racism<br />
             with Every lives matter
            </strong>
          </h2>
        </Col>
        <Col md={6}>
          <p style={{ fontWeight: '300', fontSize: '25px'}}>
          We reject racism or bigotry of any kind. But now is a time for action rather than words. So we’d like to share with you, Project Lighthouse, a groundbreaking initiative launching in the United States to uncover, measure, and overcome discrimination when booking or hosting on
          </p>
        </Col>
      </Row>
      <Row style={{ marginTop: '100px'}}>
        <Col md={{ span:6, offset: 3}} style={{ textAlign: 'center'}}>
          <h2>Explore a world of travel with Expo</h2>
          <Link to="/aboutUs">see our unique service</Link>
        </Col>
      </Row>
      <Row className="footer-list-image">
       <h3>Find Next Destination</h3>
      </Row>
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
      <Link to={`/place?city=${destination.city}&country=${destination.country}`} style={{ color: 'black'}}>
       <Row className="destination-iphone">
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
     )}
     <div className="other-experience">
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
        <div style={{ width: '100%', textAlign: 'center', marginTop: "-20px"}}>
        <button class="ui secondary button">
           See all posts
         </button>
        </div>
     </div>
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
