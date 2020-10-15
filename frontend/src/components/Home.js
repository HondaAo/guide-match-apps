import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Component.css'
import MediaQuery from "react-responsive";
import { Container, IconButton } from '@material-ui/core'
import StickyFooter from '../layout/StickyFooter'

const Home = () => {
    const [ guides, setGuides ] = useState([])
    const [ place, setPlace ] = useState('Kyoto')
    const [ button, setButton ] = useState('Home')
    useEffect(()=>{
        Axios.get(`/api/guidelist?place=${place}`)
        .then(res => {
            setGuides(res.data)
        })
        .catch(err => console.log(err))
    },[])
    return (
        <>
        <MediaQuery query="(min-width: 767px)">
         <div className="image-header">
            <h2>Explore new experience</h2>
            <p>Settle in somewhere new. Discover stays to live, work, or just relax.</p>
            <Link to="/guideList"><button class="ui pink button">Start exploring</button></Link>
         </div>
         <div className="aboutUs">
             <h2>_____</h2>
             <h1>About us</h1>
             <p style={{ marginTop: '40px', textAlign: 'left'}}>Whether you’re looking for a treehouse for the weekend or an entire home for the whole family, a warm welcome awaits. Behind every stay is a real person who can give you the details you need to check in and feel at home.
             Airbnb Experiences are not your typical tour. Whether you’re on a trip, exploring your own city, or staying at home, learn something new from an expert host. Choose from dance lessons, pasta-making—even yoga with goats.</p>
         </div>  
         <Container className="pickedUp">
            <Row>
                <Col md={3}>
                <div className="pickedHeader">
                <div class="ui card">
                  <Link class="image" to={`/place?city=Hanoi&country=Vietnam`}>
                    <img src="https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
                  </Link>
                  <div class="content">
                    <a class="header" href="#">Halong Bay</a>
                    <div class="meta">
                      <a>Last Seen 2 days ago</a>
                    </div>
                  </div>
                </div>
                </div>
                </Col>
                <Col md={3}>
                <div className="pickedHeader">
                <div class="ui card">
                  <Link class="image" to={`/place?city=Malacca&country=Malaysia`}>
                    <img src="https://images.unsplash.com/photo-1600320161090-2e2ce64a0dde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                  </Link>
                  <div class="content">
                    <a class="header" href="#">Malacca</a>
                    <div class="meta">
                      <a>Last Seen 2 days ago</a>
                    </div>
                  </div>
                </div>
                </div>
                </Col>
                <Col md={3}>
                <div className="pickedHeader">
                <div class="ui card">
                  <Link class="image" to={`/place?city=Danang&country=Vietnam`}>
                    <img src="https://images.unsplash.com/photo-1569271532956-3fb81a207115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
                  </Link>
                  <div class="content">
                    <a class="header" href="#">Hoian</a>
                    <div class="meta">
                      <a>Last Seen 2 days ago</a>
                    </div>
                  </div>
                </div>
                </div>
                </Col>
                <Col md={3}>
                <div className="pickedHeader">
                <div class="ui card">
                  <Link class="image" to={`/place?city=singapore&country=singapore`}>
                    <img src="https://images.unsplash.com/photo-1517570123306-d58896657b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                  </Link>
                  <div class="content">
                    <a class="header" href="#">Singapore</a>
                    <div class="meta">
                      <a>Last Seen 2 days ago</a>
                    </div>
                  </div>
                </div>
                </div>
                </Col>
            </Row>
            </Container>
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
                  <Col md={6}>
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
                  <Col md={6}>
                  <Card style={{ marginTop: '20px'}}>
                    <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2019/05/20/12/05/nature-4216510__480.jpg" />
                    <Card.Body className="unique-experience-body">
                      <Card.Text >
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                      </Card.Text>
                    </Card.Body>
                    </Card>
                  <Card style={{ marginTop: '20px'}}>
                    <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2019/10/05/11/52/nature-4527797__480.jpg" />
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
               <h2>Having a superb holiday!!</h2>  
            </div>
            </MediaQuery>
            <MediaQuery query="(max-width: 767px)">
             <Row className="image-header-iphone">
               <h1 >Explore New World</h1>
               <p >Our service is especially for traveller and inhabitants who are looking forward to seeing with new oppurtunity</p>
               <Link to="/guideList"><button class="ui pink button">Start exploring</button></Link>
             </Row>
             <Row className="top-contents-iphone">
               <Col xs={{ span: '10', offset: '1'}}>
              <h5 style={{ marginLeft: '15px'}}>Popular destinations</h5>
               <Link to={`/place?city=Singapore&country=Singapore`} style={{ color: 'black',padding: '3%'}}>
               <div className="card-iphone-image" style={{ borderRadius: '30px', }}>
                  <img src="https://images.unsplash.com/flagged/photo-1562503542-2a1e6f03b16b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" height="auto" width="fit-content" />
                <div className="content" style={{ padding: '4%'}}>
                  <a className="header" style={{ margin: '5px'}}><h3>Singapore</h3></a>
                  <div className="meta">
                    <span className="date">Rediscover new place!!<br />Enjoy a weekend away at a vacation rental in Singapore</span>
                  </div>
                </div>
               </div>
               </Link>
               </Col>
             <p style={{ marginLeft: '30px'}}>{' '}Other recommendations</p>
             <div className="iphone-container">
               <div className="card-iphone">
               <Col xs={4} className="card-iphone-left">
                <img src="https://images.unsplash.com/photo-1508062878650-88b52897f298?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
               </Col>
               <Col xs={7} style={{ textAlign: 'center', marginLeft: '20px'}}>
               <Link to={`/place?city=Kualalumpur&country=Malaysia`} style={{ color: 'black'}}>
                 <h3>Kuala lumpur</h3>
                 <p>Kuala Lumpur is the capital city of Malaysia, boasting gleaming skyscrapers, colonial architecture, charming locals, and a myriad of natural attractions. </p>
                 <button className="ui button youtube">Explore</button>
               </Link>
              </Col>
               </div>
               <div className="card-iphone">
               <Col xs={4} className="card-iphone-left2">
                <img src="https://images.unsplash.com/photo-1553851919-596510268b99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
               </Col>
               <Col xs={7} style={{ textAlign: 'center', marginLeft: '20px'}}>
                <Link to={`/place?city=Hanoi&country=Vietnam`} style={{ color: 'black'}}>
                  <h3 style={{ marginLeft: '20px'}}>Hanoi</h3>
                  <p style={{ marginLeft: '20px'}}>A great place to explore on foot, this French-colonial city is also known for its delectable cuisine, vibrant nightlife, silks and handicrafts</p>
                  <button className="ui button youtube">Explore</button>
                 </Link>
               </Col>
               </div>
               <div className="card-iphone">
               <Col xs={4} className="card-iphone-left2">
                <img src="https://images.unsplash.com/photo-1595254434453-4e06680d45a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
               </Col>
               <Col xs={7} style={{ textAlign: 'center', marginLeft: '20px'}}>
                <Link to={`/place?city=Danang&country=Vietnam`} style={{ color: 'black'}}>
                  <h3 style={{ marginLeft: '25px'}}>Danang</h3>
                  <p>Da Nang is known as the tourist capital of South Central Vietnam, with a west-coast location that makes for beautiful sunsets </p>
                  <button className="ui button youtube">Explore</button>
                </Link>
               </Col>
               </div>
              </div>
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
            </MediaQuery>
        </>
    )
}

export default Home
