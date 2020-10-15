import React, { useContext, useEffect, useState } from 'react'
import { parse } from 'query-string';
import Axios from 'axios';
import { Row, Col, Card, Button, Container } from 'react-bootstrap'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './Location.css'
import { styles } from './GoogleMapStyle';
import GoogleMapReact from 'google-map-react';
import MediaQuery from 'react-responsive';
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';
import StickyFooter from '../layout/StickyFooter';
import ExploreIcon from '@material-ui/icons/Explore';
import { CSSTransition } from 'react-transition-group';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { AuthContext } from '../auth/AuthState';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Avatar } from '@material-ui/core';

const Location = ({ location }) => {
    const query = parse(location.search)
    const city = query.city
    const country = query.country
    const [ guides, setGuides ] = useState([]);
    const [ place, setPlace ] = useState({ lat: 0, lng: 0});
    const [slide, setSlide] = useState(false);
    const [lock, setLock] = useState(false);
    const { userInfo, setUserInfo } = useContext(AuthContext);
    useEffect(()=>{
      setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
      Axios.get(`/api/location?city=${city}&country=${country}`)
      .then(res=> {
        setPlace(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err))
      Axios.get(`/api/guide/location?city=${city}&country=${country}`)
      .then(res=> {
        setGuides(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err))
    },[])
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
    const Slide = ({ show, ...callBack})=> (
      <CSSTransition
      in={show}
      timeout={400}
      unmountOnExit
      classNames="pop__slide-"
      {...callBack}
    >
      <div className="location-showup pop__slide">
         <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.GOOGLE_API_KEY,
              language: 'en'
            }}
            defaultCenter={{
              lat: place.lat,
              lng: place.lng
            }}
            defaultZoom={13}
            options={createMapOptions}
             >
          { place ? (<pin
          lat={place.lat}
          lng={place.lng}
          >
          </pin>
          ): null}
         </GoogleMapReact> 
       </div>
      </CSSTransition>
    )
    const favoriteHandler = (guide)=>{
    }
    return (
        <>
        <MediaQuery query="(min-width: 767px)">
        <div className="location-page">
         <div className="location-right">
         <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.GOOGLE_API_KEY,
              language: 'en'
            }}
            defaultCenter={{
              lat: place.lat,
              lng: place.lng
            }}
            defaultZoom={13}
            options={createMapOptions}
             >
          { place ? (<pin
          lat={place.lat}
          lng={place.lng}
          >
          </pin>
          ): null}
         </GoogleMapReact> 
         </div>
         <div className="location-left">
         <h3>Picked Place</h3>
         <button class="ui basic button" style={{ margin: '10px'}}>
           Kualum pool
         </button>
         <button class="ui basic button" style={{ margin: '10px'}}>
           Danang
         </button>
         <button class="ui basic button" style={{ margin: '10px'}}>
           Singopore
         </button>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
           <div>
           <h1>{city}</h1>
           <p>Check travel restrictions before booking.Please review and follow government travel guidelines.</p>
           </div>
           <div >
            { guides !== null ? guides.length > 3 ? <ArrowForwardIosIcon /> : null :null}
           </div>
          </div>
          <Container>
              <Row>
            { guides !== null ? (
                guides.map(guide =>(
                  
                  <Col md={4} style={{ marginTop: '30px'}}>
                  <Link to={`/guide/${guide._id}`}>
                   <div class="ui raised card">
                     <div class="content">
                       <div class="header">{guide.title}{' '}</div>
                       <div class="meta">
                         <span class="category">${guide.rate}/ a day</span>
                       </div>
                       <div class="description">
                         <p>Place: {guide.city}/{guide.country}</p>
                         <p>Language: {guide.languages}</p>
                         <p>Autthentication: not yet</p>
                       </div>
                     </div>
                     <div class="extra content">
                       <div className="left floated">
                        <FavoriteBorderIcon onClick={favoriteHandler(guide)} />
                       </div>
                       <div class="right floated author">
                         <img class="ui avatar image" src="/images/avatar/small/matt.jpg" />{guide.name}
                       </div>
                     </div>
                   </div></Link>
                  </Col>
                  
                ))
            ): null}
              </Row>
          </Container>
         </div>   
        </div>
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
        <div style={{ height: '60px',padding: '5%'}}>
         <Link to="/guideList"><ArrowBackIosIcon /></Link>
        </div>
        <div className='location-left-iphone'>
           <div style={{ padding: '5%'}}>
           <h1>{city}</h1>
           <p>Check travel restrictions before booking.Please review and follow government travel guidelines.</p>
           <button class="ui basic button" style={{ margin: '10px'}}>
            Kualum pool
           </button>
           <button class="ui basic button" style={{ margin: '10px'}}>
             Danang
           </button>
           <button class="ui basic button" style={{ margin: '10px'}}>
             Bankok
           </button>
           <button class="ui basic button" style={{ margin: '10px'}}>
             HoChiMinh
           </button>
           </div>
           <div className={ slide ? 'displayNone' : 'location-iphone-header' }>
           <div>
             <h3>Newer guides</h3>
             <hr />
           </div>
          </div>
          <div className={ slide ? 'displayNone' : null }>
            <div className="iphone-container-guide-list" style={{  marginTop: '30px'}}>
            { guides !== null ? (
                guides.map(guide =>(
                   <div class="ui raised card" style={{ width: '100%', border: 'solid 1px lightgrey', borderRadius: '20px'}} >
                     <div class="content">
                       <Link to={`/guide/${guide._id}`} style={{ color: 'black', textDecoration: 'none'}}><div class="">{guide.title}</div></Link>
                       <div className="meta" style={{ display: 'flex',justifyContent: 'space-between'}}>
                         <span className="category">${guide.rate}/ a day</span>
                         { guide.image !== "" ? <img src={guide.image} /> : <Avatar /> }
                       </div>
                       <div class="description">
                         <p>Place: {guide.city}/{guide.country}</p>
                         <p>Experience: {guide.experience < 3 ? 'novice guide' : 'well-experienced guid' } </p>
                         <p>Language: {guide.languages}</p>
                       </div>
                     </div>
                     <div class="extra content">
                       <div className="left floated">
                        <FavoriteBorderIcon onClick={()=>{
                          const favorite = {
                            name: guide.name,
                            guideId: guide._id,
                            city: guide.city,
                            country: guide.country,
                            title: guide.title,
                            image: guide.image
                          }
                          Axios.post(`/api/user/favorite/${userInfo._id}`,favorite)
                          .then(res => alert(res.data))
                          .catch(err => alert(err))
                        }} />
                       </div>
                       <div class="right floated author">
                         <StarIcon /> {guide.star}
                       </div>
                     </div>
                   </div>
                ))
            ): <h3>Currently No Guide Exists</h3>}
              </div>
            <div className="">

            </div>
          </div>
         </div> 
         <Slide
            show={slide}
          />
         <div className="map-button">
           <button style={{ backgroundColor: 'black', color: 'white', borderRadius: '20px'}} onClick={()=> setSlide(prev => !prev)}><ExploreIcon />{' '}Map</button>
         </div>
         <StickyFooter />
        </MediaQuery>
        </>
    )
}

export default Location
