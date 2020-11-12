import React, { useContext, useEffect, useState } from 'react'
import { parse } from 'query-string';
import Axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap'
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
import Score from '../layout/Score';
import createHistory from 'history/createBrowserHistory'
import { IdentityStore } from 'aws-sdk';


const Location = ({ location }) => {
    const query = parse(location.search)
    const city = query.city
    const country = query.country
    const [ guides, setGuides ] = useState([]);
    const [ place, setPlace ] = useState({ lat: 0, lng: 0});
    const [ slide, setSlide] = useState(false);
    const [ data, setData ] = useState({});
    const [images, setImages ] = useState([]);
    const [ others, setOthers ] = useState([]);
    const [ page, setPage ] = useState(0);
    const [ tours, setTours ] = useState([]);
    const { userInfo, setUserInfo } = useContext(AuthContext);
    useEffect(()=>{
      setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
      Axios.get(`https://www.triposo.com/api/20200803/location.json?id=${city}&account=FK8A06GJ&token=${process.env.REACT_APP_API_TOKEN}`)
      .then(res => {
        setData(res.data.results[0])
        setImages(res.data.results[0].images)
        console.log(res.data.results[0])
        if(data){
        Axios.get(`/api/guide/location?city=${city}&country=${country}`)
       .then(res=> {
        setGuides(res.data)
       })
       .catch(err => console.log(err))
       Axios.get(`/api/tour/tour/location?city=${city}&country=${country}`)
       .then(res=> {
        setTours(res.data)
       })
       .catch(err => console.log(err))
       }
      })
      .catch(err => console.log(err))
      
      Axios.get(`https://www.triposo.com/api/20200803/location.json?part_of=${country}&tag_labels=city&count=10&order_by=-score&account=FK8A06GJ&token=${process.env.REACT_APP_API_TOKEN}`)
      .then(res => {
        console.log(res.data)
        setOthers(res.data.results)
      })
      .catch(err => console.log(err))
    },[])
    function reloadPage(){ 
      setTimeout(() => {
      const history = createHistory();
      history.go(0)
      })
    }
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
    return (
        <>
        <MediaQuery query="(min-width: 767px)">
          <div
           style={{ display: 'flex', padding: '3%',height: '60px', justifyContent: 'space-between', width: '100%'}}
          >
            <h3><strong><Link to="/" style={{ color: 'black'}}>Expo-travel</Link></strong></h3>
            { userInfo ? (
              <div style={{ marginRight: '90px'}}>
              <Link to={`/guide`} style={{ color: 'black', marginRight: '30px'}}>Become a guide</Link>
              <Link to={`/mypage/${userInfo._id}`} style={{ color: 'black'}}>My page</Link>
              </div>
            ):(
              <Link to="/login">Login</Link> 
            )}
          </div>
        <hr />
         <div className="location-page">
         <div className="location-left">
          <div className="location-left-title">
           <h1>{data.name}</h1>
           { page === 0 && <button class="ui basic button" onClick={()=> setPage(prev => prev + 1)}>Go tour page</button>}
           { page === 1 && <button class="ui basic button" onClick={()=> setPage(prev => prev - 1)}>Go guide page</button>}
           </div>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <p style={{ marginTop: '30px'}}>{data.snippet}</p>
           <div >
            { guides !== null ? guides.length > 3 ? <ArrowForwardIosIcon /> : null :null}
           </div>
          </div>
          <Container>
              <Row className="guide-list-cards">
            { page === 0 ? (
            <>
            { guides.length > 0 ? (
                guides.map(guide =>(
                <div  style={{ marginTop: '30px'}}>
                  <Link to={`/guide/${guide._id}`} style={{ color: 'black', textDecoration: 'none'}}>
                   <div class="guide-card" style={{ width: '100%', display: 'flex'}} >
                     <div class="content" style={{ width: '40%', position: 'relative'}}>
                       <img src={guide.landscape} style={{ width: '100%', maxHeight: '200px', borderRadius: '10px',}} />
                       <FavoriteBorderIcon onClick={()=>{
                         const guideId = {
                            id: guide._id
                         }
                          Axios.post(`/api/user/favorite/${userInfo._id}`,guideId)
                          .then(res => alert(res.data))
                          .catch(err => alert(err))
                           
                        }} 
                        style={{ position: 'absolute', top:'10px',left: '10px'}}
                        />
                     </div>
                     <div class="guide-card-content" style={{ width: '60%'}}>
                      <StarIcon style={{ color: 'red'}} />{guide.star}<br/>
                      <strong>{guide.title}{' '}{guide.name}</strong>
                      <p>{guide.description}</p>
                      <p style={{ color: 'lightgrey'}}>${guide.rate}/ a day</p>
                     </div>
                    </div>
                </Link>
                <hr />
                </div>
                  
                ))
            ): (
              <h2 style={{ marginTop: '50px'}}>Currently No guide exists</h2>
            )}
            </>
            ): null}
            { page === 1 ? (
            <>
            { tours.length > 0 ? (
                tours.map(guide =>(
                <div  style={{ marginTop: '30px'}}>
                  <Link to={`/tour/${guide._id}`} style={{ color: 'black', textDecoration: 'none'}}>
                   <div class="guide-card" style={{ width: '100%', display: 'flex'}} >
                     <div class="content" style={{ width: '40%', position: 'relative'}}>
                       <img src={guide.image.url} style={{ width: '100%', maxHeight: '200px', borderRadius: '10px',}} />
                     </div>
                     <div class="guide-card-content" style={{ width: '60%'}}>
                      <strong>{guide.title}</strong>
                      <p>{guide.description}</p>
                      <p style={{ color: 'lightgrey'}}>${guide.charge}/ person</p>
                     </div>
                    </div>
                </Link>
                <hr />
                </div>
                  
                ))
            ): (
              <h2 style={{ marginTop: '50px'}}>Currently No tours registered!</h2>
            )}
            </>
            ): null}
            </Row>

          </Container>
          <div className="location-others">
               <h3>people also go to ....</h3>
          <div className="other-cards">
              { others.map(city => (
                <>
                <Link to={`/place?city=${city.id}&country=${city.country_id}`} onClick={ reloadPage }  className="other-city-card">
                  <img src={city.images[0].source_url} />
                  <div className="">
                   <h3>{city.name}</h3>
                   <p>rating:<Score rating={city.score} /></p>
                   <p>{city.snippet}</p>
                  </div>
                </Link>
                </>
              ))}
              </div>
        </div>
         </div> 
         <div className="location-right">
          <h3 style={{ marginTop: '30px'}}>Pictures in {city}</h3>
         { images.map(image => (
           <>
           <img src={image.source_url}  width="100%" height="auto"/>
           <p>{image.caption}</p>
           </>

         ))}
         </div>  
        </div>
        <div className="home-image">
            <Container>
             <Row>
               <Col md={3} style={{ marginTop: '30px'}}>
                 <strong >About us</strong>
                 <p style={{ marginTop: '10px'}}>Travel expo</p>
                 <p>Our History</p>
                 <p>Contact</p>
                 <p>Careers</p>
                 <p>How we create new society</p>
               </Col>
               <Col md={3} style={{ marginTop: '30px'}}>
                 <strong >Guide</strong>
                 <p style={{ marginTop: '10px'}}>Travel expo</p>
                 <p>Our History</p>
                 <p>Contact</p>
                 <p>Careers</p>
                 <p>How we create new society</p>
               </Col>
               <Col md={3} style={{ marginTop: '20px'}}>
                 <strong >Community</strong>
                 <p style={{ marginTop: '10px'}}>COVID-19 news</p>
                 <p>About Privacy</p>
                 <p>Help Center</p>
               </Col>
               <Col md={3} style={{ marginTop: '20px'}}>
                 <strong >Support</strong>
                 <p style={{ marginTop: '10px'}}>COVID-19 news</p>
                 <p>About Privacy</p>
                 <p>Help Center</p>
               </Col>
              </Row>
             </Container>
            </div>
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
        <div className='location-left-iphone'>
           <header style={{ paddingLeft: '3%', display: 'flex'}}>
            <Link to="/guideList"><ArrowBackIosIcon style={{ marginRight: '20px'}} /></Link>
            <strong>{data.name}</strong>
           </header>
           <div className={ slide ? 'displayNone' : 'location-iphone-header' }>
             <p style={{ color: 'lightgrey'}}> the result of 「{city},{country}」</p>
          </div>
          <div className={ slide ? 'displayNone' : null }>
            <div className="iphone-container-guide-list" style={{  marginTop: '30px'}}>
            { guides.length > 0 ? (
                guides.map(guide =>(
                <Link to={`/guide/${guide._id}`} style={{ color: 'black', textDecoration: 'none'}}>
                   <div class="guide-card" style={{ width: '100%'}} >
                     <div class="content" style={{ width: '100%', position: 'relative'}}>
                       <img src={guide.landscape} style={{ width: '100%', maxHeight: '200px', borderRadius: '10px',}} />
                       <FavoriteBorderIcon onClick={()=>{
                          const id = {
                            guideId: guide._id
                          }
                          Axios.post(`/api/user/favorite/${userInfo._id}`,id)
                          .then(res => alert(res.data))
                          .catch(err => alert(err))
                           
                        }} 
                        style={{ position: 'absolute', top:'10px',left: '10px', zIndex: '100'}}
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
            ): <h3><strong>Currently No Guide Exists</strong></h3>
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
