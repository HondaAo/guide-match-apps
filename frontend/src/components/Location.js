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
         { place ? (
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
          <pin
          lat={place.lat}
          lng={place.lng}
          >
          </pin>
         </GoogleMapReact>  ): null}
         </div>
         <div className="location-left">
         <h3>Picked Place</h3>
         <Link to={`/place?city=Kualalumpur&country=Malaysia`}>
           <button class="ui basic button" style={{ margin: '10px'}}> Kuala lumpur</button>
         </Link>
         <Link to={`/place?city=Malacca&country=Malaysia`}>
           <button class="ui basic button" style={{ margin: '10px'}}> Malacca</button>
         </Link>
         <Link to={`/place?city=Bangkok&country=Thailand`}>
           <button class="ui basic button" style={{ margin: '10px'}}> Bangkok</button>
         </Link>
         <Link to={`/place?city=Danang&country=Vietnam`} class="ui basic button" style={{ margin: '10px'}}>
           Danang
         </Link>
         <Link to={`/place?city=Singapore&country=Singapore`} class="ui basic button" style={{ margin: '10px'}}>
           Singopore
         </Link>
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
        <div className='location-left-iphone'>
           <header style={{ paddingLeft: '3%', display: 'flex'}}>
            <Link to="/guideList"><ArrowBackIosIcon style={{ marginRight: '20px'}} /></Link>
            <strong>{city}</strong>
           </header>
           <div className={ slide ? 'displayNone' : 'location-iphone-header' }>
             <p style={{ color: 'lightgrey'}}> the result of 「{city},{country}」</p>
          </div>
          <div className={ slide ? 'displayNone' : null }>
            <div className="iphone-container-guide-list" style={{  marginTop: '30px'}}>
            { guides !== null ? (
                guides.map(guide =>(
                <Link to={`/guide/${guide._id}`} style={{ color: 'black', textDecoration: 'none'}}>
                   <div class="guide-card" style={{ width: '100%'}} >
                     <div class="content" style={{ width: '100%', position: 'relative'}}>
                       <img src={guide.landscape} style={{ width: '100%', maxHeight: '200px', borderRadius: '10px',}} />
                       <FavoriteBorderIcon onClick={()=>{
                          const favorite = {
                            name: guide.name,
                            guideId: guide._id,
                            city: guide.city,
                            country: guide.country,
                            title: guide.title,
                            image: guide.image,
                            landscape: guide.landscape
                          }
                          Axios.post(`/api/user/favorite/${userInfo._id}`,favorite)
                          .then(res => alert(res.data))
                          .catch(err => alert(err))
                           
                        }} 
                        style={{ position: 'absolute', top:'10px',left: '10px'}}
                        />
                     </div>
                     <div class="guide-card-content">
                      <StarIcon style={{ color: 'red'}} />{guide.star}<br/>
                      <strong>{guide.title}{' '}{guide.name}</strong>
                      <p>{guide.description}</p>
                      <p style={{ color: 'lightgrey'}}>${guide.rate}/ a day</p>
                     </div>
                    </div>
                </Link>
                ))
            ): <strong>Currently No Guide Exists</strong>
               }
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
