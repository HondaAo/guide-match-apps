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

const scrollTop = () => {
  return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
};


const Home = () => {
    const [ button, setButton ] = useState('Home')
    const [isTop, setIsTop] = useState(true);
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
    const onFocus=()=>{

    }
    return (
        <>
        <MediaQuery query="(min-width: 767px)">
         <div className="image-header">
           <header className="image-header-header">
             <Container>
               <Row>
                 <Col md={6}>
                  <h3>Expo-travel</h3>
                 </Col>
                 <Col md={6} style={{ textAlign: 'right'}}>
                { userInfo ? (
                  <Link to="/guide"><button className="ui inverted button">Become a guide</button></Link>
                ): (
                  <Link to="/login"><button class="ui inverted button">Login</button></Link>
                )}
                 </Col>
               </Row>
             </Container>
           </header>
           <div className="image-header-text">
            <h2>Explore new experience</h2>
            <p>Settle in somewhere new. Discover stays to live, work, or just relax.</p>
            <Link to="/guideList"><button class="ui pink button">Start exploring</button></Link>
          </div>
         </div>
         <div className="home-second-contents">
         <div className="aboutUs">
             <h2>_____</h2>
             <h1>About us</h1>
             <p style={{ marginTop: '40px', textAlign: 'left'}}>Whether you’re looking for a treehouse for the weekend or an entire home for the whole family, a warm welcome awaits. Behind every stay is a real person who can give you the details you need to check in and feel at home.
             Airbnb Experiences are not your typical tour. Whether you’re on a trip, exploring your own city, or staying at home, learn something new from an expert host. Choose from dance lessons, pasta-making—even yoga with goats.</p>
         </div>  
         <Container className="pickedUp">
          <div style={{ width: '100%', textAlign: 'center', marginBottom: '30px'}}>
             <h2>_____</h2>
             <h1>Trendy Places</h1>
          </div>
            <Row>
                <Col md={3}>
                <Link className="pickedHeader"  to={`/place?city=Hanoi&country=Vietnam`} >
                <div class="ui card">
                  <Link class="image" to={`/place?city=Hanoi&country=Vietnam`}>
                    <img src="https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
                  </Link>
                  <div class="content">
                    <a class="header" href="">Hanoi / Halong Bay</a>
                    <div class="meta">
                      <a>Vietnam</a>
                    </div>
                  </div>
                </div>
                </Link>
                </Col>
                <Col md={3}>
                <Link className="pickedHeader" to={`/place?city=Malacca&country=Malaysia`}>
                <div class="ui card">
                  <Link class="image" to={`/place?city=Malacca&country=Malaysia`}>
                    <img src="https://images.unsplash.com/photo-1600320161090-2e2ce64a0dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                  </Link>
                  <div class="content">
                    <a class="header" href="#">Malacca</a>
                    <div class="meta">
                      <a>Malaysia</a>
                    </div>
                  </div>
                </div>
                </Link>
                </Col>
                <Col md={3}>
                <Link className="pickedHeader" to={`/place?city=Danang&country=Vietnam`}>
                <div class="ui card">
                  <Link class="image" to={`/place?city=Danang&country=Vietnam`}>
                    <img src="https://images.unsplash.com/photo-1569271532956-3fb81a207115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
                  </Link>
                  <div class="content">
                    <a class="header" href="#">Danang / Hoian</a>
                    <div class="meta">
                      <a>Vietnam</a>
                    </div>
                  </div>
                </div>
                </Link>
                </Col>
                <Col md={3}>
                <Link className="pickedHeader" to={`/place?city=Singapore&country=Singapore`}>
                <div class="ui card">
                  <Link class="image" to={`/place?city=Singapore&country=Singapore`}>
                    <img src="https://images.unsplash.com/photo-1517570123306-d58896657b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                  </Link>
                  <div class="content">
                    <a class="header" href="#">Singapore</a>
                    <div class="meta">
                      <a>Singapore</a>
                    </div>
                  </div>
                </div>
                </Link>
                </Col>
            </Row>
            </Container>
            </div>
            <div className="unique-experience">
              <div className="unique-experience-header">
              <div className="unique-experience-header-left">
               <h2>Unique Experiences</h2>
               <p>Join interactive, global adventures with inspiring, kid-friendly hosts.Explore all</p>
               </div>
               <div className="unique-experience-header-right">
                <button class="ui inverted button">View All Guides</button>
               </div>
              </div>
              <Container>
                <Row>
                  <Col md={4}>
                    <Card style={{ marginTop: '20px'}}>
                    <Card.Img variant="top" src="https://images.unsplash.com/photo-1506801310323-534be5e7a730?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <Card.Body className="unique-experience-body">
                      <Card.Text >
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                      </Card.Text>
                    </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card style={{ marginTop: '20px'}}>
                    <Card.Img variant="top" src="https://images.unsplash.com/photo-1568333409654-2fa274761195?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <Card.Body className="unique-experience-body">
                      <Card.Text >
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                      </Card.Text>
                    </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card style={{ marginTop: '20px'}}>
                    <Card.Img variant="top" src="https://images.unsplash.com/photo-1515662139884-1ba754b53417?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <Card.Body className="unique-experience-body">
                      <Card.Text >
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                      </Card.Text>
                    </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
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
            <div style={{ overflow: 'auto'}}>
            { !isTop ? <header className="header-iphone-search-bar" >
            <form class="search"> <input type="text" class="search-input" placeholder="Where do you go next ?" name="" onFocus={onFocus} /> <Link to={`/`} class="search-icon"> <SearchIcon type="submit" /> </Link> </form>
            </header> : null }
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
               <Link to={`/place?city=Kualalumpur&country=Malaysia`} className="card-iphone">
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
               <Link to={`/setting`} className="card-iphone">
                <div className="card-iphone-title">
                  <img src="https://images.unsplash.com/photo-1549641951-32b98701e434?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                </div>
                <div className="card-iphone-content">
                  <strong>Race fileds</strong>
                  <p>Vietnam</p>
                </div>
               </Link>
               <Link to={`/setting`} className="card-iphone">
                <div className="card-iphone-title">
                  <img src="https://images.unsplash.com/photo-1506801310323-534be5e7a730?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                </div>
                <div className="card-iphone-content">
                  <strong>travel around Bongkok by boat</strong>
                  <p>Bankok Thailand</p>
                </div>
               </Link>
               <Link to={`/setting`} className="card-iphone">
                <div className="card-iphone-title">
                  <img src="https://images.unsplash.com/photo-1515662139884-1ba754b53417?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                </div>
                <div className="card-iphone-content">
                  <strong>Playing with Elephant</strong>
                  <p>Thailand</p>
                </div>
               </Link>
               <Link to={`/setting`} className="card-iphone">
                <div className="card-iphone-title">
                  <img src="https://images.unsplash.com/photo-1509682841784-c7960cbb7608?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                </div>
                <div className="card-iphone-content">
                  <strong>Various Festivals</strong>
                  <p>Thailand, Vietnam, Malaysia</p>
                </div>
               </Link>
              </div>
              <Link to="/setting" class="fluid ui basic button" style={{ marginLeft: '30px'}}>
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
                 <p>About Privacy</p>
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
