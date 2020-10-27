import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../components/Component.css'

const OurCompany = () => {
    return (
        <div className="home-image">
            <Container>
             <Row>
               <Col md={3} style={{ marginTop: '30px'}}>
                 <strong >About us</strong>
                 <p style={{ marginTop: '10px', color: 'black'}}><Link to="/aboutUs" style={{ marginTop: '10px', color: 'black'}}>Expo</Link></p>
                 <p><Link to="/aboutUs" style={{ marginTop: '10px', color: 'black'}}>Our History</Link></p>
                 <p><Link to="/aboutUs" style={{ marginTop: '10px', color: 'black'}}>Tour</Link></p>
                 <p><Link to="/aboutUs" style={{ marginTop: '10px', color: 'black'}}>Careers</Link></p>
                 <p><Link to="/aboutUs" style={{ marginTop: '10px', color: 'black'}}>Our Aim</Link></p>
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
                 <p style={{ marginTop: '10px'}}><a href="https://www.businesstimes.com.sg/government-economy/covid-19-and-singapores-wealth-gap" style={{ marginTop: '10px', color: 'black'}}>COVID-19 news</a></p> 
                 <p><a href="https://www.instagram.com/almostdone9999/" style={{ color: 'black'}}>Expo Instagram</a></p>
                 <p>Expo Group</p>
               </Col>
               <Col md={3} style={{ marginTop: '20px'}}>
                 <strong >Support</strong>
                 <p style={{ marginTop: '10px'}}>Contact</p>
                 <p><a href="https://www.termsfeed.com/live/9984ee1b-f3a6-48b0-8509-aba1a8442292" style={{ color: 'black'}}>About Privacy</a></p>
                 <p>Help Center</p>
               </Col>
              </Row>
             </Container>
            </div>
    )
}

export default OurCompany
