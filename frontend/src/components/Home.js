import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Component.css'
import MediaQuery from "react-responsive";
import { Container, IconButton } from '@material-ui/core'
import StickyFooter from '../layout/StickyFooter'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SearchIcon from '@material-ui/icons/Search';
import { AuthContext } from '../auth/AuthState'
import { Helmet } from 'react-helmet';
import Footer from '../layout/Footer'
import OurCompany from '../layout/OurCompany'

const scrollTop = () => {
  return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
};


const Home = ({history}) => {
    const [ button, setButton ] = useState('Home')
    const [isTop, setIsTop] = useState(true);
    const [text, setText] = useState('')
    const { logout, userInfo, setUserInfo } = useContext(AuthContext);
    useEffect(()=>{
     setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    },[])
    useEffect(() => {
      document.addEventListener("scroll", onScroll);
      return () => document.removeEventListener("scroll", onScroll);
    });
    const onScroll = ()=>{
      const position = scrollTop();
    　if (position >= 80) {
      setIsTop(false);
    　} else {
      setIsTop(true);
    　}
    }
    const onSubmit=()=>{
      history.push(`/guideList`)
    }
    return (
        <>
        <MediaQuery query="(min-width: 767px)">
         <div className="image-header">
           <header className="image-header-header">
             <Container>
               <Row>
                 <Col md={6}>
                  <h3 style={{ fontSize: '40px'}}>Expo-travel</h3>
                 </Col>
                 <Col md={6} style={{ textAlign: 'right'}}>
                { userInfo ? (
                  <>
                  <Link to="/guide"><button className="ui inverted button">Become a guide</button></Link>
                  <Link  to={`/mypage/${userInfo._id}`} style={{ marginLeft: '20px'}}><button className="ui inverted button">My page</button></Link>
                  </>
                ): (
                  <Link to="/login"><button class="ui inverted button">Login</button></Link>
                )}
                 </Col>
               </Row>
             </Container>
           </header>
           <div className="image-header-text">
            <h2 style={{ fontSize: '50px', fontWeight: '700'}}>Explore new <span style={{ color: '#e5474b'}}>experience</span></h2>
            <p>Explore somewhere new. Discover new local friends to travel, work, or just relax.</p>
            <Link to="/guideList"><button class="ui inverted button">Start exploring</button></Link>
          </div>
         </div>
         <div className="home-second-contents">
         <div className="home-second-about">
             <h1 style={{ color:'#e5474b'}}>About us</h1>
             <p style={{ marginTop: '40px', textAlign: 'left', lineHeight: '40px'}}>Whether you’re looking for a guide  for your next trip or an unique tour for the special experience, a warm welcome awaits. Behind every guide and tour is a real person who can give you the details you need to check in .
             Expo's Experiences are not your typical tour. Whether you’re on a trip, exploring your own city, or staying at home, learn something new from an expert guide. We are preparing for your any question, please contact us if you have a question.</p>
             <Link to="aboutUs"><button class="ui negative basic button">LEARN MORE</button></Link>
         </div>  
         <div className="pickedUp">
         <Container>
            <Row>
                <Col md={6} style={{ padding: '5%'}}>
                <Link to={`/guideList`} style={{ color: '#e5474b',marginBottom: '50px', fontSize: '25px'}}>
                  <strong>Search a unique guide</strong>
                </Link >
                <img style={{ marginTop: '30px'}} src="https://images.unsplash.com/photo-1504807959081-3dafd3871909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="70%" height="auto" />
                <p style={{ marginTop: '30px', width: '80%', lineHeight: '30px'}}>Do you have any plans for your next trip if you do not have anything, our guide provide a huge fun feel free to adking them. Let's search unique guide!!</p>
                </Col>
                <Col md={6} style={{ padding: '5%'}}>
                 {userInfo ?
                 ( <Link to={`/guide`} style={{ color: '#e5474b', marginBottom: '50px', fontSize: '25px'}}>
                    <strong style={{ marginBottom: '20px'}}>Earn money as guide</strong>
                  </Link>
                 ):(
                  <Link to={`/login`} style={{ color: '#e5474b', marginBottom: '50px', fontSize: '25px'}}>
                  <strong style={{ marginBottom: '20px'}}>Earn money as guide</strong>
                  </Link>
                 )}
                  <img style={{ marginTop: '30px'}} src="https://images.unsplash.com/photo-1552925690-47ab745613c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="70%" height="auto" />
                  <p style={{ marginTop: '30px', width: '80%', lineHeight: '30px'}}>Our service is running in four countries, Singapore, Thailand, Malaysia and Vietnam. Please join our team and earn money. Let's start!</p>
                </Col>
            </Row>
            </Container>
            </div>
            </div>
            <div className="unique-experience">
              <div className="unique-experience-header">
              <div className="unique-experience-header-left">
               <h2>Unique Experiences</h2>
               <p>Join interactive, global adventures with inspiring, kid-friendly guides.Explore all</p>
               </div>
               <div className="unique-experience-header-right">
                <Link to="/allpost"><button class="ui inverted red basic button">View All Posts</button></Link>
               </div>
              </div>
              <Container>
                <Row>
                  <Col md={4}>
                    <Card style={{ marginTop: '20px'}}>
                    <Card.Img variant="top" src="https://images.unsplash.com/photo-1506801310323-534be5e7a730?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <Card.Body className="unique-experience-body">
                      <Card.Text >
                        <p>This picture was taken by traveller in Thailand, this landscape is common in that country.</p>
                      </Card.Text>
                    </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card style={{ marginTop: '20px'}}>
                    <Card.Img variant="top" src="https://images.unsplash.com/photo-1510205431450-54dfb096d46e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <Card.Body className="unique-experience-body">
                      <Card.Text >
                        <p>This picture was my special memory. I had a huge joy with making local food with this guy.</p>
                      </Card.Text>
                    </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card style={{ marginTop: '20px'}}>
                    <Card.Img variant="top" src="https://images.unsplash.com/photo-1515662139884-1ba754b53417?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <Card.Body className="unique-experience-body">
                      <Card.Text >
                        <p>Photo in Pucket in Thailand with my first time seeing and riding an elephant</p>
                      </Card.Text>
                    </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>

            </div>
            <OurCompany />
            </MediaQuery>
            <MediaQuery query="(max-width: 767px)">
            <div style={{ overflow: 'auto'}}>
            { !isTop ? 
            ( 
            <header className="header-iphone-search-bar" >
              <form class="search" onSubmit={onSubmit}> <input type="text" class="search-input" placeholder="Where do you go next ?" name="" onChange={(e)=> setText(e.target.val)} /><button type="submit" style={{ border: 'none', borderRadius: '20px'}}><SearchIcon style={{ color: 'pink'}} /></button> </form>
            </header> 
            ): null }
             <Row className="image-header-iphone">
               <h1 >Explore New World</h1>
               <p >Our service is especially for traveller and inhabitants who are looking forward to seeing with new oppurtunity</p>
             </Row>
             <Row className="top-contents-iphone">
              {/* <Col xs={{ span: '10', offset: '1'}}>
              <h5 style={{ marginLeft: '15px'}}>Popular destinations</h5>
               <Link to={`/place?city=Singapore&country=Singapore`} style={{ color: 'black',padding: '3%'}}>
               <div className="card-iphone-image" style={{ borderRadius: '30px', }}>
                  <img src="https://images.unsplash.com/flagged/photo-1562503542-2a1e6f03b16b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" height="auto" width="fit-content" />
                <div className="content" style={{ padding: '2%'}}>
                  <div style={{ marginBottom: '4px'}}><strong>Singapore</strong></div>
                  <div className="meta">
                    <p style={{ color: 'lightgrey'}}>Singapore</p>
                  </div>
                </div>
               </div>
               </Link>
              </Col> */}
              <h5 style={{ marginLeft: '45px'}}>Popular destinations</h5>
              <div className="iphone-container">
               <Link to={`/place?city=Kuala_Lumpur&country=Malaysia`} className="card-iphone">
                <div className="card-iphone-title">
                  <img src="https://images.unsplash.com/photo-1582888736122-1b8900c586ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                </div>
                <div className="card-iphone-content">
                  <strong>Kuala lumpur</strong>
                  <p>Malaysia</p>
                </div>
               </Link>
               <Link to={`/place?city=Singapore&country=Singapore`} className="card-iphone">
                <div className="card-iphone-title">
                  <img src="https://images.unsplash.com/flagged/photo-1562503542-2a1e6f03b16b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                </div>
                <div className="card-iphone-content">
                  <strong>Singapore</strong>
                  <p>Singapore</p>
                </div>
               </Link>
               <Link to={`/place?city=Hanoi&country=Vietnam`} className="card-iphone">
                <div className="card-iphone-title">
                  <img src="https://images.unsplash.com/photo-1533497394934-b33cd9695ba9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                </div>
                <div className="card-iphone-content">
                  <strong>Hanoi</strong>
                  <p>Vietnam</p>
                </div>
               </Link>
               <Link to={`/place?city=Bangkok&country=Thailand`} className="card-iphone">
                <div className="card-iphone-title">
                  <img src="https://images.unsplash.com/photo-1510379872535-9310dc6fd6a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                </div>
                <div className="card-iphone-content">
                  <strong>Bankok</strong>
                  <p>Thailand</p>
                </div>
               </Link>
              </div>
              <Link to="/guideList" class="fluid ui basic button" style={{ marginLeft: '30px'}}>
                Check More destinations
                <i class="angle double right icon"></i>
              </Link>
              <h5 style={{ marginLeft: '45px', marginTop: '20px'}}>Unique Experiences</h5>
              <div className="iphone-container">
               <Link to={`/allpost`} className="card-iphone">
                <div className="card-iphone-title">
                  <img src="https://images.unsplash.com/photo-1549641951-32b98701e434?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                </div>
                <div className="card-iphone-content">
                  <strong>Race fileds</strong>
                  <p>Vietnam</p>
                </div>
               </Link>
               <Link to={`/allpost`} className="card-iphone">
                <div className="card-iphone-title">
                  <img src="https://images.unsplash.com/photo-1506801310323-534be5e7a730?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                </div>
                <div className="card-iphone-content">
                  <strong>travel around Bongkok by boat</strong>
                  <p>Bankok Thailand</p>
                </div>
               </Link>
               <Link to={`/allpost`} className="card-iphone">
                <div className="card-iphone-title">
                  <img src="https://images.unsplash.com/photo-1515662139884-1ba754b53417?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                </div>
                <div className="card-iphone-content">
                  <strong>Playing with Elephant</strong>
                  <p>Thailand</p>
                </div>
               </Link>
               <Link to={`/allpost`} className="card-iphone">
                <div className="card-iphone-title">
                  <img src="https://images.unsplash.com/photo-1509682841784-c7960cbb7608?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                </div>
                <div className="card-iphone-content">
                  <strong>Various Festivals</strong>
                  <p>Thailand, Vietnam, Malaysia</p>
                </div>
               </Link>
              </div>
              <Link to="/allpost" class="fluid ui basic button" style={{ marginLeft: '30px'}}>
                Check More Guides and Tours
                <i class="angle double right icon"></i>
              </Link>
              <div className="alert">
               <Col xs={{ span: 10, offset: 1}}>
               <div>
               <h3> Let's Travel safely</h3>
               <p style={{ marginTop: '15px'}}>We’ve established enhanced cleaning protocols, developed by experts, for both Stays and Experiences to help keep you safe on every trip. </p>
               <p style={{ marginTop: '15px'}}>Treat your host’s space and neighborhood with respect – wear a mask, wash your hands, avoid large gatherings, and stay 6 feet apart whenever possible</p>
               <p style={{ marginTop: '15px'}}>Prioritize your safety, and be aware of local COVID-19 rules and expectations. Don’t travel if you’ve been exposed to or have symptoms of COVID-19.</p>
               </div>
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
                 <Link to="https://www.termsfeed.com/live/9984ee1b-f3a6-48b0-8509-aba1a8442292">About Privacy</Link>
                 <p>Help Center</p>
               </div>
               </Col>
              </div>
             </Row>
            </div>
            </MediaQuery>
        </>
    )
}

export default Home
